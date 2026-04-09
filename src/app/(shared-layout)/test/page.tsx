
"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useConvexAuth } from "convex/react";


export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
    {isLoading ? null : isAuthenticated && (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text, isCompleted }) => (
          <div key={_id}>
            <span className={isCompleted ? "line-through decoration-2 decoration-red-400" : ""}>
              {text}
            </span>
          </div>
        ))}
      </main>
    )} 
    </>   
  );
}