import TaskCard from "@/components/shared/TaskCard";
import { statuses } from "@/constants";
import { fetchData } from "@/lib/actions";
import { TaskType } from "@/lib/types";

export default async function Home() {
  const tasks: TaskType[] = (await fetchData("tasks")) || [];

  return (
    <>
      <h2 className=" text-4xl font-semibold mb-6">დავალებების გვერდი</h2>

      <div className="w-max px-4 py-2 flex gap-6 border rounded-md mt-14 mb-18">
        <div>დეპარტამენტი</div>
        <div>პრიორიტეტი</div>
        <div>თანამშრომელი</div>
      </div>

      <section className="grid grid-cols-4 justify-stretch gap-14 w-full mb-8">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter(
            (task) => task.status.name === status.name
          );

          const bgColorClass = {
            yellow: "bg-yellow",
            blue: "bg-blue",
            orange: "bg-orange",
            pink: "bg-pink",
          }[status.color];

          return (
            <div key={status.id}>
              <h3
                className={`text-center py-4 ${bgColorClass} text-white text-[20px] font-medium rounded-[10px] mb-8`}
              >
                {status.name}
              </h3>

              {filteredTasks.map((filteredTask) => (
                <TaskCard
                  key={filteredTask.id}
                  {...filteredTask}
                  color={status.color}
                />
              ))}
            </div>
          );
        })}
      </section>
    </>
  );
}
