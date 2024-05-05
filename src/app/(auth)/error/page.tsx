import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div>
      <CardWrapper
        headerTitle="Error"
        headerLabel="Opps!! Something went Wrong"
        backButtonHref="/signin"
        backButtonLabel="Login"
      >
        <p className="flex items-center gap-1">
          <AlertTriangle /> Something went wrong
        </p>
      </CardWrapper>
    </div>
  );
};

export default ErrorPage;
