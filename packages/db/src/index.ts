import { createClient } from "@supabase/supabase-js";

export type { SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}
