import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET() {
    const supabase = createSupabaseServer();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

    return NextResponse.json({ user: profile });
}
