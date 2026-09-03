import { usePortfolio } from '@/context/PortfolioContext';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

export default function GeneralInfoEditor() {
  const { state, setState } = usePortfolio();

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">Header & Identity</h3>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Display Name">
            <input value={state.name} onChange={(e) => setState({ name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Logo Initials">
            <input
              value={state.initials}
              maxLength={3}
              onChange={(e) => setState({ initials: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Headline Title (shown below name in hero)">
          <input value={state.title} onChange={(e) => setState({ title: e.target.value })} className={inputClass} />
        </Field>

        <Field label="Hero Name / Tagline (large headline)">
          <input value={state.tagline} onChange={(e) => setState({ tagline: e.target.value })} className={inputClass} />
        </Field>

        <Field label="Hero Subtitle (one-liner below title)">
          <input
            value={state.subtitle}
            onChange={(e) => setState({ subtitle: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Profile Photo URL">
          <div className="flex items-center gap-3">
            <img
              src={state.profileImage}
              alt="Preview"
              className="w-12 h-12 rounded-lg object-cover neon-border flex-shrink-0"
            />
            <input
              value={state.profileImage}
              onChange={(e) => setState({ profileImage: e.target.value })}
              className={inputClass}
            />
          </div>
        </Field>
      </div>

      {/* About / Bio */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">About Me</h3>

        <Field label="Primary Bio (first paragraph)">
          <textarea
            value={state.bio}
            onChange={(e) => setState({ bio: e.target.value })}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label="Secondary Bio (second paragraph)">
          <textarea
            value={state.bioSecondary}
            onChange={(e) => setState({ bioSecondary: e.target.value })}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <Field label="About Tags (comma-separated)">
          <input
            value={state.aboutTags.join(', ')}
            onChange={(e) =>
              setState({ aboutTags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })
            }
            className={inputClass}
          />
        </Field>
      </div>

      {/* Metrics */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
        <h3 className="text-sm font-bold text-neon-300">Metrics / Stats Counters</h3>
        {state.metrics.map((metric, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={metric.label}
              onChange={(e) => {
                const metrics = state.metrics.map((m, j) => (j === i ? { ...m, label: e.target.value } : m));
                setState({ metrics });
              }}
              className={inputClass}
              placeholder="Label"
            />
            <input
              type="number"
              value={metric.value}
              onChange={(e) => {
                const metrics = state.metrics.map((m, j) => (j === i ? { ...m, value: Number(e.target.value) } : m));
                setState({ metrics });
              }}
              className={`${inputClass} w-20`}
              placeholder="Value"
            />
            <input
              value={metric.suffix}
              onChange={(e) => {
                const metrics = state.metrics.map((m, j) => (j === i ? { ...m, suffix: e.target.value } : m));
                setState({ metrics });
              }}
              className={`${inputClass} w-16`}
              placeholder="+"
            />
          </div>
        ))}
      </div>

      {/* Contact & Social */}
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">Contact & Social Links</h3>

        <Field label="Contact Email">
          <input value={state.email} onChange={(e) => setState({ email: e.target.value })} className={inputClass} />
        </Field>

        <Field label="GitHub Username (for live repo fetching)">
          <input
            value={state.githubUsername}
            onChange={(e) => setState({ githubUsername: e.target.value })}
            className={inputClass}
          />
        </Field>

        {(Object.keys(state.socialLinks) as (keyof typeof state.socialLinks)[]).map((key) => {
          const cfg = state.socialLinks[key];
          return (
            <div key={key} className="p-3 rounded-lg bg-obsidian-950/40 border border-obsidian-700/30 space-y-2">
              <p className="text-xs font-semibold text-obsidian-100/70 capitalize">{cfg.label}</p>
              <input
                value={cfg.url}
                onChange={(e) =>
                  setState({
                    socialLinks: {
                      ...state.socialLinks,
                      [key]: { ...cfg, url: e.target.value },
                    },
                  })
                }
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
                      onClick={() =>
                        setState({
                          socialLinks: {
                            ...state.socialLinks,
                            [key]: { ...cfg, [field]: !active },
                          },
                        })
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        active
                          ? 'bg-neon-400/15 text-neon-400 border-neon-400/30'
                          : 'text-obsidian-100/40 border-obsidian-700/40'
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
