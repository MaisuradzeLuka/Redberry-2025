import CreateTaskForm from "@/components/forms/CreateTaskForm";
import { fetchData } from "@/lib/actions";

const page = async () => {
  const priorities = (await fetchData("priorities")) || [];
  const statuses = (await fetchData("statuses")) || [];
  const departments = (await fetchData("departments")) || [];

  return (
    <>
      <h2 className=" text-4xl font-semibold mb-6">შექმენი ახალი დავალება</h2>

      <CreateTaskForm
        statuses={statuses}
        priorities={priorities}
        departments={departments}
      />
    </>
  );
};

export default page;
