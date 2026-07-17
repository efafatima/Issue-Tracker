import { fail } from "@/lib/api";
import { serverSupabase } from "@/lib/supabaseClient";

export async function currentUser(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return { error: fail("Authentication required", 401) };

  const supabase = serverSupabase();
  let authData;
  let authError;
  try {
    const result = await supabase.auth.getUser(token);
    authData = result.data;
    authError = result.error;
  } catch (error) {
    console.error("Supabase auth connection failed:", error.message);
    return { error: fail("Supabase connection timed out. Please check your internet connection and Supabase project status.", 503) };
  }
  if (authError || !authData?.user) return { error: fail("Invalid session", 401) };

  let profile;
  let profileError;
  try {
    const result = await supabase
      .from("profiles")
      .select("*, departments:department_id(id,name)")
      .eq("id", authData.user.id)
      .single();
    profile = result.data;
    profileError = result.error;
  } catch (error) {
    console.error("Supabase profile connection failed:", error.message);
    return { error: fail("Supabase connection timed out. Please check your internet connection and Supabase project status.", 503) };
  }

  if (profileError || !profile) return { error: fail("Profile not found", 403) };
  return { supabase, authUser: authData.user, profile };
}

export function requireRole(profile, roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return allowed.includes(profile.role);
}
