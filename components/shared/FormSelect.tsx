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

const FormSelect = ({
  name,
  form,
  label,
  placeholder,
  options,
  defaultValue,
}: FormSelectType) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="self-start w-full flex flex-col gap-2 ">
          <FormLabel className="text-sm text-[#343A40] font-medium border-none">
            {label}
          </FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value}
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
                <SelectValue
                  placeholder={placeholder}
                  defaultValue={defaultValue}
                >
                  {options.find((option) => option.id == field.value)?.name ||
                    placeholder}
                </SelectValue>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem value={option.id} key={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
