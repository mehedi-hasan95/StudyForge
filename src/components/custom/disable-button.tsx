import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  label: string;
}
export const DisableButton = ({ label }: Props) => {
  return (
    <Button disabled>
      {label} <Loader2 className="ml-2 h-4 w-4 animate-spin" />
    </Button>
  );
};
