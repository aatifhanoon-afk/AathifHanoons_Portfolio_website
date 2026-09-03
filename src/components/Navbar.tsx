import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Mail, Linkedin, Youtube, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { portfolioConfig } from '@/config/portfolio';

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function Navbar() {
  const { state } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = portfolioConfig.navLinks.map((l) => l.href.slice(1));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleHeaderLinks = Object.entries(state.socialLinks).filter(([, cfg]) => cfg.showInNavbar);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: AH Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg neon-border bg-obsidian-900/50">
            <span className="text-neon-400 font-bold text-sm tracking-wider">{state.initials}</span>
            <div className="absolute inset-0 rounded-lg bg-neon-400/10 blur-md" />
          </div>
        </motion.button>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {portfolioConfig.navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'text-neon-400'
                  : 'text-obsidian-100/70 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="navActive"
                  className="absolute inset-0 rounded-lg bg-neon-400/10 border border-neon-400/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right: Social icons */}
        <div className="hidden md:flex items-center gap-2">
          {visibleHeaderLinks.map(([key, cfg]) => {
            const Icon = socialIcons[key] || Mail;
            return (
              <a
                key={key}
                href={cfg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg glass text-obsidian-100/70 hover:text-neon-400 hover:border-neon-400/40 transition-all duration-300"
                aria-label={cfg.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {portfolioConfig.navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-obsidian-100/70 hover:text-neon-400 hover:bg-neon-400/5 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}

              <div className="flex gap-3 mt-2 px-4">
                {visibleHeaderLinks.map(([key, cfg]) => {
                  const Icon = socialIcons[key] || Mail;
                  return (
                    <a
                      key={key}
                      href={cfg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-lg glass text-white"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
