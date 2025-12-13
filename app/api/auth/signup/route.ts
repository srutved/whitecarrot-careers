import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();
    const supabase = createSupabaseServer();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase.from("users").insert({
        id: data.user?.id,
        email,
        name,
    });

    return NextResponse.json({ success: true });
}
