"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import Button from "../shared/Button";
import { agentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { generateValidationStyles, handleFileChange } from "@/lib/utils";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
import { fetchData, postData } from "@/lib/actions";

type DepartmentsType = {
  id: number;
  name: string;
};

const AgentModal = () => {
  const [image, setImage] = useState("");
  const [departments, setDepartments] = useState<DepartmentsType[]>([]);

  useEffect(() => {
    const fetchDepartaments = async () => {
      try {
        const departaments = await fetchData("departments");

        setDepartments(departaments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartaments();
  }, []);

  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      surname: "",
      avatar: "",
      department_id: undefined,
    },
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const image = await handleFileChange(file);

    if (image) {
      form.setValue("avatar", image as string, { shouldValidate: true });
      setImage(image as string);
    }
  };

  const onDelete = () => {
    form.resetField("avatar");
    setImage("");
  };

  const onSubmit = async (values: z.infer<typeof agentSchema>) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("surname", values.surname);
    formData.append("department_id", JSON.stringify(values.department_id));

    if (values.avatar) {
      const res = await fetch(values.avatar);
      const blob = await res.blob();

      formData.append("avatar", blob, "avatar.jpg");
    }

    const res = await postData("employees", formData);
    if (res === "SUCCESS") {
      form.reset();
      setImage("");
    }
  };

  return (
    <DialogContent className=" bg-white w-full lg:w-[915px] !max-w-none mx-2 pt-[115px] pb-[60px] px-13">
      <DialogHeader>
        <DialogTitle className="text-4xl font-medium text-center">
          თანამშრომლის დამატება
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-12 mt-12 text-[#343A40]"
        >
          <div className="w-full flex justify-between gap-11">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2 ">
                  <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                    სახელი*
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className={`h-10 border-[#CED4DA] !ring-0 ${
                        form.formState.errors.name && "border-red"
                      }`}
                      {...field}
                    />
                  </FormControl>

                  <div>
                    <p
                      className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                        field.value,
                        2,
                        255
                      )}`}
                    >
                      <MdOutlineDone /> მინიმუმ 2 სიმბოლო
                    </p>
                    <p
                      className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                        field.value,
                        2,
                        255
                      )}`}
                    >
                      <MdOutlineDone /> მაქსიმუმ 255 სიმბოლო
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2 ">
                  <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                    გვარი*
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className={`h-10 border-[#CED4DA] !ring-0 ${
                        form.formState.errors.name && "border-red"
                      }`}
                      {...field}
                    />
                  </FormControl>

                  <div>
                    <p
                      className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                        field.value,
                        2,
                        255
                      )}`}
                    >
                      <MdOutlineDone /> მინიმუმ 2 სიმბოლო
                    </p>
                    <p
                      className={`flex items-center gap-1 text-[10px] font-[350] ${generateValidationStyles(
                        field.value,
                        2,
                        255
                      )}`}
                    >
                      <MdOutlineDone /> მაქსიმუმ 255 სიმბოლო
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="avatar"
              className="text-sm text-[#343A40] font-medium border-none"
            >
              ავატარი*
            </label>

            <label
              className={`w-full flex justify-center items-center h-[120px] border border-dashed border-[#CED4DA] rounded-lg cursor-pointer ${
                form.formState.errors.avatar ? "border-red" : ""
              }`}
            >
              {image ? (
                <div className="relative w-max">
                  <Image
                    src={image}
                    alt="avatar logo"
                    width={88}
                    height={88}
                    className="rounded-full object-cover w-[88px] h-[88px]"
                  />

                  <button
                    type="button"
                    onClick={onDelete}
                    className="absolute right-0 bottom-0 rounded-full p-[5px] bg-white border border-[#6C757D] text-sm text-[#6C757D] cursor-pointer hover:scale-105 transition"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center text-sm gap-1">
                  <LuImagePlus className="text-2xl" />
                  ატვირთე ფოტო
                </div>
              )}

              <input
                type="file"
                id="image"
                className="border hidden"
                {...form.register("avatar")}
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>

          <FormField
            control={form.control}
            name="department_id"
            render={({ field }) => (
              <FormItem className="self-start w-[384px] flex flex-col gap-2 ">
                <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                  დეპარტამენტი*
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`w-full h-10 border-[#CED4DA] ${
                        form.formState.errors.department_id
                          ? "border-red"
                          : form.getFieldState("department_id").isDirty
                          ? "border-green-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="აირჩიეთ დეპარტამენტი">
                        {departments.find((dept) => dept.id == field.value)
                          ?.name || "აირჩიეთ დეპარტამენტი"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      {departments.map((department) => (
                        <SelectItem value={department.id} key={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="self-end mt-2">
            <DialogClose className="text-[16px] px-5 py-3 border rounded-md border-primaryPurple mr-5">
              გაუქმება
            </DialogClose>

            <Button
              type="submit"
              classname="border-primaryPurple bg-primaryPurple  text-white"
            >
              დაამატე თანამშრომელი
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AgentModal;
