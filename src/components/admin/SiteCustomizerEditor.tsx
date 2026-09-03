import { usePortfolio, type ThemeMode } from '@/context/PortfolioContext';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

const themeModes: { value: ThemeMode; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'glass', label: 'Glass' },
  { value: 'minimal', label: 'Minimal' },
];

export default function SiteCustomizerEditor() {
  const { state, setState } = usePortfolio();

  const toggleSection = (key: keyof typeof state.sectionVisibility) => {
    setState({
      sectionVisibility: { ...state.sectionVisibility, [key]: !state.sectionVisibility[key] },
    });
  };

  const sectionLabels: Record<keyof typeof state.sectionVisibility, string> = {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience Timeline',
    contact: 'Contact',
  };

  return (
    <div className="space-y-5">
      {/* Theme & Accent */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">Theme & Appearance</h3>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={state.accentColor}
              onChange={(e) => setState({ accentColor: e.target.value })}
              className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-obsidian-700/50"
            />
            <input
              value={state.accentColor}
              onChange={(e) => setState({ accentColor: e.target.value })}
              className={inputClass}
              placeholder="#00d4aa"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Background Theme Mode</label>
          <div className="flex gap-2">
            {themeModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setState({ themeMode: mode.value })}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  state.themeMode === mode.value
                    ? 'bg-neon-400/15 text-neon-400 border-neon-400/30'
                    : 'text-obsidian-100/40 border-obsidian-700/40 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Show Navbar</label>
          <button
            onClick={() => setState({ showNavbar: !state.showNavbar })}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              state.showNavbar
                ? 'bg-neon-400/15 text-neon-400 border-neon-400/30'
                : 'text-obsidian-100/40 border-obsidian-700/40'
            }`}
          >
            {state.showNavbar ? 'Visible' : 'Hidden'}
          </button>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
        <h3 className="text-sm font-bold text-neon-300">Section Visibility</h3>
        {(Object.keys(sectionLabels) as (keyof typeof state.sectionVisibility)[]).map((key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-xs text-obsidian-100/60">{sectionLabels[key]}</span>
            <button
              onClick={() => toggleSection(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                state.sectionVisibility[key] ? 'bg-neon-400/40' : 'bg-obsidian-700/50'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  state.sectionVisibility[key] ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Hero Text */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">Hero Section Text</h3>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Headline (large name)</label>
          <input value={state.tagline} onChange={(e) => setState({ tagline: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Subtitle Title</label>
          <input value={state.title} onChange={(e) => setState({ title: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Typing Subtext (animated line)</label>
          <input value={state.subtitle} onChange={(e) => setState({ subtitle: e.target.value })} className={inputClass} />
        </div>

        {/* Hero CTAs */}
        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Hero CTA Buttons</label>
          {state.heroCTAs.map((cta, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                value={cta.text}
                onChange={(e) => {
                  const heroCTAs = state.heroCTAs.map((c, j) => (j === i ? { ...c, text: e.target.value } : c));
                  setState({ heroCTAs });
                }}
                className={inputClass}
                placeholder="Button text"
              />
              <input
                value={cta.link}
                onChange={(e) => {
                  const heroCTAs = state.heroCTAs.map((c, j) => (j === i ? { ...c, link: e.target.value } : c));
                  setState({ heroCTAs });
                }}
                className={inputClass}
                placeholder="Link (#section or URL)"
              />
              <button
                onClick={() =>
                  setState({ heroCTAs: state.heroCTAs.map((c, j) => (j === i ? { ...c, primary: !c.primary } : c)) })
                }
                className={`px-2.5 py-2 rounded-lg text-[11px] font-medium border whitespace-nowrap transition-all ${
                  cta.primary ? 'bg-neon-400/15 text-neon-400 border-neon-400/30' : 'text-obsidian-100/40 border-obsidian-700/40'
                }`}
              >
                Primary
              </button>
              <button
                onClick={() => setState({ heroCTAs: state.heroCTAs.filter((_, j) => j !== i) })}
                className="text-red-400/50 hover:text-red-400 px-1"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => setState({ heroCTAs: [...state.heroCTAs, { text: 'New Button', link: '#', primary: false }] })}
            className="text-xs text-neon-400 hover:text-neon-300 transition-colors"
          >
            + Add CTA Button
          </button>
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Profile Photo URL</label>
          <div className="flex items-center gap-3">
            <img src={state.profileImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover neon-border flex-shrink-0" />
            <input value={state.profileImage} onChange={(e) => setState({ profileImage: e.target.value })} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
        <h3 className="text-sm font-bold text-neon-300">Social Links</h3>
        {(Object.keys(state.socialLinks) as (keyof typeof state.socialLinks)[]).map((key) => {
          const cfg = state.socialLinks[key];
          return (
            <div key={key} className="p-3 rounded-lg bg-obsidian-950/40 border border-obsidian-700/30 space-y-2">
              <p className="text-xs font-semibold text-obsidian-100/70 capitalize">{cfg.label}</p>
              <input
                value={cfg.url}
                onChange={(e) => setState({ socialLinks: { ...state.socialLinks, [key]: { ...cfg, url: e.target.value } } })}
                className={inputClass}
                placeholder="URL"
              />
              <div className="flex gap-2">
                {(['showInNavbar', 'showInHero', 'showInDock'] as const).map((field) => {
                  const labels = { showInNavbar: 'Navbar', showInHero: 'Hero', showInDock: 'Dock' };
                  const active = cfg[field];
                  return (
                    <button
                      key={field}
                      onClick={() => setState({ socialLinks: { ...state.socialLinks, [key]: { ...cfg, [field]: !active } } })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        active ? 'bg-neon-400/15 text-neon-400 border-neon-400/30' : 'text-obsidian-100/40 border-obsidian-700/40'
                      }`}
                    >
                      {labels[field]}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
