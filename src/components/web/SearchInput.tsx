import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { term: term, limit: 5 } : "skip",
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4" />
        <Input
          type="search"
          placeholder="Search posts..."
          className="w-full pl-8 bg-background"
          value={term}
          onChange={handleInputChange}
        />
      </div>

      {open && term.length >= 2 && (
        <div
          className="absolute top-full mt-2 rounded-md
         border bg-popover text-popover-foreground
        shadow-lg z-10 outline-none animate-in fade-in-0
        zoom-in-95"
        >
          {/* Render search results here */}
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm
            text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin"/>
              <p>Loading...</p>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No results found.</p>
          ) : (
            results.map((post) => (
              <Link
                href={`/blog/${post._id}`}
                key={post._id}
                onClick={() => {
                    setOpen(false);
                    setTerm("");
                }}
                className="flex flex-col px-4 py-2 text-sm hover:bg-accent rounded-md cursor-pointer"
              >
                <p className="font-medium truncate">{post.title}</p>
                <p className="text-muted-foreground text-xs truncate pt-1">
                  {post.content.substring(0, 60)}
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
