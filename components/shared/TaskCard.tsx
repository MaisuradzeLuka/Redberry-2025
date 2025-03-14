import { TaskType } from "@/lib/types";
import { formatDate, trimDepartments, trimDescription } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { GoComment } from "react-icons/go";

type TaskCardType = TaskType & {
  color: string;
};

const TaskCard = ({
  color,
  due_date,
  priority,
  name,
  description,
  employee,
  total_comments,
  department,
  id,
}: TaskCardType) => {
  const borderColorClass = {
    yellow: "border-yellow",
    blue: "border-blue",
    orange: "border-orange",
    pink: "border-pink",
  }[color];

  const priorityColor =
    priority.id === 1
      ? "border-green text-green"
      : priority.id === 2
      ? "border-yellow text-yellow"
      : "border-red text-red";

  return (
    <Link
      href={`${id}`}
      className={`block border ${borderColorClass} rounded-2xl p-5 mb-8`}
    >
      <div className="w-full flex items-center text-xs">
        <span
          className={`flex items-center gap-1 border ${priorityColor} py-1 pl-1 pr-3 rounded-sm`}
        >
          <Image
            src={priority.icon}
            alt="priority icon"
            width={16}
            height={18}
          />
          {priority.name}
        </span>

        {/* {trimDepartments(department.name)} */}
        <span className={`px-2 py-1 bg-pink rounded-2xl ml-2 text-white`}>
          {trimDepartments(department.name)}
        </span>

        <span className=" text-[#212529] ml-auto">{formatDate(due_date)}</span>
      </div>

      <div className="my-7 px-3">
        <h4 className="text-[15px] text-[#212529] font-medium">{name}</h4>
        {description && (
          <p className="text-sm text-[#343A40] font-normal mt-3">
            {trimDescription(description)}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Image
          src={employee.avatar}
          alt="avatar image"
          width={30}
          height={30}
          className="w-8 h-8 rounded-full"
        />

        <p className="flex items-center gap-1">
          <GoComment /> {total_comments}
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;
