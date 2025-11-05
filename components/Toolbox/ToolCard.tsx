interface ToolCardProps {
  tool: {
    name: string;
    url: string;
    icon: string;
    badge: string;
    badgeColor: string;
    description: string;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 bg-gradient-to-br from-white/10 to-black/10 dark:from-white/5 dark:to-black/20 border border-[var(--glass-border)] rounded-xl p-3 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-[var(--accent)] group"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg ${tool.badgeColor} grid place-items-center text-white font-black text-xs shadow-md flex-shrink-0`}
        >
          {tool.badge}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-[var(--nav-text)] text-sm group-hover:text-[var(--accent)] transition-colors">
            {tool.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {tool.description}
          </div>
        </div>
      </div>
    </a>
  );
}
