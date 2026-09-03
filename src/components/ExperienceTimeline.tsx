import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Award, Briefcase, type LucideIcon } from 'lucide-react';
import { usePortfolio, type QualificationItem } from '@/context/PortfolioContext';

const typeIcons: Record<QualificationItem['type'], LucideIcon> = {
  education: GraduationCap,
  certification: Award,
  experience: Briefcase,
};

const typeColors: Record<QualificationItem['type'], string> = {
  education: 'var(--accent-color)',
  certification: '#a855f7',
  experience: '#6366f1',
};

export default function ExperienceTimeline() {
  const { state } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const progressHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (state.qualifications.length === 0) return null;

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.08 }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-color)', opacity: 0.6 }}>
            Experience Timeline
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Qualifications <span className="gradient-text">& Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-obsidian-700/40 md:-translate-x-1/2" />

          {/* Progress line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2 origin-top"
            style={{ height: '100%', scaleY: progressHeight, backgroundColor: 'var(--accent-color)' }}
          />

          {/* Items */}
          <div className="space-y-8">
            {state.qualifications.map((qual, i) => {
              const Icon = typeIcons[qual.type];
              const color = typeColors[qual.type];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={qual.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-12 h-12 rounded-full glass-strong flex items-center justify-center border-2"
                      style={{ borderColor: color, color }}
                    >
                      <Icon size={20} />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 pl-20 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="group p-5 rounded-2xl glass box-glow-hover transition-all duration-300 hover:scale-[1.02]">
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>
                        {typeIcons[qual.type] && <span>{qual.type}</span>}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 mb-1">{qual.title}</h3>
                      <p className="text-sm text-obsidian-100/60 mb-1">{qual.organization}</p>
                      <p className="text-xs font-mono mb-2" style={{ color, opacity: 0.7 }}>{qual.period}</p>
                      <p className="text-sm text-obsidian-100/50 leading-relaxed">{qual.description}</p>
                    </div>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
