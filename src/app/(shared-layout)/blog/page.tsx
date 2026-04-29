/*"use client"; Will be transformed into a server component*/

import Image from "next/image";
/*import { useQuery } from "convex/react";*/
import { api } from "../../../../convex/_generated/api";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import type { Metadata } from 'next';
export const dynamic = "force-static";
export const revalidate = 30;

 
export const metadata: Metadata = {
  title: "Blog - My Awesome Blog",
  description: "Read the latest insights, thoughts, and trends from our team on our blog.",
  category: "Blog",
  authors: [{ name: "Coldy Daroy"}],
}


export function BlogPage() {
  /*const data = useQuery(api.posts.getPosts);*/

  return (
    <main className="py-12">
      {/* Header section with title and description */}
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our <span className="text-chart-4">Blog</span>
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team!
        </p>
      </div>

      {/* Display blog posts in a responsive grid */}
      <Suspense fallback={<SkeletonLoader />}>
        <LoadBlogPosts />
      </Suspense>
    </main>
  );
}

export default BlogPage;

async function LoadBlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = await fetchQuery(api.posts.getPosts, {});

  if (!data) {
    toast.error(
      "Failed to load posts, please try again later or check your connection.",
    );
    return null;
  }

  console.log(data[0]?.imageUrl);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Toaster />
      {data.length === 0 ? (
        <Card className="col-span-full text-center">
          <CardHeader>
            <CardTitle className="text-2xl">No posts founded</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        data.map((post) => (
          <Card key={post._id} className="pt-0">
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={
                  post.imageUrl ??
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                }
                alt={post.title}
                width={500}
                height={300}
                loading="eager"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h1 className="text-xl font-bold hover:text-chart-4">
                  {post.title}
                </h1>
              </Link>
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="border-none bg-transparent">
              <Link
                className={buttonVariants({
                  variant: "undefined",
                  className: "w-full bg-chart-4 hover:bg-chart-4/90",
                })}
                href={`/blog/${post._id}`}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse space-y-3 flex flex-col gap-4"
        >
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-6 w-3/4"></Skeleton>
            <Skeleton className="h-4 w-full"></Skeleton>
            <Skeleton className="h-4 w-2/3"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}
