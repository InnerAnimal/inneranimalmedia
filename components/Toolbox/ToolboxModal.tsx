'use client';

import { useEffect, useRef } from 'react';
import { MagicButton } from './MagicButton';
import { ToolCard } from './ToolCard';

interface ToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const aiTools = [
  {
    id: 'code-gen',
    name: 'AI Code Generator',
    description: 'Generate complete features with AI',
    icon: '🤖',
    badge: 'AI',
    badgeColor: 'from-purple to-mint',
    action: 'generate-code',
  },
  {
    id: 'deploy',
    name: 'Auto-Deploy',
    description: 'Deploy to Vercel or Cloudflare',
    icon: '🚀',
    badge: 'AI',
    badgeColor: 'from-orange to-orange-dark',
    action: 'auto-deploy',
  },
  {
    id: 'api-wizard',
    name: 'API Wizard',
    description: 'Configure Stripe, Supabase, etc.',
    icon: '🪄',
    badge: 'AI',
    badgeColor: 'from-teal to-mint',
    action: 'api-wizard',
  },
];

const externalTools = [
  {
    name: 'Vercel',
    url: 'https://vercel.com/inneranimal',
    icon: '▲',
    badge: 'V',
    badgeColor: 'bg-black',
    description: 'Deployments & previews',
  },
  {
    name: 'Cloudflare',
    url: 'https://dash.cloudflare.com',
    icon: '☁️',
    badge: 'CF',
    badgeColor: 'bg-[#F48120]',
    description: 'DNS · CDN · Security',
  },
  {
    name: 'Supabase',
    url: 'https://supabase.com/dashboard',
    icon: '🗄️',
    badge: 'SB',
    badgeColor: 'bg-[#3ECF8E]',
    description: 'Database & Auth',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/InnerAnimal',
    icon: '🐙',
    badge: 'GH',
    badgeColor: 'bg-[#24292f]',
    description: 'Repos & actions',
  },
  {
    name: 'Stripe',
    url: 'https://dashboard.stripe.com',
    icon: '💳',
    badge: '$',
    badgeColor: 'bg-[#635bff]',
    description: 'Payments',
  },
  {
    name: 'Google Analytics',
    url: 'https://analytics.google.com',
    icon: '📊',
    badge: 'GA',
    badgeColor: 'bg-[#e37400]',
    description: 'Traffic & conversions',
  },
];

export function ToolboxModal({ isOpen, onClose }: ToolboxModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleTrapFocus = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTrapFocus);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTrapFocus);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLinks = async () => {
    const links = externalTools.map((tool) => `${tool.name}: ${tool.url}`).join('\n');
    try {
      await navigator.clipboard.writeText(links);
      alert('Tool links copied to clipboard ✅');
    } catch (error) {
      console.error(error);
      alert('Could not copy links');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10001] bg-black/55 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="toolbox-title"
    >
      <div
        ref={dialogRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(980px,90vw)] max-h-[80vh] overflow-auto glass rounded-[20px] p-6"
        role="document"
        style={{
          background:
            'linear-gradient(180deg, var(--glass-bg), rgba(0,0,0,0.05))',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--nav-border)] mb-4">
          <h2
            id="toolbox-title"
            className="text-xl font-extrabold tracking-wide text-[var(--nav-text)]"
          >
            🤖 AI-Powered Toolbox
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleCopyLinks}
              className="px-3 py-2 rounded-lg border border-[var(--glass-border)] bg-transparent text-[var(--nav-link)] font-bold text-sm hover:bg-[var(--nav-hover-bg)] transition-colors"
            >
              Copy Links
            </button>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] text-white font-extrabold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* AI-Powered Tools */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-[var(--nav-text)] flex items-center gap-2">
            <span className="text-2xl">✨</span>
            AI Magic Buttons
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTools.map((tool) => (
              <MagicButton key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* External Tools */}
        <section>
          <h3 className="text-lg font-bold mb-4 text-[var(--nav-text)] flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            Quick Links
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {externalTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--nav-border)] text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🔐 All API calls are secure and server-side only
          </p>
        </div>
      </div>
    </div>
  );
}
