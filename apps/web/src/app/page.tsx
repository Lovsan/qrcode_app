"use client";
import * as React from "react";
import Image from "next/image";
import { AnimatedBorderCard, AnimatedTabs, QRCodeCanvas, SocialQrCard } from "@prismqr/ui-web";
import Link from "next/link";
import { ShareButtons } from "@/src/components/ShareButtons";

export default function Home() {
  const [active, setActive] = React.useState("gen");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 py-24 px-6 sm:px-10">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />

        <AnimatedTabs
          tabs={[
            { id: "gen", label: "Generate" },
            { id: "scan", label: "Scan" },
            { id: "offers", label: "Offers" },
          ]}
          activeId={active}
          onChange={setActive}
        />

        {active === "gen" && (
          <AnimatedBorderCard className="w-full">
          <h2 className="mb-2 text-xl font-semibold">PrismQR</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">The ultimate QR experience. Generate, scan, style, share.</p>
          <div className="flex items-center gap-4">
            <QRCodeCanvas value={process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismqr.app"} size={160} className="rounded-xl shadow-sm" />
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-500">Preview</label>
              <span className="text-sm">{process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismqr.app"}</span>
            </div>
          </div>
          <div className="mt-4">
            <ShareButtons url={process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismqr.app"} title="PrismQR" />
          </div>
          </AnimatedBorderCard>
        )}

        {active === "scan" && (
          <AnimatedBorderCard className="w-full">
            <h2 className="mb-2 text-xl font-semibold">Scan on Mobile</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">Use the Android app to scan and sync securely.</p>
            <Link href="#" className="text-sm underline">Get the app</Link>
          </AnimatedBorderCard>
        )}

        {active === "offers" && (
          <AnimatedBorderCard className="w-full">
            <h2 className="mb-2 text-xl font-semibold">Merchant Offers</h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">Create branded QR offers and share publicly.</p>
            <div className="mt-4">
              <SocialQrCard url={process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismqr.app"} />
            </div>
          </AnimatedBorderCard>
        )}
      </main>
    </div>
  );
}
