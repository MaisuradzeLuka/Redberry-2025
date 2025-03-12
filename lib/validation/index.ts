import { z } from "zod";

const nameSurnameRegex = /^[a-zA-Zა-ჰ]+$/;

export const agentSchema = z.object({
  name: z.string().min(2).max(255).regex(nameSurnameRegex),
  surname: z.string().min(2).max(255).regex(nameSurnameRegex),
  avatar: z.string().nonempty(),
  department_id: z.number(),
});
