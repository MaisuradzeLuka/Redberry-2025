"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import FormInput from "../shared/FormInput";
import { z } from "zod";
import { taskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { generateValidationStyles } from "@/lib/utils";
import { MdOutlineDone } from "react-icons/md";
import FormSelect from "../shared/FormSelect";
import { CreateTaskType, employeesType } from "@/lib/types";
import Button from "../shared/Button";

import { DatePicker } from "../ui/DatePicker";
import { useEffect, useRef, useState } from "react";
import { fetchData, postData } from "@/lib/actions";
import { addDays, format } from "date-fns";
import { redirect, usePathname } from "next/navigation";

const CreateTaskForm = ({
  statuses,
  priorities,
  departments,
}: CreateTaskType) => {
  const [employee, setEmployee] = useState<employeesType[]>([]);
  const [initialEmployee, setInitialEmployee] = useState<employeesType[]>([]);
  const isFirstRender = useRef(true);

  const pathName = usePathname();

  const defaultValues = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("formData")) || "{}"
  );

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: defaultValues.name || "",
      description: defaultValues.description || "",
      due_date:
        defaultValues.due_date || format(addDays(new Date(), 1), "yyyy-MM-dd"),
      status_id: defaultValues.status_id || undefined,
      employee_id: defaultValues.employee_id || undefined,
      priority_id: defaultValues.priority_id || undefined,
      department_id: defaultValues.department_id || undefined,
    },
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchEmployees = async () => {
      try {
        const employees: employeesType[] = await fetchData("employees");
        setInitialEmployee(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [form.watch("department_id")]);

  useEffect(() => {
    const departmentId = form.getValues("department_id");

    if (departmentId) {
      const filteredEmployees = initialEmployee.filter(
        (employee) => employee.department.id === departmentId
      );

      if (form.getValues("employee_id")) {
        form.resetField("employee_id");
      }

      setEmployee(filteredEmployees);
    }
  }, [form.watch("department_id"), initialEmployee]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      sessionStorage.setItem("formData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  useEffect(() => {
    sessionStorage.clear();
  }, [pathName]);

  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    const { department_id, ...formData } = values;
    const res = await postData("tasks", JSON.stringify(formData));

    if (res === "SUCCESS") {
      sessionStorage.clear();
      form.reset();
      redirect("/");
    }
  };

  const generateDescValidation = (desc: string) => {
    const trimmedDesc = desc.trim();

    if (trimmedDesc === "") return "text-[#6C757D]";

    const wordCount = trimmedDesc.split(/\s+/).length;

    if (wordCount < 4 || trimmedDesc.length > 255) return "text-red";

    return "text-green-500";
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative border border-[#DDD2FF] rounded-sm bg-[#FBF9FFA6] pl-[55px] pt-[65px] pb-[215px] text-sm text-[#0D0F10]"
      >
        <div className="flex flex-col xl:flex-row gap-40 items-start h-[490px]">
          <div className="flex flex-col justify-between gap-14 w-[550px] h-full">
            <FormInput
              label="სათაური*"
              form={form}
              name="name"
              min={3}
              max={255}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                    აღწერა
                  </FormLabel>

                  <FormControl>
                    <div>
                      <Textarea
                        className={`w-full h-33 border-[#CED4DA] resize-none !ring-0 mb-2 ${
                          form.formState.errors.description && "border-red"
                        }`}
                        {...field}
                      />
                      <div>
                        <p
                          className={`flex items-center gap-1 text-[10px] font-[350] ${generateDescValidation(
                            field.value!
                          )}`}
                        >
                          <MdOutlineDone /> მინიმუმ 4 სიტყვა
                        </p>

                        <p
                          className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                            field.value!,
                            3,
                            255
                          )}`}
                        >
                          <MdOutlineDone /> მაქსიმუმ 255 სიმბოლო
                        </p>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center gap-8 ">
              <FormSelect
                name="priority_id"
                form={form}
                placeholder="პრიორიტეტი"
                label="პრიორიტეტი*"
                options={priorities}
                defaultValue={priorities[1].id}
              />

              <FormSelect
                name="status_id"
                form={form}
                placeholder="დასაწყები"
                label="სტატუსი*"
                options={statuses}
                defaultValue={statuses[0].id}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between w-[550px] h-full gap-15">
            <FormSelect
              name="department_id"
              form={form}
              placeholder="აირჩიეთ დეპარტამენტი"
              label="დეპარტამენტი*"
              options={departments}
            />

            <FormSelect
              key={form.watch("department_id")}
              name="employee_id"
              form={form}
              label="პასუხმძღვანელი თანამშრომელი*"
              options={employee}
              className="-mt-22"
              dissabled={!form.getValues("department_id")}
              isAgent={true}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#343A40] font-medium">
                    დედლაინი*
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      isDirty={form.getFieldState("due_date").isDirty}
                      error={!form.getFieldState("due_date").error}
                      date={field.value ? new Date(field.value) : undefined}
                      onChange={(selectedDate) => {
                        field.onChange(
                          selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
                        );
                        form.trigger("due_date");
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          classname="absolute right-[350px] bottom-30 w-max border-primaryPurple bg-primaryPurple text-white cursor-pointer"
        >
          დავალების შექმნა
        </Button>
      </form>
    </Form>
  );
};

export default CreateTaskForm;
