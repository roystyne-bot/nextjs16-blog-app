"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/app/schemas/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createBlogAction } from "@/app/actions";

export default function CreateRoute() {
  /*const router = useRouter();*
  const [isPending, startTransition] = useTransition();

  const mutation = useMutation(api.posts.createPost);
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    startTransition(async () => {
      console.log('Hey this runs on the server side');

      await createBlogAction(values);

      form.reset();
    });
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1
          className="text-4xl font-bold mb-4 tracking-tight
             sm:text-5xl"
        >
          Create a new post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world§
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add your form fields here */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Title Field */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter post title"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/*Content Field*/}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter cool post content"
                      {...field}
                    ></Textarea>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
