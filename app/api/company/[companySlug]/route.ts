import { createSupabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { companySlug: string } }
) {
    const { companySlug } = await params;

    if (!companySlug) {
        return NextResponse.json(
            { message: "Company slug is required" },
            { status: 400 }
        );
    }

    const supabase = createSupabaseServer();

    const { data, error } = await supabase
        .from("companies")
        .select(`
      id,
      name,
      slug,
      description,
      website,
      primary_color,
      secondary_color,
      text_color,
      logo_url,
      banner_url,
      culture_video_url,
      sections,
      is_published,
      created_at,
      updated_at,
      jobs (
        id,
        title,
        location,
        type,
        department,
        description,
        requirements,
        posted_date,
        created_at
      )
    `)
        .eq("slug", companySlug)
        .eq("is_published", true)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { message: "Company not found or careers page not published" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            company: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                description: data.description,
                website: data.website,
                primary_color: data.primary_color,
                secondary_color: data.secondary_color,
                text_color: data.text_color,
                logo_url: data.logo_url,
                banner_url: data.banner_url,
                culture_video_url: data.culture_video_url,
                sections: data.sections,
                is_published: data.is_published,
                created_at: data.created_at,
                updated_at: data.updated_at
            },
            jobs: data.jobs
        },
        {
            headers: {
                "Cache-Control": "public, max-age=300"
            }
        }
    );
}
