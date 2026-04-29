"use client";

import { Button, buttonVariants } from "../ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comments";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import z from "zod";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

/*interface iAppsProps {
  comments: {
    _id: Id<"comments">;
    body: string;
    authorName: string;
    authorId: string;
    postId: Id<"posts">;
    _creationTime: number;
  }[];
}*/

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
  const params = useParams<{ postId: Id<"posts"> }>();
  const data = usePreloadedQuery(props.preloadedComments);
  const [isPending, startTransition] = useTransition();
  const createComment = useMutation(api.comments.createComment);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    },
  });

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        const result = await createComment(data);
        if (result) {
          toast.success("Comment created successfully");
        }
        form.reset();
      } catch {
        toast.error("Failed to create comment");
      }
    });
  }

  if (data === undefined) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageSquare className="size-5" />
          <h2 className="text-xl font-bold">{data.length} Comments</h2>
        </CardHeader>
        <CardContent className="space-y-8">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Make a comment</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Share your thoughts"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              disabled={isPending}
              className={buttonVariants({
                variant: "undefined",
                className: "bg-chart-4 hover:bg-chart-4/90 text-white",
              })}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Share</span>
              )}
            </Button>
          </form>

          {data?.length > 0 && <Separator />}

          <section className="space-y-6">
            {data?.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semiboldbold text-sm">
                      {comment.authorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(comment._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {comment.body}
                </p>
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
    </>
  );
}
