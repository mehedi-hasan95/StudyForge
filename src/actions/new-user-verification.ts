"use server";

import { getUserByEmail } from "@/data/userInfo";
import { getVerificationTokenById } from "@/data/verification-token";
import { prismaDb } from "@/lib/prismaDb";

export const NewUserVerification = async (token: string) => {
  // Is verificatin token exist
  const existingToken = await getVerificationTokenById(token);
  if (!existingToken) {
    return { error: "Token is not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token is Expired" };
  }

  //   Is email exist
  const emailExist = await getUserByEmail(existingToken.email);
  if (!emailExist) {
    return { error: "Email is not exist" };
  }

  await prismaDb.user.update({
    where: { id: emailExist.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  //   Delete verification email
  await prismaDb.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email has been verified" };
};
