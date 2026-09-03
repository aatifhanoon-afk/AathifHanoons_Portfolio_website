export const portfolioConfig = {
  name: 'Aathif Hanoon',
  initials: 'AH',
  title: 'Tech Explorer | AI-Assisted Builder & System Integrator',
  tagline: 'Aathif Hanoon',
  email: 'aathifhanoon@gmail.com',
  githubUsername: 'aathifhanoon',
  githubUrl: 'https://github.com/aathifhanoon',
  profileImage: 'https://images.pexels.com/photos/2379004/photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
  social: {
    github: 'https://github.com/aathifhanoon',
    email: 'mailto:aathifhanoon@gmail.com',
  },
  about: {
    description:
      'I am a high-velocity learner interested in AI, web technologies, Python automation, and cybersecurity. While I\'m still learning raw syntax, I specialize in prompt architecture and AI pair-programming—using modern AI tools as my development engine to build functional applications like Focus Flow.',
    metrics: [
      { label: 'Projects Built', value: 25, suffix: '+' },
      { label: 'Technologies Explored', value: 18, suffix: '+' },
      { label: 'Competitions Entered', value: 5, suffix: '' },
    ],
  },
  services: [
    {
      icon: 'Bot',
      title: 'AI-Powered Website Development',
      description:
        'Building responsive, lightning-fast web platforms integrated with custom AI backends, chatbots, and intelligent automation that elevates user experience.',
      features: ['Custom AI Chatbots', 'API Integration', 'Real-time Intelligence'],
    },
    {
      icon: 'Terminal',
      title: 'Custom Automation & CLI Scripts',
      description:
        'Delivering optimized Python and command-line automation tools that streamline workflows, eliminate repetitive tasks, and boost productivity.',
      features: ['Python Automation', 'Bash Scripting', 'Workflow Optimization'],
    },
    {
      icon: 'Layers',
      title: 'Web Platform & Product Creation',
      description:
        'Crafting tailored web products with accessible design, smooth UX, and scalable architecture — from MVP to full production deployment.',
      features: ['Full-Stack Development', 'Accessible UX', 'Production Deployment'],
    },
  ],
  expectations: [
    { icon: 'Zap', text: 'High Performance & Optimized Code' },
    { icon: 'Target', text: 'Clean, Accessible User Interfaces' },
    { icon: 'RefreshCw', text: 'Full Transparency & Progress Updates' },
    { icon: 'Code2', text: 'Full Source Code Ownership via GitHub' },
  ],
  skills: [
    {
      category: 'Core Interests & Focus',
      items: [
        { name: 'Web Interfaces', level: 'Intermediate' },
        { name: 'AI Workflows', level: 'Advanced' },
        { name: 'CLI Tools', level: 'Intermediate' },
        { name: 'Cybersecurity Basics', level: 'Learning' },
      ],
    },
    {
      category: 'Development Workflow',
      items: [
        { name: 'AI Pair-Programming (Gemini/Claude)', level: 'Advanced' },
        { name: 'Prompt Engineering', level: 'Advanced' },
        { name: 'System Architecture', level: 'Intermediate' },
      ],
    },
    {
      category: 'Currently Studying (Fundamentals)',
      items: [
        { name: 'Python Basics', level: 'Learning' },
        { name: 'HTML/CSS/JS', level: 'Learning' },
        { name: 'C++ Logic', level: 'Learning' },
      ],
    },
  ],
  featuredProject: {
    name: 'Focus Flow',
    description:
      'An accessibility-first productivity platform designed for neurodivergent learners. Focus Flow combines AI-driven task breakdown, sensory-friendly UI patterns, and adaptive focus timers to create a learning environment that works with how your brain works — not against it.',
    badge: 'Featured Showcase',
    purpose: 'Accessibility & Neurodivergent Learning Tools',
    tags: ['Accessibility', 'AI', 'Productivity', 'Neurodivergent'],
    repoUrl: 'https://github.com/aathifhanoon',
    liveUrl: '#',
  },
  fallbackProjects: [
    {
      id: 1,
      name: 'Focus Flow',
      description: 'Accessibility-first productivity platform for neurodivergent learners with AI-driven task breakdown.',
      language: 'JavaScript',
      stars: 42,
      category: 'ai-web',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
    {
      id: 2,
      name: 'AI Landing Page Generator',
      description: 'Generate beautiful, conversion-optimized landing pages using Gemini API and prompt engineering.',
      language: 'Python',
      stars: 28,
      category: 'ai-web',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
    {
      id: 3,
      name: 'CLI Workflow Automator',
      description: 'Bash + Python automation suite that eliminates repetitive terminal tasks across dev workflows.',
      language: 'Python',
      stars: 19,
      category: 'automation',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
    {
      id: 4,
      name: 'Gemini Chat Widget',
      description: 'Embeddable AI chatbot widget with streaming responses and custom system prompts.',
      language: 'JavaScript',
      stars: 35,
      category: 'ai-web',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
    {
      id: 5,
      name: 'Deploy Script Pro',
      description: 'One-command deployment automation for Vercel and static hosts with rollback support.',
      language: 'Shell',
      stars: 12,
      category: 'automation',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
    {
      id: 6,
      name: 'Prompt Studio',
      description: 'Visual prompt engineering workspace for testing and versioning AI prompts at scale.',
      language: 'TypeScript',
      stars: 22,
      category: 'ai-web',
      repoUrl: 'https://github.com/aathifhanoon',
      liveUrl: '#',
    },
  ],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type PortfolioConfig = typeof portfolioConfig;
