"use client";

import { Textarea } from "../ui/textarea";
import Button from "../shared/Button";
import { FormEvent, useState } from "react";
import { postData } from "@/lib/actions";

const CommentForm = ({
  taskId,
  parrentId,
  setShowReply,
}: {
  taskId: string;
  parrentId?: number | null;
  setShowReply?: () => void;
}) => {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
    if (value.trim()) {
      setHasError(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) {
      setHasError(true);
      return;
    }

    if (value.trim()) {
      const body: { text: string; parent_id: number | null } = {
        text: value,
        parent_id: parrentId ?? null,
      };

      const res = await postData(
        `tasks/${taskId}/comments`,
        JSON.stringify(body)
      );

      if (res === "SUCCESS") {
        if (setShowReply) setShowReply();
        setValue("");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white rounded-[10px] ${
        hasError ? "border !border-red" : ""
      } py-4 px-5 w-full`}
    >
      <Textarea
        className="resize-none border-none !ring-0 placeholder:text-[#898989] text-[#212529]  shadow-none !p-0"
        placeholder="დაწერე კომენტარი"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />

      <Button
        type="submit"
        classname="block !px-5 !py-2 bg-primaryPurple border-primaryPurple text-white text-[16px] !rounded-full !ml-auto cursor-pointer"
      >
        დააკომენტარე
      </Button>
    </form>
  );
};

export default CommentForm;
