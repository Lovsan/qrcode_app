import * as React from "react";
import QRCode from "qrcode";

interface QRCodeCanvasProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  logoUrl?: string;
  className?: string;
}

export function QRCodeCanvas({ value, size = 256, fgColor = "#111827", bgColor = "#ffffff", logoUrl, className }: QRCodeCanvasProps) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    (async () => {
      await QRCode.toCanvas(ref.current!, value, {
        width: size,
        color: { dark: fgColor, light: bgColor },
        margin: 2,
      });
      if (logoUrl) {
        const ctx = ref.current!.getContext("2d");
        if (!ctx) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const s = Math.floor(size * 0.2);
          const x = (size - s) / 2;
          const y = (size - s) / 2;
          ctx.save();
          ctx.beginPath();
          const r = 12;
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + s, y, x + s, y + s, r);
          ctx.arcTo(x + s, y + s, x, y + s, r);
          ctx.arcTo(x, y + s, x, y, r);
          ctx.arcTo(x, y, x + s, y, r);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x, y, s, s);
          ctx.restore();
        };
        img.src = logoUrl;
      }
    })();
  }, [value, size, fgColor, bgColor, logoUrl]);

  return <canvas ref={ref} width={size} height={size} className={className} />;
}
