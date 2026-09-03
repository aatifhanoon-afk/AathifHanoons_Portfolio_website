import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Youtube } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const dockIcons: Record<string, typeof Mail> = {
  email: Mail,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function FloatingContactDock() {
  const { state } = usePortfolio();

  const dockLinks = Object.entries(state.socialLinks).filter(([, cfg]) => cfg.showInDock);

  if (dockLinks.length === 0) return null;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 30 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      <div className="relative group">
        {/* Collapsed state: vertical bar with icons */}
        <div className="flex flex-col gap-1 p-2 rounded-2xl glass-strong border border-neon-400/10 box-glow">
          {dockLinks.map(([key, cfg]) => {
            const Icon = dockIcons[key] || Mail;
            return (
              <a
                key={key}
                href={cfg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/item relative w-11 h-11 flex items-center justify-center rounded-xl text-obsidian-100/60 hover:text-neon-400 hover:bg-neon-400/10 transition-all duration-300"
                aria-label={cfg.label}
              >
                <Icon size={19} />
                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg glass-strong text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {cfg.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Vertical label */}
        <div className="absolute top-1/2 -translate-y-1/2 right-full -rotate-90 mr-12 origin-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-obsidian-100/30 whitespace-nowrap">
            Contact
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Also export an AnimatePresence wrapper for potential future use
export { AnimatePresence };
