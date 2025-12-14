import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { da } from "date-fns/locale";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const supabase = createSupabaseServer();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 401 }
            );
        }

        const { data } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        return NextResponse.json({ success: true, data });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
