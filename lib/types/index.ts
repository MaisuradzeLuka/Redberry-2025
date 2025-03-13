export type FormInputType = {
  name:
    | "name"
    | "surname"
    | "avatar"
    | "department_id"
    | "description"
    | "due_date"
    | "status_id"
    | "employee_id"
    | "priority_id";
  form: any;
  label: string;
};

export type FormSelectType = FormInputType & {
  placeholder?: string;
  options: {
    name: string;
    id: number;
  }[];
  defaultValue?: number;
};

export type CreateTaskType = {
  priorities: { id: number; name: string; icon: string }[];
  statuses: { id: number; name: string }[];
  departments: { id: number; name: string }[];
};
