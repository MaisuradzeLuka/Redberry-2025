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
    .min(4)
    .max(255)
    .refine((desc) => desc.split(/\s+/).filter(Boolean).length >= 4)
    .optional(),
  due_date: z.string().nonempty(),
  status_id: z.number(),
  employee_id: z.number(),
  priority_id: z.number(),
  department_id: z.number(),
});
