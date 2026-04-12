import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new post with the given title and body,
//  and associate it with the currently authenticated user.
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const authUser = user as { _id: string };
    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      content: args.body,
      authorId: authUser._id,
    });
    return blogArticle;
  },
});
