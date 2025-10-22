import * as React from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function AnimatedTabs({ tabs, activeId, onChange }: AnimatedTabsProps) {
  return (
    <div className="relative inline-flex rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-1">
      <div
        className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-zinc-800 transition-all duration-300"
        style={{
          left: `${Math.max(0, tabs.findIndex((t) => t.id === activeId)) * 120 + 4}px`,
          width: "112px",
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative z-10 h-10 w-28 rounded-xl text-sm font-medium transition-colors ${
            activeId === tab.id ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
