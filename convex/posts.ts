import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

/**
 * Creates a new blog post for the currently authenticated user.
 */
export const createPost = mutation({
  /**
   * Validates the payload required to create a post.
   */
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage"),
  },
  /**
   * Confirms the user is authenticated, then stores the new post in the database.
   */
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    /**
     * Narrows the authenticated user shape so the user id can be stored as the author id.
     */
    const authUser = user as { _id: string };
    

    /**
     * Inserts the post document and returns its generated id.
     */
    const blogArticle = await ctx.db.insert("posts", {
      content: args.body,
      title: args.title,
      authorId: authUser._id,
      imageStorageId: args.imageStorageId,
    });

    return blogArticle;
  },
});

/**
 * Retrieves all posts in descending order and resolves each stored image id to a public URL.
 */
export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      posts.map(async (post) => {
        /**
         * Converts the storage id into a usable image URL when an image exists.
         */
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

/**
 * Generates a temporary upload URL that authenticated users can use to upload post images.
 */
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Retrieves a single post by id and resolves its image storage id to a public URL.
 */
export const getPostById = query({
  /**
   * Validates the post id supplied by the caller.
   */
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return null;
    }

    /**
     * Resolves the post image into a public URL if an image is attached.
     */
    const resolvedImageUrl =
      post?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(post.imageStorageId)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});
