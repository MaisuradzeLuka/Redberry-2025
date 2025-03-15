"use client";

import { CommentsType } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { VscReply } from "react-icons/vsc";
import CommentForm from "../forms/CommentForm";

const CommentCard = ({
  author_avatar,
  author_nickname,
  text,
  task_id,
  id,
  parent_id,
}: CommentsType) => {
  const [showReply, setShowReply] = useState(false);

  const onClick = () => {
    setShowReply((prev) => !prev);
  };

  return (
    <div className={`${parent_id ? "ml-13 mt-4" : ""} flex items-start gap-3`}>
      <Image
        src={author_avatar}
        alt="comment author avatar"
        width={38}
        height={38}
        className="w-10 h-10 rounded-full"
      />

      <div className="w-full">
        <h4 className="text-lg font-medium text-[#021526]">
          {author_nickname}
        </h4>
        <p className="my-2 text-[#343A40] text-[16px] font-light">{text}</p>

        {showReply ? (
          <CommentForm
            taskId={String(task_id)}
            parrentId={id}
            setShowReply={() => onClick()}
          />
        ) : !parent_id ? (
          <button
            onClick={onClick}
            className="flex items-center gap-1 text-primaryPurple cursor-pointer text-xs mt-1"
          >
            <VscReply className="text-[16px]" /> უპასუხე
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
