import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

/**
 * Meta User Data Deletion Callback
 * Reference: https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback/
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const signedRequest = formData.get("signed_request") as string;

    if (!signedRequest) {
      return NextResponse.json({ error: "Missing signed_request parameter" }, { status: 400 });
    }

    const [encodedSig, payload] = signedRequest.split(".");
    const appSecret = process.env.META_APP_SECRET || "default_secret";

    // Validate signature
    const expectedSig = crypto
      .createHmac("sha256", appSecret)
      .update(payload)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    if (encodedSig !== expectedSig && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    const metaUserId = data.user_id;

    const confirmationCode = `FB-DEL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Record deletion and cleanup if user exists
    if (metaUserId) {
      try {
        await prisma.dataDeletionLog.create({
          data: {
            confirmationCode,
            metaUserId: String(metaUserId),
            status: "COMPLETED",
            completedAt: new Date(),
          },
        });

        // Cleanup user FacebookAccount and Pages if present
        await prisma.facebookAccount.deleteMany({
          where: { metaUserId: String(metaUserId) },
        });
      } catch (err) {
        console.error("Data deletion cleanup error:", err);
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://facebook-toolkit.vercel.app";
    const statusUrl = `${appUrl}/data-deletion?code=${confirmationCode}`;

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    });
  } catch (error) {
    console.error("Data deletion callback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
