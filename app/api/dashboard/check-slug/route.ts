import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
    const supabase = createSupabaseServer();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json(
            { error: "Slug is required" },
            { status: 400 }
        );
    }

    // optional: normalize slug
    const normalizedSlug = slug.trim().toLowerCase();

    const { data, error } = await supabase
        .from("companies")
        .select("id")
        .eq("slug", normalizedSlug)
        .limit(1);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({
        available: data.length === 0,
    });
}
