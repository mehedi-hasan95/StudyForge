import { prismaDb } from "@/lib/prismaDb";

export const getVerificationTokenById = async (token: string) => {
  try {
    const vericicationToken = await prismaDb.verificationToken.findUnique({
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
    const vericicationToken = await prismaDb.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return vericicationToken;
  } catch (error) {
    return null;
  }
};
