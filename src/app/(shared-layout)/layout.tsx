import { Navbar } from "@/components/web/navbar"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

export default function SharedLayout({ children }: { children: ReactNode }) {
    return(
        <>
        <Navbar />
        <Toaster />
        {children}
        </>
    )
}