"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormInput from "../shared/FormInput";
import { z } from "zod";
import { taskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { cn, generateValidationStyles } from "@/lib/utils";
import { MdOutlineDone } from "react-icons/md";
import FormSelect from "../shared/FormSelect";
import { CreateTaskType } from "@/lib/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon, Calendar } from "lucide-react";
import { format } from "path";
import Button from "../shared/Button";
import { useState } from "react";

const CreateTaskForm = ({
  statuses,
  priorities,
  departments,
}: CreateTaskType) => {
  const [date, setDate] = useState();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      due_date: undefined,
      status_id: undefined,
      employee_id: undefined,
      priority_id: undefined,
      department_id: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col xl:flex-row gap-40 items-start border border-[#DDD2FF] rounded-sm bg-[#FBF9FFA6] pl-[55px] pt-[65px] pb-[215px] text-sm text-[#0D0F10]"
      >
        <div className="flex flex-col gap-14 w-[550px]">
          <FormInput label="სათაური*" form={form} name="name" />

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
                      className={`w-full h-33 border-[#CED4DA] resize-none !ring-0 ${
                        form.formState.errors.description && "border-red"
                      }`}
                      {...field}
                    />
                    <div>
                      <p
                        className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                          field.value!,
                          2,
                          255
                        )}`}
                      >
                        <MdOutlineDone /> მინიმუმ 2 სიმბოლო
                      </p>

                      <p
                        className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                          field.value!,
                          2,
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

          <div className="flex justify-between items-center gap-8">
            <FormSelect
              name="priority_id"
              form={form}
              placeholder="პრიორიტეტი"
              label="პრიორიტეტი*"
              options={priorities}
            />
            <FormSelect
              name="status_id"
              form={form}
              placeholder="დასაწყები"
              label="სტატუსი*"
              options={statuses}
            />
          </div>
        </div>

        <div className="w-[550px] flex flex-col gap-15">
          <FormSelect
            name="department_id"
            form={form}
            placeholder="აირჩიეთ დეპარტამენტი"
            label="დეპარტამენტი*"
            options={departments}
          />

          <FormSelect
            name="employee_id"
            form={form}
            label="პასუხისმგებელი თანამშრომელი*"
            options={departments}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateTaskForm;
