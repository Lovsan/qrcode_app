import * as React from "react";

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorderCard({ children, className }: AnimatedBorderCardProps) {
  return (
    <div className={`relative rounded-xl p-[1px] overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 animate-border-spin bg-[conic-gradient(var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-cyan-500" />
      <div className="relative z-10 rounded-[11px] bg-white dark:bg-zinc-950 p-6">
        {children}
      </div>
      <style jsx>{`
        .animate-border-spin { animation: borderSpin 6s linear infinite; }
        @keyframes borderSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
