import { prismaDb } from "@/lib/prismaDb";

export const getUserAccountByUserId = async (userId: string) => {
  try {
    const account = await prismaDb.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
