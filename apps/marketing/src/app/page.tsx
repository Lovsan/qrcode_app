import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <main className="flex w-full max-w-5xl flex-col items-center gap-12 py-24 px-6 sm:px-10">
        <div className="flex items-center gap-3">
          <Image className="dark:invert" src="/next.svg" alt="logo" width={80} height={16} />
          <h1 className="text-3xl font-semibold">PrismQR</h1>
        </div>
        <p className="max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400">
          The best way to generate, scan, and share beautiful QR codes across web and Android.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/download" className="rounded-full bg-black px-6 py-3 text-white dark:bg-white dark:text-black">Download Android</Link>
          <Link href="https://app.prismqr.app" className="rounded-full border px-6 py-3">Open Web App</Link>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Style Templates", desc: "Animated borders, logos, colors" },
            { title: "Cloud Sync", desc: "History across devices" },
            { title: "Merchant Offers", desc: "Create branded promo QR" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border p-6">
              <h3 className="mb-1 font-medium">{f.title}</h3>
              <p className="text-sm text-zinc-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
