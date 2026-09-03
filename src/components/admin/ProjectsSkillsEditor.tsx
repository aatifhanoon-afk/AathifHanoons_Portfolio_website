import { Plus, Trash2, X, Code2, FolderGit2 } from 'lucide-react';
import { usePortfolio, uid, type ProjectItem, type SkillGroup } from '@/context/PortfolioContext';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

const skillLevels = ['Advanced', 'Intermediate', 'Learning'];
const serviceIcons = ['Bot', 'Terminal', 'Layers', 'Code2', 'Zap', 'Target', 'RefreshCw'];

export default function ProjectsSkillsEditor() {
  const { state, setState } = usePortfolio();

  // --- Skills ---
  const updateSkillGroup = (idx: number, patch: Partial<SkillGroup>) => {
    const skills = state.skills.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    setState({ skills });
  };
  const addSkillItem = (gi: number) => {
    const skills = state.skills.map((s, i) =>
      i === gi ? { ...s, items: [...s.items, { name: 'New Skill', level: 'Learning' }] } : s
    );
    setState({ skills });
  };
  const removeSkillItem = (gi: number, ii: number) => {
    const skills = state.skills.map((s, i) =>
      i === gi ? { ...s, items: s.items.filter((_, j) => j !== ii) } : s
    );
    setState({ skills });
  };
  const addSkillGroup = () => {
    setState({ skills: [...state.skills, { category: 'New Category', items: [] }] });
  };
  const removeSkillGroup = (idx: number) => {
    setState({ skills: state.skills.filter((_, i) => i !== idx) });
  };

  // --- Projects ---
  const addProject = () => {
    const newItem: ProjectItem = {
      id: uid(),
      title: 'New Project',
      description: '',
      techStack: [],
      repoUrl: '',
      liveUrl: '',
      category: 'ai-web',
    };
    setState({ projects: [...state.projects, newItem] });
  };
  const updateProject = (id: string, patch: Partial<ProjectItem>) => {
    setState({ projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  };
  const removeProject = (id: string) => {
    setState({ projects: state.projects.filter((p) => p.id !== id) });
  };

  // --- Services ---
  const updateService = (idx: number, patch: Partial<typeof state.services[0]>) => {
    const services = state.services.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    setState({ services });
  };
  const addService = () => {
    setState({
      services: [...state.services, { icon: 'Code2', title: 'New Service', description: '', features: [] }],
    });
  };
  const removeService = (idx: number) => {
    setState({ services: state.services.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-neon-400" />
          <h3 className="text-sm font-bold text-neon-300">Skills & Tech Stack</h3>
        </div>

        {state.skills.map((group, gi) => (
          <div key={gi} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
            <div className="flex items-center gap-2">
              <input
                value={group.category}
                onChange={(e) => updateSkillGroup(gi, { category: e.target.value })}
                className={inputClass}
              />
              <button
                onClick={() => removeSkillGroup(gi)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {group.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-2">
                <input
                  value={item.name}
                  onChange={(e) => {
                    const items = group.items.map((it, j) => (j === ii ? { ...it, name: e.target.value } : it));
                    updateSkillGroup(gi, { items });
                  }}
                  className={inputClass}
                />
                <select
                  value={item.level}
                  onChange={(e) => {
                    const items = group.items.map((it, j) => (j === ii ? { ...it, level: e.target.value } : it));
                    updateSkillGroup(gi, { items });
                  }}
                  className="px-2 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs focus:outline-none focus:border-neon-400/40 flex-shrink-0"
                >
                  {skillLevels.map((lv) => (
                    <option key={lv} value={lv}>
                      {lv}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeSkillItem(gi, ii)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400/50 hover:text-red-400 transition-all flex-shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            ))}

            <button
              onClick={() => addSkillItem(gi)}
              className="flex items-center gap-1 text-xs text-neon-400/70 hover:text-neon-400 transition-colors"
            >
              <Plus size={13} /> Add Skill
            </button>
          </div>
        ))}
        <button
          onClick={addSkillGroup}
          className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300 transition-colors"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Services Section */}
      <div className="space-y-3 pt-4 border-t border-obsidian-700/30">
        <h3 className="text-sm font-bold text-neon-300">Services (What I Build)</h3>
        {state.services.map((service, si) => (
          <div key={si} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
            <div className="flex items-center gap-2">
              <select
                value={service.icon}
                onChange={(e) => updateService(si, { icon: e.target.value })}
                className="px-2 py-2 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs focus:outline-none focus:border-neon-400/40"
              >
                {serviceIcons.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
              <input
                value={service.title}
                onChange={(e) => updateService(si, { title: e.target.value })}
                className={inputClass}
              />
              <button
                onClick={() => removeService(si)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              value={service.description}
              onChange={(e) => updateService(si, { description: e.target.value })}
              rows={3}
              className={`${inputClass} resize-none`}
            />
            <div className="space-y-2">
              {service.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <input
                    value={feat}
                    onChange={(e) => {
                      const features = service.features.map((f, j) => (j === fi ? e.target.value : f));
                      updateService(si, { features });
                    }}
                    className={inputClass}
                  />
                  <button
                    onClick={() => updateService(si, { features: service.features.filter((_, j) => j !== fi) })}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400/50 hover:text-red-400 transition-all flex-shrink-0"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateService(si, { features: [...service.features, 'New Feature'] })}
                className="flex items-center gap-1 text-xs text-neon-400/70 hover:text-neon-400 transition-colors"
              >
                <Plus size={13} /> Add Feature
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addService}
          className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300 transition-colors"
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      {/* Projects Section */}
      <div className="space-y-3 pt-4 border-t border-obsidian-700/30">
        <div className="flex items-center gap-2">
          <FolderGit2 size={18} className="text-neon-400" />
          <h3 className="text-sm font-bold text-neon-300">Project Cards (Fallback Set)</h3>
        </div>
        <p className="text-xs text-obsidian-100/40">
          These projects appear when GitHub repos can't be fetched. Your live GitHub repos are also shown
          automatically on the public site.
        </p>

        {state.projects.map((project) => (
          <div key={project.id} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
            <div className="flex items-center gap-2">
              <input
                value={project.title}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                className={inputClass}
                placeholder="Project Title"
              />
              <select
                value={project.category}
                onChange={(e) =>
                  updateProject(project.id, { category: e.target.value as ProjectItem['category'] })
                }
                className="px-2 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs focus:outline-none focus:border-neon-400/40 flex-shrink-0"
              >
                <option value="ai-web">AI Web App</option>
                <option value="automation">Automation Tool</option>
              </select>
              <button
                onClick={() => removeProject(project.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Project description..."
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                value={project.repoUrl}
                onChange={(e) => updateProject(project.id, { repoUrl: e.target.value })}
                className={inputClass}
                placeholder="Repository URL"
              />
              <input
                value={project.liveUrl}
                onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                className={inputClass}
                placeholder="Live URL (optional)"
              />
            </div>

            <div>
              <label className="text-xs text-obsidian-100/50 mb-1.5 block">Tech Stack (comma-separated)</label>
              <input
                value={project.techStack.join(', ')}
                onChange={(e) =>
                  updateProject(project.id, {
                    techStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                className={inputClass}
                placeholder="Python, JavaScript, React..."
              />
            </div>
          </div>
        ))}
        <button
          onClick={addProject}
          className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300 transition-colors"
        >
          <Plus size={15} /> Add Project
        </button>
      </div>
    </div>
  );
}
