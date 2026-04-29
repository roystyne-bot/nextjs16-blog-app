import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCommentsByPostId = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .order("desc")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .collect();

    return comments;
  },
});

export const createComment = mutation({
  args: {
    body: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const authUser = user as { _id: string; name: string };

    /* Narrows the authenticated user shape so the user id can be stored as the author id.
     */
    return await ctx.db.insert("comments", {
      body: args.body,
      authorName: authUser.name ?? "Anonymous",
      authorId: authUser._id,
      postId: args.postId,
    });
  },
});
