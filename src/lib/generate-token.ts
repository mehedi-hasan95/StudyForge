import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { prismaDb } from "./prismaDb";
import { getPasswordResetByEmail } from "@/data/password-reset-token";

// Generate token for verify user
export const generateVerifyToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prismaDb.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prismaDb.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return verificationToken;
};

// Generate token for forgot password

export const generateForogtPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 100);

  const existingToken = await getPasswordResetByEmail(email);
  if (existingToken) {
    await prismaDb.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prismaDb.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return verificationToken;
};
