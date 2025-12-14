import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServer();

  // auth check
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

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
        created_at,
        updated_at
      )
    )
  `)
    .eq("id", authUser.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    user: {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      company_id: data.company_id,
    },
    company: data.companies,
  });
}
