import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "employer"]),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const newJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  company_name: z.string().min(2),
  category: z.string().min(2),
  location: z.string().min(2),
  requirements: z.string().optional(),
});

export const updateJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  company_name: z.string().min(2),
  requirements: z.string().optional(),
});

export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export type NewJobInput = z.infer<typeof newJobSchema>;
