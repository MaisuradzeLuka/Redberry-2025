"use client";

import { ChangeStatusType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { updateData } from "@/lib/actions";

const ChangeStatus = ({ defaultValue, options, taskId }: ChangeStatusType) => {
  const [selectValue, setSelectValue] = useState<undefined | number>(undefined);

  const onChange = async (id: number) => {
    const body = { status_id: id };

    const res = await updateData(`tasks/${taskId}`, JSON.stringify(body));

    if (res?.status === "SUCCESS") setSelectValue(res.statusId);
  };

  return (
    <Select
      onValueChange={(value) => onChange(Number(value))}
      value={defaultValue.id}
    >
      <SelectTrigger
        className={`h-10 border border-[#CED4DA] !ring-0 text-sm text-[#0D0F10] w-[260px]`}
      >
        <SelectValue>
          {options.find((option) => option.id === selectValue)?.name ||
            defaultValue.name}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-red">
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
  );
};

export default ChangeStatus;
