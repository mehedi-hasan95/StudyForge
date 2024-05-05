"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordResetByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/userInfo";
import bcrypt from "bcryptjs";
import { prismaDb } from "@/lib/prismaDb";

export const NewPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token is messing" };
  }
  const validateField = NewPasswordSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalidate fields" };
  }

  const { password } = validateField.data;
  const existingToken = await getPasswordResetByToken(token);
  if (!existingToken) {
    return { error: "Token is invalid" };
  }

  const hasExpaired = new Date(existingToken.expires) < new Date();
  if (hasExpaired) {
    return { error: "Token is expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email is not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prismaDb.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  await prismaDb.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password reset successfully" };
};
