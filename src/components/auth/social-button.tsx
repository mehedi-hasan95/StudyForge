"use client";

import { Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const SocialButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const socialLogin = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => socialLogin("google")}
      >
        <Image
          src="/google.svg"
          alt=""
          height={500}
          width={500}
          className="h-7 w-7"
        />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => socialLogin("github")}
      >
        <Github />
      </Button>
    </div>
  );
};
