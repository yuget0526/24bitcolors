import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const anonymousId = searchParams.get("id");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    if (!anonymousId) {
      return NextResponse.json(
        { error: "Anonymous ID is required" },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error("Supabase client is not configured");
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from("diagnoses")
      .select("id, hex, created_at") // 必要なカラムのみ取得
      .eq("anonymous_id", anonymousId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Supabase error fetching history:", error);
      return NextResponse.json(
        { error: "Failed to fetch history" },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: data });
  } catch (e) {
    console.error("Unexpected error in history API:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
