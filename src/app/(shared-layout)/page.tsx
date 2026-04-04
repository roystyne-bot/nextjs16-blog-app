import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
   <div>
    <h1>Welcome to the Blog App</h1>
    <Link href='/test'>Go to Test page</Link><br />
    <Link href='/contact/user'>Access the user page</Link>
   </div>
  );
}
