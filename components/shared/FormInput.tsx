import { generateValidationStyles } from "@/lib/utils";
import { MdOutlineDone } from "react-icons/md";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FormInputType } from "@/lib/types";
import { useEffect } from "react";

const FormInput = ({
  name,
  form,
  label,
  min,
  max,
  letters = false,
}: FormInputType) => {
  const error = form.formState.errors[name];

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
                error && "border-red"
              }`}
              {...field}
            />
          </FormControl>

          <div>
            <p
              className={`flex items-center gap-1 text-[10px] font-[350] ${
                error && "text-red"
              } ${generateValidationStyles(
                form.getFieldState(name).isDirty,
                field.value,
                min!,
                "min"
              )}`}
            >
              <MdOutlineDone /> მინიმუმ {min} სიმბოლი
            </p>

            <p
              className={`flex items-center gap-1 text-[10px] font-[350] ${
                error && "text-red"
              } ${generateValidationStyles(
                form.getFieldState(name).isDirty,
                field.value,
                min!,
                "max"
              )}`}
            >
              <MdOutlineDone /> მაქსიმუმ {max} სიმბოლი
            </p>

            {letters && (
              <p
                className={`flex items-center gap-1 text-[10px] font-[350] ${
                  error && "text-red"
                } ${generateValidationStyles(
                  form.getFieldState(name).isDirty,
                  field.value,
                  min!,
                  "letters"
                )}`}
              >
                <MdOutlineDone /> მხოლოდ ქართული ან ლათინური ასოები
              </p>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
