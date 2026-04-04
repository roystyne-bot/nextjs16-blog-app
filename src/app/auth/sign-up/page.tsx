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

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });

function onSubmit() {
    console.log('Hello coldy')  
}

  return (
    <div className="font-mono">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
