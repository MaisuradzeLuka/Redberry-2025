import CommentForm from "@/components/forms/CommentForm";
import ChangeStatus from "@/components/shared/ChangeStatus";
import CommentCard from "@/components/shared/CommentCard";
import { fetchData } from "@/lib/actions";
import { priorities, TaskType, CommentsType } from "@/lib/types";
import { formatDate, trimDepartments } from "@/lib/utils";
import Image from "next/image";
import { LuCalendar, LuUser } from "react-icons/lu";
import { RiPieChartLine } from "react-icons/ri";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const task: TaskType = (await fetchData(`tasks/${id}`)) || [];
  const statuses: priorities[] = (await fetchData("statuses")) || [];
  const comments: CommentsType[] =
    (await fetchData(`tasks/${id}/comments`)) || [];

  const total_comments = comments.reduce(
    (sum, comment) =>
      sum + (comment.sub_comments ? comment.sub_comments.length : 0) + 1,
    0
  );

  const priorityColor =
    task.priority.id === 1
      ? "border-green text-green"
      : task.priority.id === 2
      ? "border-yellow text-yellow"
      : "border-red text-red";

  return (
    <div className="w-full flex justify-between ">
      <section className="w-[715px]">
        <div className="flex gap-5">
          <span
            className={`flex items-center gap-1 border ${priorityColor} py-1 pl-1 pr-3 mb-3 rounded-sm w-max`}
          >
            <Image
              src={task.priority.icon}
              alt="priority icon"
              width={16}
              height={18}
            />
            {task.priority.name}
          </span>

          <span
            className={`px-2 py-1 bg-pink rounded-2xl ml-2 h-min text-white`}
          >
            {trimDepartments(task.department.name)}
          </span>
        </div>

        <article>
          <h2 className="font-semibold text-4xl text-[#212529]">{task.name}</h2>

          <p className="font-normal text-sm mt-9 ">{task.description}</p>
        </article>

        <div className="flex flex-col justify-between gap-9 mt-16">
          <h3 className="font-medium text-2xl text-[#2A2A2A]">
            დავალების დეტალები
          </h3>

          <div className="flex items-center gap-[125px]">
            <span className="flex items-center gap-1 text-[#474747]">
              <RiPieChartLine className="text-2xl" />
              სტატუსი
            </span>

            <div>
              <ChangeStatus
                taskId={id}
                options={statuses}
                defaultValue={task.status}
              />
            </div>
          </div>

          <div className="flex items-center gap-18">
            <span className="flex items-center gap-1 text-[#474747]">
              <LuUser className="text-2xl" />
              თანამშრომელი
            </span>

            <div className="flex items-center gap-3">
              <Image
                src={task.employee.avatar}
                alt="employee avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />

              <div className="flex flex-col">
                <h4 className="font-light text-[#474747] text-[11px]">
                  {task.employee.department.name}
                </h4>

                <p className="text-sm text-[#0D0F10]">{task.employee.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-18">
            <span className="flex items-center gap-1 text-[#474747]">
              <LuCalendar className="text-2xl" />
              დავალების ვადა
            </span>

            <span className="text-[ორშ - 02/2/2025] text-sm">
              {formatDate(task.due_date, true)}
            </span>
          </div>
        </div>
      </section>
      <section className="w-[740px] bg-[#F8F3FEA6] rounded-[10px] py-10 px-12 mt-16 ">
        <CommentForm taskId={id} />

        <h3 className="flex items-center gap-2 mt-16 mb-10 font-medium text-xl">
          კომენტარები
          <span className="px-[10px] py-[3px] rounded-4xl bg-primaryPurple text-white">
            {total_comments}
          </span>
        </h3>

        <article className="flex flex-col gap-9 h-[600px] overflow-y-scroll no-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard {...comment} />

              {comment.sub_comments?.map((sub_comment) => (
                <CommentCard
                  key={sub_comment.id}
                  {...sub_comment}
                  parent_id={comment.id}
                />
              ))}
            </div>
          ))}
        </article>
      </section>
    </div>
  );
};

export default page;
