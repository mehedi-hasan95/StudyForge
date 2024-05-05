import { CurrentUserRole } from "@/lib/current-user";
import { userRole } from "@prisma/client";
import { FormError } from "../form/form-error";

interface PermitedUserProps {
  children: React.ReactNode;
  permitedUser: userRole;
}

export const PermitedUser = async ({
  children,
  permitedUser,
}: PermitedUserProps) => {
  const role = await CurrentUserRole();
  if (role !== permitedUser) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }
  return <>{children}</>;
};
