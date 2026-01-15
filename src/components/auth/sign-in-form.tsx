"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useUser } from "@/contexts/user-context";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  password: z.string().min(1, "Password is required."),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { login } = useUser();
  const navigate = useNavigate();

  const form = useForm<SignInFormData>({
    resolver: standardSchemaResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await login(data);
      toast.success("Signed in successfully");
      navigate({ to: "/home" });
    } catch (error) {
      toast.error("Error signing in. Please try again.", {
        richColors: true,
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  });

  return (
    <Card className="w-full sm:max-w-md backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <CardTitle>Sign In</CardTitle>
        <CardDescription className="text-center">
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="sign-in-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-in-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="sign-in-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <Field orientation="horizontal">
          <Button className="w-full" type="submit" form="sign-in-form">
            Sign In
          </Button>
        </Field>
        <Field
          orientation="horizontal"
          className="flex items-center gap-2 w-full justify-center"
        >
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <Link to="/auth/sign-up" className="text-sm underline">
            Sign Up
          </Link>
        </Field>
      </CardFooter>
    </Card>
  );
}
