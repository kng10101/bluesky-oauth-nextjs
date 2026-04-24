import { NextResponse } from "next/server";
import { blueskyClientMetadata } from "@/lib/atproto";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(blueskyClientMetadata(), {
    status: 200,
  });
}
