import { db } from "@/lib/prismaDb";

export const getUserAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
