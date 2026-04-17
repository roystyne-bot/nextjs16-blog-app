import { NextResponse } from "next/server";

/**
 * Test API route for blog creation requests.
 * Currently logs a server-side message and returns a success response.
 */
export async function POST() {
  // Handles POST requests sent to the create-blog API endpoint.
  console.log("Hello from the server...");

  return NextResponse.json({ success: true })
}
