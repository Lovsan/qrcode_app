import * as React from "react";
import { QRCodeCanvas } from "./QRCodeCanvas";

interface SocialQrCardProps {
  url: string;
  title?: string;
  subtitle?: string;
}

export function SocialQrCard({ url, title = "PrismQR", subtitle = "The ultimate QR experience" }: SocialQrCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  async function exportPng() {
    const { toPng } = await import("html-to-image");
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { pixelRatio: 2, backgroundColor: "#0a0a0a" });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "prismqr-card.png";
    a.click();
  }

  return (
    <div className="space-y-3">
      <div ref={ref} className="relative w-[480px] overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="absolute inset-0 -z-10 animate-border-spin bg-[conic-gradient(#0ea5e9,#22d3ee,#a855f7,#ec4899,#0ea5e9)] opacity-30" />
        <div className="grid grid-cols-[160px_1fr] items-center gap-6">
          <div className="rounded-xl border border-zinc-800 bg-black p-2">
            <QRCodeCanvas value={url} size={156} fgColor="#e5e7eb" bgColor="#0a0a0a" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-zinc-400">{subtitle}</p>
            <p className="mt-2 truncate text-sm text-zinc-400">{url}</p>
          </div>
        </div>
      </div>
      <button onClick={exportPng} className="rounded-md bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/20">
        Export PNG
      </button>
      <style jsx>{`
        .animate-border-spin { animation: borderSpin 10s linear infinite; }
        @keyframes borderSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
