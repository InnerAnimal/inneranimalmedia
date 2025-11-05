'use client';

import { useState } from 'react';

interface MagicButtonProps {
  tool: {
    id: string;
    name: string;
    description: string;
    icon: string;
    badge: string;
    badgeColor: string;
    action: string;
  };
}

export function MagicButton({ tool }: MagicButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleClick = async () => {
    if (!showPrompt) {
      setShowPrompt(true);
      return;
    }

    if (!prompt.trim()) {
      alert('Please describe what you need!');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: tool.action,
          prompt: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result || 'Success! ✅');
      } else {
        setResult(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Network error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowPrompt(false);
    setPrompt('');
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-3 bg-gradient-to-br from-white/10 to-black/10 dark:from-white/5 dark:to-black/20 border border-[var(--glass-border)] rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-[var(--accent)]">
      {/* Tool Header */}
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.badgeColor} grid place-items-center text-white font-black text-sm shadow-lg flex-shrink-0`}
        >
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-[var(--nav-text)] text-sm mb-1">
            {tool.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {tool.description}
          </div>
        </div>
      </div>

      {/* Prompt Input (Expandable) */}
      {showPrompt && !result && (
        <div className="space-y-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you need... (e.g., 'Create a Stripe subscription checkout page')"
            className="w-full px-3 py-2 rounded-lg border border-[var(--nav-border)] bg-white/50 dark:bg-black/20 text-sm text-[var(--nav-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="p-3 rounded-lg bg-white/30 dark:bg-black/30 border border-[var(--nav-border)]">
          <pre className="text-xs text-[var(--nav-text)] whitespace-pre-wrap font-mono">
            {result}
          </pre>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!result && (
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${tool.badgeColor} text-white hover:scale-105 active:scale-95 shadow-md`
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚙️</span>
                Processing...
              </span>
            ) : showPrompt ? (
              '✨ Generate with AI'
            ) : (
              `${tool.icon} Start`
            )}
          </button>
        )}

        {(showPrompt || result) && (
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-lg font-bold text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
