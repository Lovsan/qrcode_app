"use client";
import * as React from "react";

interface ShareButtonsProps {
  url: string;
  title?: string;
}

const enc = encodeURIComponent;

export function ShareButtons({ url, title = "PrismQR" }: ShareButtonsProps) {
  const telegram = `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`;
  const whatsapp = `https://wa.me/?text=${enc(title + " " + url)}`;
  const simplex = `https://simplex.chat/?text=${enc(title + " " + url)}`; // generic share link
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const twitter = `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const discord = `https://discord.com/channels/@me`; // no universal share URL; prompt copy

  function copy() {
    navigator.clipboard.writeText(`${title} ${url}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a className="rounded-md border px-3 py-2 text-sm" href={telegram} target="_blank" rel="noreferrer">Telegram</a>
      <a className="rounded-md border px-3 py-2 text-sm" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="rounded-md border px-3 py-2 text-sm" href={simplex} target="_blank" rel="noreferrer">SimpleX</a>
      <a className="rounded-md border px-3 py-2 text-sm" href={facebook} target="_blank" rel="noreferrer">Facebook</a>
      <a className="rounded-md border px-3 py-2 text-sm" href={twitter} target="_blank" rel="noreferrer">X</a>
      <button onClick={copy} className="rounded-md border px-3 py-2 text-sm">Copy</button>
      <button onClick={() => navigator.share?.({ title, url })} className="rounded-md border px-3 py-2 text-sm">System Share</button>
    </div>
  );
}
