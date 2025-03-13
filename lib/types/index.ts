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
  min?: number;
  max?: number;
};

type departmentsType = {
  id: number;
  name: string;
};

export type employeesType = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: departmentsType;
};

type priorities = {
  id: number;
  name: string;
  icon: string;
};

export type FormSelectType = FormInputType & {
  placeholder?: string;
  options: priorities[] | departmentsType[] | employeesType[];
  defaultValue?: number;
  className?: string;
  dissabled?: boolean;
};

export type CreateTaskType = {
  priorities: { id: number; name: string; icon: string }[];
  statuses: { id: number; name: string }[];
  departments: { id: number; name: string }[];
};
