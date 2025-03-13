import { generateValidationStyles } from "@/lib/utils";
import { MdOutlineDone } from "react-icons/md";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FormInputType } from "@/lib/types";

const FormInput = ({ name, form, label }: FormInputType) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col gap-2 ">
          <FormLabel className="text-sm text-[#343A40] font-medium border-none">
            {label}
          </FormLabel>

          <FormControl>
            <Input
              type="text"
              className={`w-full h-10 border-[#CED4DA] !ring-0 ${
                form.formState.errors[name] && "border-red"
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
  );
};

export default FormInput;
