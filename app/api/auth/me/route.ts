import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET() {
    const supabase = createSupabaseServer();

    // 1. Get authenticated user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email_confirmed_at) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // 2. Fetch user profile + company in ONE query
    const { data, error } = await supabase
        .from("users")
        .select(`
      id,
      email,
      name,
      role,
      company_id,
      companies (
        id,
        name,
        slug
      )
    `)
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ user: data });
}
