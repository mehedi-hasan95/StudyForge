"use client";
import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  // Get the url where i visit after login (proctected route)
  const callbackUrl = searchParams.get("callbackUrl");

  // Is user use same email in github or google?
  const SameAccountError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already exist in diffrent provider"
      : "";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <CardWrapper
      headerTitle="Login"
      headerLabel="Welcome back"
      backButtonHref="/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <Button variant={"link"} size={"sm"} className={cn("px-0")}>
                  <Link href="/forgot-password">Forgot Password?</Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error || SameAccountError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className={cn("disabled:cursor-not-allowed")}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
