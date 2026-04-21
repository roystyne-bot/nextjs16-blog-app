import { v } from "convex/values";
import { query } from "./_generated/server";


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
})