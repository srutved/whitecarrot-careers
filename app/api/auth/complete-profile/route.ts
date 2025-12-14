import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST() {
    const supabase = createSupabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email_confirmed_at) {
        return NextResponse.json(
            { error: "Email not verified" },
            { status: 401 }
        );
    }

    const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

    if (!existing) {
        const res = await supabase.from("users").insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name,
            role: "RECRUITER",
        });

        if (res.error) {
            console.error("Error inserting user:", res.error);
            return NextResponse.json(
                { error: "Failed to create user profile" },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ success: true });
}
