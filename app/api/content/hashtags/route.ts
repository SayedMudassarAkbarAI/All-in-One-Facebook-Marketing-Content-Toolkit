import { NextResponse } from "next/server";
import { generateSmartHashtags } from "@/lib/hashtags";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const topic = body.topic || "";
    const nicheId = body.nicheId;

    const result = generateSmartHashtags(topic, nicheId);
    return NextResponse.json({
      success: true,
      topic,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate hashtags" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic") || "";
  const nicheId = searchParams.get("niche") || undefined;

  const result = generateSmartHashtags(topic, nicheId);
  return NextResponse.json({
    success: true,
    topic,
    data: result,
  });
}
