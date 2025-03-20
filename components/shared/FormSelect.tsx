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
import { Dialog, DialogTrigger } from "../ui/dialog";
import AgentModal from "../forms/AgentModal";
import { GoPlusCircle } from "react-icons/go";

const FormSelect = ({
  name,
  form,
  label,
  placeholder,
  options,
  defaultValue,
  className,
  dissabled,
  isAgent = false,
}: FormSelectType) => (
  <FormField
    control={form.control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => {
      const selectedOption = options.find((option) => option.id == field.value);

      const error = form.formState.errors[name];

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
          <Dialog>
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value !== undefined ? String(field.value) : ""}
              disabled={dissabled}
            >
              <FormControl className="">
                <SelectTrigger
                  className={`w-full h-10 border-[#CED4DA] !ring-0 data-[state=open]:[&>*:last-child]:rotate-180 ${
                    error
                      ? "border-red"
                      : form.getFieldState(name).isDirty
                      ? "border-green-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder={placeholder}>
                    {selectedOption &&
                      ("avatar" in selectedOption ? (
                        <Image
                          src={selectedOption.avatar}
                          alt="select avatar"
                          width={24}
                          height={24}
                          className="rounded-full w-6 h-6"
                        />
                      ) : "icon" in selectedOption ? (
                        <Image
                          src={selectedOption.icon}
                          alt="select icon"
                          width={24}
                          height={24}
                          className="rounded-full w-6 h-6"
                        />
                      ) : (
                        ""
                      ))}
                    {selectedOption?.name || placeholder}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent className="!w-full border-[#DEE2E6]">
                {isAgent ? (
                  <>
                    <DialogTrigger className="flex items-center gap-2 text-[16px] font-normal text-primaryPurple ml-2  border rounded-md border-none cursor-pointer pl-4 pt-4">
                      <GoPlusCircle className="text-xl" />
                      დაამატე თანამშრომელი
                    </DialogTrigger>
                  </>
                ) : (
                  ""
                )}

                <SelectGroup className="!w-full flex flex-col gap-3 p-3 items-start">
                  {options.map((option) => (
                    <SelectItem value={String(option.id)} key={option.id}>
                      {"icon" in option && (
                        <Image
                          src={option.icon}
                          alt="option icon"
                          width={20}
                          height={20}
                        />
                      )}

                      {"avatar" in option && (
                        <Image
                          className="rounded-full w-7 h-7"
                          src={option.avatar}
                          alt="option user avatar"
                          width={28}
                          height={28}
                        />
                      )}

                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <AgentModal />
          </Dialog>
          {error && <p className="text-[10px] text-red">სავალდებულო</p>}
        </FormItem>
      );
    }}
  />
);

export default FormSelect;
