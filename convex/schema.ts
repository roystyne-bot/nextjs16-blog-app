import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  })
  .searchIndex("search_title", {
    searchField: "title",
  })
  .searchIndex("search_content", {
    searchField: "content",
  }),
  comments: defineTable({
    body: v.string(),
    authorName: v.string(),
    authorId: v.string(),
    postId: v.id("posts"),
  }),

});