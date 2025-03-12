import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  image: z.string().nonempty(),
  departament: z.string().nonempty(),
});
