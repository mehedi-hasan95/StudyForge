import { db } from "@/lib/prismaDb";

export const getVerificationTokenById = async (token: string) => {
  try {
    const vericicationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const vericicationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};
