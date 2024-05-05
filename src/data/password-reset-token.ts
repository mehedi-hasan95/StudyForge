import { db } from "@/lib/prismaDb";

export const getPasswordResetByToken = async (token: string) => {
  try {
    const vericicationToken = await db.passwordResetToken.findUnique({
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
    const vericicationToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};
