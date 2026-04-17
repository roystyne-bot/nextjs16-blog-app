"use server";

import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File;

    if (!title || !content) return { error: "Invalid input" };
    if (!image || image.size === 0) return { error: "Image is required" };

    const token = await getToken();
    if (!token) return { error: "Not authenticated" };

    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: { "Content-Type": image.type },
      body: image,
    });

    if (!uploadResult.ok) return { error: "Failed to upload image" };

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      { title, body: content, imageStorageId: storageId },
      { token }
    );

  } catch (e) {
    console.error(e); // ✅ shows actual error in terminal
    return { error: "Failed to create post" };
  }

  return redirect("/blog");
}