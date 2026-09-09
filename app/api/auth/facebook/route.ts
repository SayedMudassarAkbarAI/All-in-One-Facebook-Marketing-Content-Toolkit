import { NextResponse } from "next/server";

export async function GET() {
  const appId = process.env.META_APP_ID || process.env.FACEBOOK_APP_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = `${appUrl}/auth/facebook/callback`;

  if (!appId || appId === "your_meta_app_id" || appId === "your_facebook_app_id") {
    // In local sandbox / unconfigured mode, redirect to the auth page with demo parameter
    return NextResponse.redirect(new URL("/auth/facebook?status=demo_connected", appUrl));
  }

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "pages_show_list,pages_read_engagement,pages_manage_posts,read_insights",
    response_type: "code",
    state: "fb_marketing_toolkit",
  });

  return NextResponse.redirect(`https://www.facebook.com/dialog/oauth?${params.toString()}`);
}
