import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { portfolioConfig } from '@/config/portfolio';

// ── Types ──────────────────────────────────────────────────────────────

export interface SocialLinkConfig {
  url: string;
  label: string;
  showInNavbar: boolean;
  showInHero: boolean;
  showInDock: boolean;
}

export interface MetricConfig {
  label: string;
  value: number;
  suffix: string;
}

export interface SkillItem {
  name: string;
  level: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface ServiceConfig {
  icon: string;
  title: string;
  description: string;
  features: string[];
  enabled: boolean;
}

export interface ExpectationItem {
  icon: string;
  text: string;
}

export interface QualificationItem {
  id: string;
  type: 'education' | 'certification' | 'experience';
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
  category: 'ai-web' | 'automation';
}

export interface FeaturedProject {
  name: string;
  description: string;
  badge: string;
  purpose: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
}

export interface HeroCTA {
  text: string;
  link: string;
  primary: boolean;
}

export type ThemeMode = 'dark' | 'glass' | 'minimal';

export interface SectionVisibility {
  about: boolean;
  services: boolean;
  projects: boolean;
  skills: boolean;
  experience: boolean;
  contact: boolean;
}

export interface GitHubConfig {
  username: string;
  pat: string;
  showPrivate: boolean;
  exclusions: string[];
}

export interface PortfolioState {
  // Admin auth
  adminUsername: string;
  adminPassword: string;

  // Branding
  name: string;
  initials: string;
  title: string;
  tagline: string;
  subtitle: string;
  email: string;
  profileImage: string;
  bio: string;
  bioSecondary: string;
  aboutTags: string[];

  // Hero CTAs
  heroCTAs: HeroCTA[];

  // Social
  socialLinks: {
    github: SocialLinkConfig;
    email: SocialLinkConfig;
    linkedin: SocialLinkConfig;
    youtube: SocialLinkConfig;
  };

  // Theme
  accentColor: string;
  themeMode: ThemeMode;
  showNavbar: boolean;
  sectionVisibility: SectionVisibility;

  // Content
  metrics: MetricConfig[];
  skills: SkillGroup[];
  services: ServiceConfig[];
  expectations: ExpectationItem[];
  qualifications: QualificationItem[];
  projects: ProjectItem[];
  featuredProject: FeaturedProject;

  // GitHub
  github: GitHubConfig;
}

// ── Storage ────────────────────────────────────────────────────────────

const STORAGE_KEY = 'portfolio_cms_data';

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getDefaultState(): PortfolioState {
  return {
    adminUsername: 'atifanum',
    adminPassword: 'ChangeMe123!',

    name: portfolioConfig.name,
    initials: portfolioConfig.initials,
    title: portfolioConfig.title,
    tagline: portfolioConfig.tagline,
    subtitle:
      'I bring software ideas to life by pairing with AI tools to write code, build platforms, and solve problems.',
    email: portfolioConfig.email,
    profileImage: portfolioConfig.profileImage,
    bio: portfolioConfig.about.description,
    bioSecondary:
      'My approach is simple: learn deeply, build relentlessly, and ship products that people actually enjoy using.',
    aboutTags: ['Self-Directed Learning', 'AI-First Mindset', 'Accessibility Advocate', 'Open Source'],

    heroCTAs: [
      { text: 'Explore My Services', link: '#services', primary: true },
      { text: 'View Code Repositories', link: 'https://github.com/aathifhanoon', primary: false },
    ],

    socialLinks: {
      github: { url: portfolioConfig.githubUrl, label: 'GitHub', showInNavbar: true, showInHero: true, showInDock: true },
      email: { url: portfolioConfig.social.email, label: 'Email', showInNavbar: true, showInHero: false, showInDock: true },
      linkedin: { url: 'https://linkedin.com/in/aathifhanoon', label: 'LinkedIn', showInNavbar: true, showInHero: false, showInDock: true },
      youtube: { url: 'https://youtube.com/@aathifhanoon', label: 'YouTube', showInNavbar: true, showInHero: false, showInDock: true },
    },

    accentColor: '#00d4aa',
    themeMode: 'dark',
    showNavbar: true,
    sectionVisibility: { about: true, services: true, projects: true, skills: true, experience: true, contact: true },

    metrics: portfolioConfig.about.metrics,
    skills: portfolioConfig.skills,
    services: portfolioConfig.services.map((s) => ({ ...s, enabled: true })),
    expectations: portfolioConfig.expectations,
    qualifications: [
      { id: uid(), type: 'education', title: 'Self-Directed Learning in AI & Web Technologies', organization: 'Independent Study', period: 'Ongoing', description: 'Building expertise through hands-on projects, AI pair-programming, and continuous exploration of web technologies, Python automation, and cybersecurity fundamentals.' },
      { id: uid(), type: 'certification', title: 'AI Prompt Engineering & System Integration', organization: 'Self-Certified via Project Portfolio', period: '2024 — Present', description: 'Demonstrated proficiency in prompt architecture, AI API integration (Gemini, Claude), and building functional applications through AI-assisted development.' },
      { id: uid(), type: 'experience', title: 'AI-Assisted Builder & System Integrator', organization: 'Freelance / Personal Projects', period: '2024 — Present', description: 'Built and deployed multiple web platforms, automation tools, and AI-driven applications including Focus Flow, an accessibility-first productivity platform.' },
    ],
    projects: portfolioConfig.fallbackProjects.map((p) => ({
      id: uid(), title: p.name, description: p.description, techStack: p.language ? [p.language] : [], repoUrl: p.repoUrl, liveUrl: p.liveUrl || '', category: p.category as 'ai-web' | 'automation',
    })),
    featuredProject: portfolioConfig.featuredProject,

    github: {
      username: portfolioConfig.githubUsername,
      pat: '',
      showPrivate: false,
      exclusions: [],
    },
  };
}

function loadState(): PortfolioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const defaults = getDefaultState();
      return {
        ...defaults,
        ...parsed,
        socialLinks: { ...defaults.socialLinks, ...parsed.socialLinks },
        sectionVisibility: { ...defaults.sectionVisibility, ...parsed.sectionVisibility },
        github: { ...defaults.github, ...parsed.github },
        heroCTAs: parsed.heroCTAs ?? defaults.heroCTAs,
      };
    }
  } catch {
    // ignore
  }
  return getDefaultState();
}

// ── Context ────────────────────────────────────────────────────────────

interface PortfolioContextValue {
  state: PortfolioState;
  setState: (partial: Partial<PortfolioState>) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<PortfolioState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // Apply accent color as CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', state.accentColor);
  }, [state.accentColor]);

  const setState = (partial: Partial<PortfolioState>) => {
    setStateInternal((prev) => ({ ...prev, ...partial }));
  };

  const resetToDefaults = () => {
    setStateInternal(getDefaultState());
  };

  return (
    <PortfolioContext.Provider value={{ state, setState, resetToDefaults }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
