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

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.email("Invalid email.").min(1, "Email is required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { register } = useUser();
  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: standardSchemaResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const { confirmPassword, ...submitData } = data;
      await register(submitData);
      toast.success("Account created successfully");
      navigate({ to: "/home" });
    } catch (error) {
      toast.error("Error creating account. Please try again.", {
        richColors: true,
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  });

  return (
    <Card className="w-full sm:max-w-md backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <CardTitle>Create Account</CardTitle>
        <CardDescription className="text-center">
          Get started by creating your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-email"
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
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
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
          <Button className="w-full" type="submit" form="sign-up-form">
            Create Account
          </Button>
        </Field>
        <Field
          orientation="horizontal"
          className="flex items-center gap-2 w-full justify-center"
        >
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Link to="/auth/sign-in" className="text-sm underline">
            Sign In
          </Link>
        </Field>
      </CardFooter>
    </Card>
  );
}
