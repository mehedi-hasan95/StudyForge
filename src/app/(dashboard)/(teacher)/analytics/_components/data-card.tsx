import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormatPrice } from "@/lib/format";

interface Props {
  value: number;
  label: string;
  shouldFormat?: boolean;
}
export const DataCard = ({ label, value, shouldFormat }: Props) => {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? FormatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
