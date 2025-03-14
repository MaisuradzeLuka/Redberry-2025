import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSelectType } from "@/lib/types";
import Image from "next/image";

const FormSelect = ({
  name,
  form,
  label,
  placeholder,
  options,
  defaultValue,
  className,
  dissabled,
}: FormSelectType) => (
  <FormField
    control={form.control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => {
      return (
        <FormItem
          className={`self-start w-full flex flex-col gap-2 ${className}`}
        >
          <FormLabel
            className={`text-sm ${
              dissabled ? "text-[#ADB5BD]" : "text-[#343A40]"
            } font-medium border-none`}
          >
            {label}
          </FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value !== undefined ? String(field.value) : ""}
            disabled={dissabled}
          >
            <FormControl>
              <SelectTrigger
                className={`w-full h-10 border-[#CED4DA] !ring-0 ${
                  form.formState.errors[name]
                    ? "border-red"
                    : form.getFieldState(name).isDirty
                    ? "border-green-500"
                    : ""
                }`}
              >
                <SelectValue placeholder={placeholder}>
                  {options.find((option) => option.id == field.value)?.name ||
                    placeholder}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem value={String(option.id)} key={option.id}>
                    {option.icon && (
                      <Image
                        src={option.icon}
                        alt="option icon"
                        width={20}
                        height={20}
                      />
                    )}
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      );
    }}
  />
);

export default FormSelect;
