"use server";
import { getUserById } from "@/data/userInfo";
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { UpdateProfileSchema } from "@/schema";
import * as z from "zod";

import bcrypt from "bcryptjs";

export const UpdateProfileActions = async (
  values: z.infer<typeof UpdateProfileSchema>
) => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return { error: "Unauthorize user" };
  }

  if (currentUser.isOuth) {
    (values.newPassword = undefined), (values.password = undefined);
  }

  const existingUser = await getUserById(currentUser.id as string);
  if (!existingUser) {
    return { error: "Unauthorize user" };
  }

  //   Check the password match with the db. If match then can update password

  if (values.password && values.newPassword && existingUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return { error: "Old password didn't match" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  const updatedUser = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
