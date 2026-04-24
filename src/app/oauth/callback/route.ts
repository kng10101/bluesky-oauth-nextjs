import { Agent } from "@atproto/api";
import { type NextRequest, NextResponse } from "next/server";
import { createUser } from "@/functions/create-user";
import createBlueskyClient from "@/lib/atproto";
import getSession from "@/lib/iron";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Get the next URL from the request
  const nextUrl = request.nextUrl;

  try {
    // Create a Bluesky client
    const blueskyClient = await createBlueskyClient(prisma);

    // Get the session and state from the callback
    const { session } = await blueskyClient.callback(nextUrl.searchParams);

    // Create an agent
    const agent = new Agent(session);

    // Get the profile of the user
    const { data } = await agent.getProfile({
      actor: session.did,
    });

    // Create a user from the Bluesky profile
    const ironSession = await getSession();

    // Save the user to the session
    ironSession.user = createUser(data);

    // Save the session
    await ironSession.save();

    // Redirect to the private page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/private`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      // Bluesky error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/oauth/login?error=${e.message}`,
      );
    } else {
      // Unknown error
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/oauth/login?error=Unknown error`,
      );
    }
  }
}
