"use client";

import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NewUserVerification } from "@/actions/new-user-verification";
import { FormSuccess } from "../form/form-success";
import { FormError } from "../form/form-error";

export const UserVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const submitToken = useCallback(() => {
    if (!token) {
      setError("Token missing");
      return;
    }
    NewUserVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError("Something went wrong"));
  }, [token]);
  useEffect(() => {
    submitToken();
  }, [submitToken]);
  return (
    <CardWrapper
      headerTitle="🔐 Verify"
      headerLabel="Please verify your email"
      backButtonHref="/signin"
      backButtonLabel="Back to login"
    >
      <div className="text-center">
        {!success && !error && (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying your email
          </Button>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
