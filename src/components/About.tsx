import { motion } from 'framer-motion';
import { Code2, Cpu, Trophy, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { AnimatedCounter } from './AnimatedCounter';

const metricIcons: LucideIcon[] = [Code2, Cpu, Trophy];

export default function About() {
  const { state } = usePortfolio();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-electric-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neon-400/60">01 — About</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            The <span className="gradient-text">Builder</span> Behind the Code
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-lg text-obsidian-100/70 leading-relaxed">
              {state.bio}
            </p>
            <p className="text-base text-obsidian-100/50 leading-relaxed">
              {state.bioSecondary}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {state.aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-neon-300/80 glass border-neon-400/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Metric counters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 gap-4"
          >
            {state.metrics.map((metric, i) => {
              const Icon = metricIcons[i % metricIcons.length];
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex items-center gap-5 p-6 rounded-2xl glass box-glow-hover"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-neon-400/10 text-neon-400 group-hover:bg-neon-400/20 transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-4xl font-bold text-white">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </div>
                    <div className="text-sm text-obsidian-100/50 font-medium mt-1">{metric.label}</div>
                  </div>
                  {/* Accent line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full bg-gradient-to-b from-neon-400 to-electric-600" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
