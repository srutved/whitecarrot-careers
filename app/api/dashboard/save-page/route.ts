import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = createSupabaseServer();
    const body = await req.json();

    // 1. Auth check
    const {
        data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // 2. Get user + company_id
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id, company_id")
        .eq("id", authUser.id)
        .single();

    if (userError) {
        return NextResponse.json(
            { error: userError.message },
            { status: 500 }
        );
    }

    // 3. CREATE COMPANY (first time)
    if (!user.company_id) {
        const { data: company, error: createError } = await supabase
            .from("companies")
            .insert({
                name: body.name ?? null,
                slug: body.slug ?? null,
                description: body.description ?? null,
                website: body.website ?? null,

                primary_color: body.primary_color ?? null,
                secondary_color: body.secondary_color ?? null,
                text_color: body.text_color ?? null,
                logo_url: body.logo_url ?? null,
                banner_url: body.banner_url ?? null,
                culture_video_url: body.culture_video_url ?? null,

                sections: body.sections ?? [],
                is_published: true,
            })
            .select()
            .single();

        if (createError) {
            return NextResponse.json(
                { error: createError.message },
                { status: 500 }
            );
        }

        // link company to user
        await supabase
            .from("users")
            .update({ company_id: company.id })
            .eq("id", user.id);

        return NextResponse.json({ company });
    }

    // 4. UPDATE COMPANY (normal case)
    const { data: updatedCompany, error: updateError } = await supabase
        .from("companies")
        .update({
            name: body.name,
            slug: body.slug,
            description: body.description,
            website: body.website,

            primary_color: body.primary_color,
            secondary_color: body.secondary_color,
            text_color: body.text_color,
            logo_url: body.logo_url,
            banner_url: body.banner_url,
            culture_video_url: body.culture_video_url,

            sections: body.sections,
            is_published: true,

            updated_at: new Date().toISOString(),
        })
        .eq("id", user.company_id)
        .select()
        .single();

    if (updateError) {
        return NextResponse.json(
            { error: updateError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ company: updatedCompany });
}
