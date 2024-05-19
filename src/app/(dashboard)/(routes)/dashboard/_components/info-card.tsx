import { IconBadge } from "@/components/custom/icon-badge";
import { LucideIcon } from "lucide-react";

interface Props {
  numberOfItems: number;
  label: string;
  icon: LucideIcon;
}
export const InfoCard = ({ icon: Icon, label, numberOfItems }: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p>
          {numberOfItems} {numberOfItems > 1 ? "Courses" : "Course"}
        </p>
      </div>
    </div>
  );
};
