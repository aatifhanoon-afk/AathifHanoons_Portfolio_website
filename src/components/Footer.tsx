import { Github, Mail, Linkedin, Youtube, ArrowUp, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function Footer() {
  const { state } = usePortfolio();

  return (
    <footer className="relative py-12 border-t border-obsidian-700/30 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg neon-border bg-obsidian-900/50">
              <span className="text-neon-400 font-bold text-sm tracking-wider">{state.initials}</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{state.name}</p>
              <p className="text-xs text-obsidian-100/40">{state.title}</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {Object.entries(state.socialLinks).map(([key, cfg]) => {
              const Icon = socialIcons[key] || Mail;
              return (
                <a
                  key={key}
                  href={cfg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg glass text-obsidian-100/60 hover:text-neon-400 hover:border-neon-400/40 transition-all duration-300"
                  aria-label={cfg.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 flex items-center justify-center rounded-lg glass text-obsidian-100/60 hover:text-neon-400 hover:border-neon-400/40 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-obsidian-700/20 text-center">
          <p className="text-xs text-obsidian-100/30 font-mono">
            © {new Date().getFullYear()} {state.name}. Built with React, Vite & a lot of curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
