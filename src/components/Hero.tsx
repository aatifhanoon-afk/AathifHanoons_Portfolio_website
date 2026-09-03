import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, Linkedin, Youtube, Sparkles, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  youtube: Youtube,
};

function useTypingEffect(text: string, speed = 50, delay = 800) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const { state } = usePortfolio();
  const { displayed, done } = useTypingEffect(state.subtitle);

  const heroLinks = Object.entries(state.socialLinks).filter(([, cfg]) => cfg.showInHero);
  const githubUrl = state.socialLinks.github.url;

  const handleCTAClick = (link: string) => {
    if (link.startsWith('#')) {
      document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-glow-pulse" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.15 }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-600/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.05 }} />

      {/* Radial mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/50 via-transparent to-obsidian-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6"
            style={{ color: 'var(--accent-color)' }}
          >
            <Sparkles size={14} style={{ color: 'var(--accent-color)' }} />
            Available for Client Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            {state.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-obsidian-100/60 mb-8 max-w-xl mx-auto md:mx-0"
          >
            <span className="gradient-text font-semibold">{state.title}</span>
            <br />
            <span className="font-mono">
              {displayed}
              {!done && <span className="animate-pulse">|</span>}
            </span>
          </motion.p>

          {/* Dynamic CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            {state.heroCTAs.map((cta, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCTAClick(cta.link)}
                className={
                  cta.primary
                    ? 'group relative px-6 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide overflow-hidden box-glow'
                    : 'group px-6 py-3.5 rounded-xl glass text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 box-glow-hover'
                }
                style={cta.primary ? { background: `linear-gradient(to right, var(--accent-color), #6366f1)` } : {}}
              >
                {cta.primary && (
                  <span className="relative z-10 flex items-center gap-2">
                    {cta.text}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                {!cta.primary && <span className="flex items-center gap-2">{cta.text}</span>}
              </motion.button>
            ))}
          </motion.div>

          {/* Hero social links */}
          {heroLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 flex items-center gap-3 justify-center md:justify-start"
            >
              {heroLinks.map(([key, cfg]) => {
                const Icon = socialIcons[key] || Mail;
                return (
                  <a
                    key={key}
                    href={cfg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg glass text-obsidian-100/60 transition-all duration-300"
                    style={{ ['--hover-color' as string]: 'var(--accent-color)' }}
                    aria-label={cfg.label}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Right: Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-4 rounded-full border opacity-20 animate-spin-slow" style={{ borderColor: 'var(--accent-color)' }} />
            <div className="absolute -inset-8 rounded-full border border-electric-600/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            <div className="absolute -inset-2 rounded-full blur-2xl animate-glow-pulse" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.2 }} />

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden box-glow"
              style={{ border: '2px solid var(--accent-color)' }}
            >
              <img src={state.profileImage} alt={state.name} className="w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 glass-strong px-3 py-1.5 rounded-full text-xs font-mono"
              style={{ color: 'var(--accent-color)' }}
            >
              AI Engineer
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-2 -left-4 glass-strong px-3 py-1.5 rounded-full text-xs font-mono text-electric-300"
            >
              Web Specialist
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-obsidian-100/40"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-obsidian-100/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
