"use client";
import * as React from "react";
import { createClient } from "@/lib/supabase";

export default function AdminPage() {
  const supabase = React.useMemo(() => createClient(), []);
  const [siteUrl, setSiteUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [role, setRole] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) {
        setError("Please sign in to access admin");
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userRes.user.id)
        .maybeSingle();
      setRole(profile?.role ?? null);
      const { data: cfg } = await supabase.from("app_config").select("site_url,social_title,social_subtitle").single();
      if (cfg) {
        setSiteUrl(cfg.site_url);
        setTitle(cfg.social_title);
        setSubtitle(cfg.social_subtitle);
      }
      setLoading(false);
    })();
  }, [supabase]);

  const canEdit = role === "admin";

  async function save() {
    setError(null);
    const { error } = await supabase
      .from("app_config")
      .update({ site_url: siteUrl, social_title: title, social_subtitle: subtitle })
      .eq("id", 1);
    if (error) setError(error.message);
  }

  if (loading) return <div className="p-8">Loading…</div>;
  if (!canEdit) return <div className="p-8">Access denied. Admins only.</div>;

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Admin Panel</h1>
      {error && <div className="mb-4 rounded-md border border-red-500 bg-red-50 p-3 text-red-700">{error}</div>}
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-zinc-600">Site URL</span>
          <input className="rounded-md border p-2" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-zinc-600">Social Title</span>
          <input className="rounded-md border p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-zinc-600">Social Subtitle</span>
          <input className="rounded-md border p-2" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </label>
        <button onClick={save} className="mt-4 w-fit rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
          Save
        </button>
      </div>
    </div>
  );
}
