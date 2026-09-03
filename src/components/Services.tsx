import { motion } from 'framer-motion';
import { Bot, Terminal, Layers, Zap, Target, RefreshCw, Code2, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Terminal,
  Layers,
  Zap,
  Target,
  RefreshCw,
  Code2,
};

export default function Services() {
  const { state } = usePortfolio();

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neon-400/60">02 — Services</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            What I <span className="gradient-text">Build</span> for Clients
          </h2>
          <p className="mt-4 text-obsidian-100/50 max-w-2xl mx-auto">
            From AI-powered web platforms to automation scripts — I deliver production-ready solutions
            tailored to your needs.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {state.services.filter((s) => s.enabled).map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative p-7 rounded-2xl glass box-glow-hover overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-500/5 to-electric-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-neon-400/10 text-neon-400 mb-5 group-hover:scale-110 group-hover:bg-neon-400/20 transition-all duration-300">
                    {Icon && <Icon size={26} />}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-obsidian-100/60 leading-relaxed mb-5">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-obsidian-100/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-neon-400/10 to-transparent rounded-bl-full" />
              </motion.div>
            );
          })}
        </div>

        {/* What Clients Can Expect checklist */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative p-8 rounded-2xl glass-strong overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-400/40 to-transparent" />

          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-neon-400" />
            What Clients Can Expect
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {state.expectations.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-obsidian-900/30 border border-obsidian-700/30 hover:border-neon-400/30 transition-all duration-300 cursor-default"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-neon-400/10 text-neon-400 group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon size={18} />}
                  </div>
                  <span className="text-sm font-medium text-obsidian-100/80">{item.text}</span>
                  {/* Checkmark on hover */}
                  <div className="ml-auto w-5 h-5 rounded-full border border-neon-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-neon-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
