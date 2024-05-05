import { prismaDb } from "@/lib/prismaDb";

export const getPasswordResetByToken = async (token: string) => {
  try {
    const vericicationToken = await prismaDb.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetByEmail = async (email: string) => {
  try {
    const vericicationToken = await prismaDb.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};
