import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * GET /api/jobs?companyId=UUID
 * Fetch all jobs for a company (used for refetch)
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const companyId = searchParams.get("companyId")

    if (!companyId) {
        return NextResponse.json(
            { message: "companyId is required" },
            { status: 400 }
        )
    }

    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", companyId)
        .order("posted_date", { ascending: false })

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

/**
 * POST /api/jobs
 * Create a new job
 */
export async function POST(req: Request) {
    const body = await req.json()

    const {
        title,
        location,
        type,
        department,
        description,
        requirements,
        companyId
    } = body

    if (!title || !companyId) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        )
    }

    const { error } = await supabase.from("jobs").insert({
        title,
        location,
        type,
        department,
        description,
        requirements,
        company_id: companyId
    })

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 403 })
    }

    return NextResponse.json({ success: true })
}
