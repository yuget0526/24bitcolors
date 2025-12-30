import { NextRequest, NextResponse } from "next/server";
import { generateColorInsight } from "@/lib/gemini";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hex = searchParams.get("hex");
  const name = searchParams.get("name");
  const locale = searchParams.get("locale") || "ja";

  if (!hex || !name) {
    return NextResponse.json(
      { error: "Missing hex or name parameter" },
      { status: 400 }
    );
  }

  try {
    // Add # prefix if missing
    const safeHex = hex.startsWith("#") ? hex : `#${hex}`;

    const insight = await generateColorInsight(safeHex, name, locale);

    if (!insight) {
      return NextResponse.json(
        { error: "Failed to generate insight" },
        { status: 500 }
      );
    }

    return NextResponse.json(insight);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
