import FilterTasks from "@/components/shared/FilterTasks";
import TaskCard from "@/components/shared/TaskCard";
import { statuses } from "@/constants";
import { fetchData } from "@/lib/actions";
import { TaskType } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    departments?: string;
    priorities?: string;
    employees?: string;
  }>;
}) {
  const tasks: TaskType[] = (await fetchData("tasks")) || [];

  const selectedPriorities = (await searchParams).priorities?.split(",") || [];
  const selectedEmployees = (await searchParams).employees?.split(",") || [];
  const selectedDepartments =
    (await searchParams).departments?.split(",") || [];

  const filteredTasks = tasks.filter((task) => {
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(String(task.department.id));

    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(String(task.priority.id));

    const matchesEmployee =
      selectedEmployees.length === 0 ||
      selectedEmployees.includes(String(task.employee.id));

    return matchesDepartment && matchesPriority && matchesEmployee;
  });

  return (
    <>
      <h2 className="text-4xl font-semibold mb-6">დავალებების გვერდი</h2>

      <FilterTasks
        selectedDepartments={selectedDepartments}
        selectedEmployees={selectedEmployees}
        selectedPriorities={selectedPriorities}
      />

      <section className="grid grid-cols-4 justify-stretch gap-14 w-full mb-8">
        {statuses.map((status) => {
          const tasksByStatus = filteredTasks.filter(
            (task) => task.status.name === status.name
          );

          return (
            <div key={status.id}>
              <h3
                className={`text-center py-4 text-white text-[20px] font-medium rounded-[10px] mb-8`}
                style={{
                  backgroundColor: status.color,
                }}
              >
                {status.name}
              </h3>

              {tasksByStatus.map((task) => (
                <TaskCard key={task.id} {...task} color={status.colorName} />
              ))}
            </div>
          );
        })}
      </section>
    </>
  );
}
