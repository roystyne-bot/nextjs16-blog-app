"use client";

import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { error } from "console";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });

async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const { data: result, error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name
    });
   console.log("Result:", result);
   if(!error) {
    window.alert("Sign up successful! Please check your email to verify your account.");
   }
  console.log("Error:", error);
}

  return (
    <div className="font-mono">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
         <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}>
            <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>FullName</FieldLabel>
                        <Input
                         aria-invalid={fieldState.invalid}
                         placeholder="Coldy Daroy" {...field} />
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
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                         aria-invalid={fieldState.invalid}
                         placeholder="coldy.daroy@example.com"
                         type="email" {...field} />
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
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                         aria-invalid={fieldState.invalid}
                         placeholder="••••••••" {...field}
                         type="password" />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                  )}
                />
                <Button>Sign up</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
