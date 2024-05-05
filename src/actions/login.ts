"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/userInfo";
import { generateVerifyToken } from "@/lib/generate-token";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validateForm = loginSchema.safeParse(values);
  if (!validateForm.success) {
    return { error: "Invalid Credintials" };
  }
  const { email, password } = validateForm.data;

  // User who have no account
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email is not exist" };
  }
  // User who created an account but didn't verify
  if (!existingUser.emailVerified) {
    const theToken = await generateVerifyToken(existingUser.email);
    await sendVerificationEmail(theToken.email, theToken.token);
    return { success: "Verificatin email sent to your email" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid Credintial" };
        }
        default: {
          return { error: "something went wrong" };
        }
      }
    }
    throw error;
  }
};
