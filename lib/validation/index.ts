import { isBefore, parseISO, startOfDay } from "date-fns";
import { z } from "zod";

const nameSurnameRegex = /^[a-zA-Zა-ჰ]+$/;

export const agentSchema = z.object({
  name: z.string().min(2).max(255).regex(nameSurnameRegex),
  surname: z.string().min(2).max(255).regex(nameSurnameRegex),
  avatar: z.string().nonempty(),
  department_id: z.number(),
});

export const taskSchema = z.object({
  name: z.string().min(3).max(255),
  description: z
    .string()
    .max(255)
    .refine(
      (desc) => desc.trim() === "" || desc.trim().split(/\s+/).length >= 4
    ),
  due_date: z
    .string()
    .refine(
      (date) => new Date(date).getTime() >= new Date().setHours(0, 0, 0, 0)
    ),
  status_id: z.number(),
  employee_id: z.number(),
  priority_id: z.number(),
  department_id: z.number(),
});
