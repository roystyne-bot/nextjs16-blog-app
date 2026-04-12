"use server";

import { z } from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
        throw new Error("Invalid input");
    }

    const token = await getToken();

    if (!token) {
        throw new Error("Not authenticated");
    }


    await fetchMutation(api.posts.createPost, {
        title: parsed.data.title,
        body: parsed.data.content
    }, { token });

    return redirect("/"); // Redirect to the homepage after creating the blog post
}