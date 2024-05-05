import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirm: z.string().min(1, {
      message: "Confirm password must be at least 2 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

// Forgot Password
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

// Forgot Password
export const NewPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "New Password must be at least 1 characters.",
  }),
});

// Update profile
export const UpdateProfileSchema = z
  .object({
    name: z.optional(
      z.string().min(1, { message: "Name must ba at least 1 characters." })
    ),
    image: z.optional(z.string()),
    password: z.optional(z.string().min(1)),
    newPassword: z.optional(z.string().min(1)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return null;
      }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return null;
      }
      return true;
    },
    { message: "Password is required", path: ["password"] }
  );
