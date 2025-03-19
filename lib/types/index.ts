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

export type DepartmentsType = {
  avatar: any;
  icon: any;
  id: number;
  name: string;
};

export type EmployeesType = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: DepartmentsType;
};

export type PrioritiesType = {
  id: number;
  name: string;
  icon: string;
};

export type StatusType = {
  id: number;
  name: string;
};

export type FormSelectType = FormInputType & {
  placeholder?: string;
  options: Array<PrioritiesType | DepartmentsType | EmployeesType | StatusType>;
  defaultValue?: number;
  className?: string;
  dissabled?: boolean;
  addEmployee?: boolean;
  isAgent?: boolean;
};

export type CreateTaskType = {
  priorities: { id: number; name: string; icon: string }[];
  statuses: { id: number; name: string }[];
  departments: DepartmentsType[];
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
    department: DepartmentsType;
  };
  status: DepartmentsType;
  priority: PrioritiesType;
  total_comments: number;
};

export type ChangeStatusType = {
  defaultValue: DepartmentsType;
  options: PrioritiesType[];
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

export type FilterTasksType = {
  selectedDepartments: string[];
  selectedEmployees: string[];
  selectedPriorities: string[];
};
