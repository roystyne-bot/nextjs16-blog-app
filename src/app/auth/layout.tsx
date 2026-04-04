import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function AuthLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="font-mono min-h-screen flex items-center justify-center">
        {/*Go back button*/}
        <div className="absolute top-5 left-5">
           <Link href="/"
            className={buttonVariants({ variant: 'secondary' })}
            >
            <ArrowLeft className="size-4"/>
            Back
           </Link>
        </div>

        {/*Children rendering(sign-up form)*/}
        <div className="w-full max-w-md mx-auto">
            {children}
        </div>
      
    </div>
  );
}