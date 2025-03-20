"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";
import Button from "../shared/Button";
import { agentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { handleFileChange } from "@/lib/utils";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { fetchData, postData } from "@/lib/actions";
import FormInput from "../shared/FormInput";
import FormSelect from "../shared/FormSelect";
import { DepartmentsType } from "@/lib/types";

const AgentModal = () => {
  const [image, setImage] = useState("");
  const [departments, setDepartments] = useState<DepartmentsType[]>([]);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

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

    if (file)
      if (file.size > 600 * 1024) {
        form.setError("avatar", {
          type: "custom",
          message: "ფოტოს ზომა აღემატება 600 კილობაიტს",
        });

        return;
      }

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

    const res = await postData("employees", formData, true);
    if (res === "SUCCESS") {
      form.reset();
      setImage("");
      dialogCloseRef.current?.click();
    }
  };

  return (
    <DialogContent
      className=" bg-white w-full lg:w-[915px] !max-w-none mx-2 pt-[115px] pb-[60px] px-13"
      onOpenAutoFocus={() => {
        form.reset();
        setImage("");
      }}
    >
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
            <FormInput
              name="name"
              form={form}
              label="სახელი*"
              min={2}
              max={255}
              letters={true}
            />
            <FormInput
              name="surname"
              form={form}
              label="გვარი*"
              min={2}
              max={255}
              letters={true}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="avatar"
              className="w-min text-sm text-[#343A40] font-medium border-none"
            >
              ავატარი*
            </label>

            <label
              htmlFor="avatar"
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
            </label>

            {form.formState.errors.avatar?.message && (
              <p className="text-[10px] text-red">
                {form.formState.errors.avatar?.message}
              </p>
            )}
            <input
              type="file"
              id="avatar"
              className="border hidden"
              {...form.register("avatar")}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="w-[384px] self-start">
            <FormSelect
              name="department_id"
              label="დეპარტამენტი*"
              form={form}
              options={departments}
            />
          </div>

          <div className="flex gap-4 self-end mt-2">
            <DialogClose ref={dialogCloseRef} className="hidden" />

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
