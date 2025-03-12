"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import Button from "../shared/Button";
import { agentSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { handleFileChange } from "@/lib/utils";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchData } from "@/lib/actions";

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
    // resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      lastName: "",
      image: "",
      departament: "",
    },
  });

  const onChange = async (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const image = await handleFileChange(file);

    if (image) {
      form.setValue("image", image as string);
      setImage(image as string);
    }
  };

  const onDelete = () => {
    form.resetField("image");
    setImage("");
  };

  const onSubmit = (values: z.infer<typeof agentSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent className=" bg-white w-full lg:w-[915px] !max-w-none mx-2 py-[115px] px-13">
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
                      className="h-10 border-[#CED4DA]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2 ">
                  <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                    გვარი*
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      className="h-10  border-[#CED4DA]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-sm text-[#343A40] font-medium border-none"
            >
              ავატარი*
            </label>

            <label className="w-full flex justify-center items-center h-[120px] border border-dashed border-[#CED4DA] rounded-lg cursor-pointer">
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
                    className="absolute right-0 bottom-0 rounded-full p-[5px] bg-white border border-[#6C757D] text-sm text-[#6C757D] cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ) : (
                <div>Upload image</div>
              )}

              <input
                type="file"
                accept="image/*"
                id="image"
                className="border hidden"
                {...form.register("image")}
                onChange={(e) => onChange("image", e)}
              />
            </label>
          </div>

          <FormField
            control={form.control}
            name="departament"
            render={({ field }) => (
              <FormItem className="self-start w-[384px] flex flex-col gap-2 ">
                <FormLabel className="text-sm text-[#343A40] font-medium border-none">
                  დეპარტამენტი*
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full h-10 border-[#CED4DA]">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      {departments.map((department) => (
                        <SelectItem value={department.name} key={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <DialogFooter></DialogFooter>
    </DialogContent>
  );
};

export default AgentModal;
