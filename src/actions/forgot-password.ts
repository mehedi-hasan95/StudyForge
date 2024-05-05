"use server";

import { getPasswordResetByEmail } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/userInfo";
import { generateForogtPasswordToken } from "@/lib/generate-token";
import { sendForgotPasswordEmail } from "@/lib/mail";
import { ForgotPasswordSchema } from "@/schema";
import * as z from "zod";

export const ForgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validateFields = ForgotPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validateFields.data;
  const hasUser = await getUserByEmail(email);
  if (!hasUser) {
    return { error: "Email is not exist" };
  }

  const forgotPasswordToken = await generateForogtPasswordToken(email);
  await sendForgotPasswordEmail(
    forgotPasswordToken.email,
    forgotPasswordToken.token
  );

  return { success: "Reset email sent to your email" };
};
