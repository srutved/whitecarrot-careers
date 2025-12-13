import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServer() {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll: async () => (await cookies()).getAll(),
                setAll: (cookiesToSet) =>
                    cookiesToSet.forEach(async ({ name, value, options }) =>
                        (await cookies()).set(name, value, options)
                    ),
            },
        }
    );
}
