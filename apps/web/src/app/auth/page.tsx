"use client";
import * as React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase";

export default function AuthPage() {
  const supabase = React.useMemo(() => createClient(), []);
  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <Auth
        supabaseClient={supabase as any}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
        redirectTo={typeof window !== "undefined" ? window.location.origin : undefined}
      />
    </div>
  );
}
