import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { decryptToken } from "@/lib/crypto";

export const dynamic = "force-dynamic";

/**
 * Vercel Cron: Scheduled Post Dispatcher
 * Triggered automatically every 5 minutes via vercel.json cron schedule
 */
export async function GET(req: NextRequest) {
  // Optional security check for Vercel Cron secret
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const now = new Date();

    // Query due posts
    const duePosts = await prisma.scheduledPost.findMany({
      where: {
        status: "SCHEDULED",
        scheduledTime: { lte: now },
      },
      include: {
        page: true,
      },
      take: 20, // Process in batches of 20
    });

    if (duePosts.length === 0) {
      return NextResponse.json({ message: "No posts due for publication", processed: 0 });
    }

    const results = [];

    for (const post of duePosts) {
      try {
        // Mark as PUBLISHING to prevent double execution
        await prisma.scheduledPost.update({
          where: { id: post.id },
          data: { status: "PUBLISHING" },
        });

        // Decrypt Page Access Token
        const pageToken = decryptToken(post.page.encryptedPageToken);

        // Call Meta Graph API
        const graphUrl = `https://graph.facebook.com/v19.0/${post.page.pageId}/feed`;
        const res = await fetch(graphUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: post.message,
            link: post.link || undefined,
            access_token: pageToken,
          }),
        });

        const graphData = await res.json();

        if (res.ok && graphData.id) {
          await prisma.scheduledPost.update({
            where: { id: post.id },
            data: {
              status: "PUBLISHED",
              publishedPostId: graphData.id,
              errorMessage: null,
            },
          });
          results.push({ id: post.id, status: "PUBLISHED", publishedPostId: graphData.id });
        } else {
          const errorMsg = graphData.error?.message || "Unknown Meta Graph API error";
          await prisma.scheduledPost.update({
            where: { id: post.id },
            data: {
              status: "FAILED",
              errorMessage: errorMsg,
              retryCount: { increment: 1 },
            },
          });
          results.push({ id: post.id, status: "FAILED", error: errorMsg });
        }
      } catch (err: any) {
        await prisma.scheduledPost.update({
          where: { id: post.id },
          data: {
            status: "FAILED",
            errorMessage: err.message || "Execution failure",
            retryCount: { increment: 1 },
          },
        });
        results.push({ id: post.id, status: "FAILED", error: err.message });
      }
    }

    return NextResponse.json({
      message: `Processed ${results.length} posts`,
      processed: results.length,
      results,
    });
  } catch (error: any) {
    console.error("Cron publish error:", error);
    return NextResponse.json({ error: error.message || "Internal Cron Error" }, { status: 500 });
  }
}
