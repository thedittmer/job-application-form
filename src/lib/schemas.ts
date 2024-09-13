import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const jobApplicationSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  resume: z.any(),
  cover_letter: z.string().min(1, "Cover letter is required"),
});
