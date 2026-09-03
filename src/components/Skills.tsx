import { motion } from 'framer-motion';
import { Code2, Brain, Wrench, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const categoryIcons: LucideIcon[] = [Code2, Brain, Wrench];

const levelStyles: Record<string, string> = {
  Advanced: 'text-neon-300 border-neon-400/40 bg-neon-400/10',
  Intermediate: 'text-electric-300 border-electric-500/40 bg-electric-500/10',
  Learning: 'text-obsidian-100/50 border-obsidian-600/40 bg-obsidian-700/20',
};

export default function Skills() {
  const { state } = usePortfolio();

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neon-400/60">04 — Skills</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 text-obsidian-100/50 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {state.skills.map((skillGroup, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative p-6 rounded-2xl glass box-glow-hover overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neon-400/10 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neon-400/10 text-neon-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{skillGroup.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {skillGroup.items.map((skill, j) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + j * 0.08, duration: 0.3 }}
                        whileHover={{ scale: 1.08 }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-default transition-all duration-300 ${levelStyles[skill.level] || levelStyles['Learning']}`}
                      >
                        {skill.name}
                        <span className="ml-2 opacity-50 text-[10px] uppercase tracking-wider">{skill.level}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative code strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 p-4 rounded-xl glass font-mono text-xs text-obsidian-100/40 text-center overflow-hidden"
        >
          <span className="text-neon-400">$</span> always learning --building --shipping <span className="text-neon-400 animate-pulse">_</span>
        </motion.div>
      </div>
    </section>
  );
}
