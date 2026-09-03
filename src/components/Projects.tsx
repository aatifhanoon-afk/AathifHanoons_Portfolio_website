import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, BadgeCheck, Loader2, Sparkles, Lock } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { fetchGitHubRepos, type GitHubRepo } from '@/utils/github';

type ProjectCategory = 'all' | 'ai-web' | 'automation';

interface DisplayProject {
  id: number | string;
  name: string;
  description: string;
  language: string | null;
  stars: number;
  category: ProjectCategory;
  repoUrl: string;
  liveUrl?: string | null;
  isPrivate: boolean;
  topics: string[];
  source: 'github' | 'manual';
}

const tabs: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'AI Web Apps', value: 'ai-web' },
  { label: 'Automation Tools', value: 'automation' },
];

const languageColors: Record<string, string> = {
  Python: '#3776ab', JavaScript: '#f7df1e', TypeScript: '#3178c6',
  Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#00599c', C: '#a8b9cc',
};

export default function Projects() {
  const { state } = usePortfolio();
  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

  useEffect(() => {
    const loadProjects = async () => {
      // Start with manual projects from state
      const manualProjects: DisplayProject[] = state.projects.map((p) => ({
        id: p.id,
        name: p.title.replace(/-/g, ' '),
        description: p.description,
        language: p.techStack[0] || null,
        stars: 0,
        category: p.category,
        repoUrl: p.repoUrl,
        liveUrl: p.liveUrl || null,
        isPrivate: false,
        topics: p.techStack,
        source: 'manual' as const,
      }));

      try {
        const repos = await fetchGitHubRepos(state.github.username, state.github.pat, state.github.exclusions);
        const githubProjects: DisplayProject[] = repos
          .filter((r: GitHubRepo) => !r.isPrivate || state.github.showPrivate)
          .map((r: GitHubRepo) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stars,
            category: (r as unknown as { category: ProjectCategory }).category,
            repoUrl: r.repoUrl,
            liveUrl: r.liveUrl,
            isPrivate: r.isPrivate,
            topics: r.topics,
            source: 'github' as const,
          }));

        setProjects([...githubProjects, ...manualProjects]);
        setUsingFallback(false);
      } catch {
        setProjects(manualProjects);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [state.github.username, state.github.pat, state.github.showPrivate, state.github.exclusions, state.projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [projects, activeTab]);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-electric-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.1 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--accent-color)', opacity: 0.6 }}>
            03 — Projects
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Live <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="mt-4 text-obsidian-100/50 max-w-2xl mx-auto">
            {usingFallback
              ? 'Showing curated project showcase. Connect GitHub in admin for live sync.'
              : 'Real repositories synced live from GitHub, plus curated project cards.'}
          </p>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 p-6 sm:p-8 rounded-2xl glass-strong overflow-hidden group"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent" style={{ backgroundColor: 'var(--accent-color)' }} />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl group-hover:opacity-20 transition-colors duration-700" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.1 }} />

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={18} style={{ color: 'var(--accent-color)' }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                  {state.featuredProject.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{state.featuredProject.name}</h3>
              <p className="text-sm text-obsidian-100/60 leading-relaxed mb-4 max-w-2xl">{state.featuredProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {state.featuredProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono border" style={{ color: 'var(--accent-color)', borderColor: 'var(--accent-color)', opacity: 0.8, backgroundColor: 'color-mix(in srgb, var(--accent-color) 5%, transparent)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-obsidian-100/40 italic">Purpose: {state.featuredProject.purpose}</p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a href={state.featuredProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white text-sm font-medium hover:border-neon-400/40 transition-all duration-300 box-glow-hover">
                <Github size={16} /> View Code
              </a>
              {state.featuredProject.liveUrl && state.featuredProject.liveUrl !== '#' && (
                <a href={state.featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium box-glow" style={{ background: 'linear-gradient(to right, var(--accent-color), #6366f1)' }}>
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 p-1.5 rounded-xl glass">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.value ? 'text-white' : 'text-obsidian-100/50 hover:text-white'
                }`}
              >
                {activeTab === tab.value && (
                  <motion.div layoutId="projectTab" className="absolute inset-0 rounded-lg border" style={{ background: 'color-mix(in srgb, var(--accent-color) 20%, transparent)', borderColor: 'color-mix(in srgb, var(--accent-color) 30%, transparent)' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--accent-color)' }} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, i) => {
                const isLinkDisabled = project.isPrivate;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                    style={{ perspective: 1000 }}
                    className="group relative p-6 rounded-2xl glass box-glow-hover overflow-hidden flex flex-col"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--accent-color) 5%, transparent), transparent)' }} />

                    <div className="relative z-10 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white capitalize group-hover:text-neon-300 transition-colors duration-300">
                          {project.name}
                        </h3>
                        {project.isPrivate ? (
                          <Lock size={16} className="text-amber-400/60" />
                        ) : (
                          <Github size={18} className="text-obsidian-100/30 group-hover:text-neon-400 transition-colors" />
                        )}
                      </div>

                      {/* AI-assisted badge */}
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border mb-3" style={{ color: 'var(--accent-color)', borderColor: 'color-mix(in srgb, var(--accent-color) 15%, transparent)', backgroundColor: 'color-mix(in srgb, var(--accent-color) 5%, transparent)' }}>
                        <Sparkles size={10} /> Built via AI-Assisted Development
                      </div>

                      {/* Private badge */}
                      {project.isPrivate && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium text-amber-300/80 bg-amber-400/5 border border-amber-400/15 mb-3 ml-1">
                          <Lock size={10} /> Private / Proprietary Code
                        </div>
                      )}

                      <p className="text-sm text-obsidian-100/50 leading-relaxed mb-4 line-clamp-3 min-h-[3.5rem]">
                        {project.isPrivate ? 'This repository contains proprietary code. Details available on request.' : project.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-obsidian-100/40 mb-4">
                        {project.language && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#6b78c9' }} />
                            {project.language}
                          </div>
                        )}
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <Star size={13} style={{ color: 'var(--accent-color)' }} />
                            {project.stars}
                          </div>
                        )}
                        {project.source === 'manual' && (
                          <div className="flex items-center gap-1 text-obsidian-100/30">
                            <Sparkles size={11} /> Curated
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-obsidian-700/30">
                      {isLinkDisabled ? (
                        <span className="flex items-center gap-1 text-xs text-obsidian-100/30">
                          <Lock size={13} /> Code Hidden
                        </span>
                      ) : (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-obsidian-100/40 hover:text-white transition-colors">
                          <GitFork size={13} /> View Source
                        </a>
                      )}
                      {project.liveUrl && !isLinkDisabled && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs ml-auto transition-colors" style={{ color: 'var(--accent-color)' }}>
                          <ExternalLink size={13} /> Live
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-16 text-obsidian-100/40">
            <p className="text-sm">No projects in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
