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

export type departmentsType = {
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

export type priorities = {
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
  addEmployee?: boolean;
};

export type CreateTaskType = {
  priorities: { id: number; name: string; icon: string }[];
  statuses: { id: number; name: string }[];
  departments: { id: number; name: string }[];
};

export type TaskType = {
  id: number;
  name: string;
  description: string | null;
  due_date: string;
  department: { id: number; name: string };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: departmentsType;
  };
  status: departmentsType;
  priority: priorities;
  total_comments: number;
};

export type ChangeStatusType = {
  defaultValue: departmentsType;
  options: priorities[];
  taskId: string;
};

export type CommentsType = {
  taskId?: string;
  id: number;
  text: string;
  task_id: number;
  parent_id: null | number;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: {
    id: number;
    text: string;
    task_id: number;
    parent_id: number;
    author_avatar: string;
    author_nickname: string;
  }[];
};

export type CommentCardType = {};
