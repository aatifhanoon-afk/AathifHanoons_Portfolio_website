import { useState } from 'react';
import { usePortfolio, uid, type QualificationItem, type ProjectItem, type SkillGroup, type ServiceConfig } from '@/context/PortfolioContext';
import { Plus, Trash2, X, Code2, FolderGit2, Briefcase } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

const skillLevels = ['Advanced', 'Intermediate', 'Learning'];
const serviceIcons = ['Bot', 'Terminal', 'Layers', 'Code2', 'Zap', 'Target', 'RefreshCw'];
const typeLabels: Record<QualificationItem['type'], string> = {
  education: 'Education', certification: 'Certification', experience: 'Work Experience',
};

export default function ContentEditor() {
  const { state, setState } = usePortfolio();
  const [subSection, setSubSection] = useState<'bio' | 'services' | 'qualifications' | 'projects'>('bio');

  const subTabs = [
    { id: 'bio' as const, label: 'Bio & About', icon: Code2 },
    { id: 'services' as const, label: 'Services', icon: Briefcase },
    { id: 'qualifications' as const, label: 'Qualifications', icon: FolderGit2 },
    { id: 'projects' as const, label: 'Projects & Skills', icon: FolderGit2 },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 overflow-x-auto">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubSection(t.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              subSection === t.id ? 'bg-neon-400/15 text-neon-400' : 'text-obsidian-100/40 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subSection === 'bio' && <BioEditor />}
      {subSection === 'services' && <ServicesSubEditor />}
      {subSection === 'qualifications' && <QualificationsSubEditor />}
      {subSection === 'projects' && <ProjectsSkillsSubEditor />}
    </div>
  );

  function BioEditor() {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
          <h3 className="text-sm font-bold text-neon-300">Bio & About Text</h3>

          <div>
            <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Display Name</label>
            <input value={state.name} onChange={(e) => setState({ name: e.target.value })} className={inputClass} />
          </div>

          <div>
            <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Primary Bio</label>
            <textarea value={state.bio} onChange={(e) => setState({ bio: e.target.value })} rows={5} className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Secondary Bio</label>
            <textarea value={state.bioSecondary} onChange={(e) => setState({ bioSecondary: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">About Tags (comma-separated)</label>
            <input
              value={state.aboutTags.join(', ')}
              onChange={(e) => setState({ aboutTags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Contact Email</label>
            <input value={state.email} onChange={(e) => setState({ email: e.target.value })} className={inputClass} />
          </div>

          {/* Metrics */}
          <div className="pt-2 border-t border-obsidian-700/30">
            <label className="text-xs font-bold text-neon-300 mb-2 block">Metrics / Stats</label>
            {state.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  value={metric.label}
                  onChange={(e) => { const metrics = state.metrics.map((m, j) => j === i ? { ...m, label: e.target.value } : m); setState({ metrics }); }}
                  className={inputClass}
                  placeholder="Label"
                />
                <input
                  type="number"
                  value={metric.value}
                  onChange={(e) => { const metrics = state.metrics.map((m, j) => j === i ? { ...m, value: Number(e.target.value) } : m); setState({ metrics }); }}
                  className={`${inputClass} w-20`}
                />
                <input
                  value={metric.suffix}
                  onChange={(e) => { const metrics = state.metrics.map((m, j) => j === i ? { ...m, suffix: e.target.value } : m); setState({ metrics }); }}
                  className={`${inputClass} w-16`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ServicesSubEditor() {
    const updateService = (idx: number, patch: Partial<ServiceConfig>) => {
      setState({ services: state.services.map((s, i) => i === idx ? { ...s, ...patch } : s) });
    };

    return (
      <div className="space-y-3">
        {state.services.map((service, si) => (
          <div key={si} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
            <div className="flex items-center gap-2">
              <select
                value={service.icon}
                onChange={(e) => updateService(si, { icon: e.target.value })}
                className="px-2 py-2 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs"
              >
                {serviceIcons.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
              <input value={service.title} onChange={(e) => updateService(si, { title: e.target.value })} className={inputClass} />
              <button
                onClick={() => updateService(si, { enabled: !service.enabled })}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border whitespace-nowrap ${
                  service.enabled ? 'bg-neon-400/15 text-neon-400 border-neon-400/30' : 'text-obsidian-100/40 border-obsidian-700/40'
                }`}
              >
                {service.enabled ? 'On' : 'Off'}
              </button>
              <button onClick={() => setState({ services: state.services.filter((_, i) => i !== si) })} className="text-red-400/50 hover:text-red-400 px-1">
                <Trash2 size={15} />
              </button>
            </div>
            <textarea value={service.description} onChange={(e) => updateService(si, { description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
            <div className="space-y-1.5">
              {service.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <input
                    value={feat}
                    onChange={(e) => { const features = service.features.map((f, j) => j === fi ? e.target.value : f); updateService(si, { features }); }}
                    className={inputClass}
                  />
                  <button onClick={() => updateService(si, { features: service.features.filter((_, j) => j !== fi) })} className="text-red-400/50 hover:text-red-400">
                    <X size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => updateService(si, { features: [...service.features, 'New Feature'] })} className="text-xs text-neon-400/70 hover:text-neon-400">
                <Plus size={12} className="inline" /> Add Feature
              </button>
            </div>
          </div>
        ))}
        <button onClick={() => setState({ services: [...state.services, { icon: 'Code2', title: 'New Service', description: '', features: [], enabled: true }] })} className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300">
          <Plus size={15} /> Add Service
        </button>
      </div>
    );
  }

  function QualificationsSubEditor() {
    const addQual = () => {
      const item: QualificationItem = { id: uid(), type: 'education', title: 'New Entry', organization: '', period: '', description: '' };
      setState({ qualifications: [...state.qualifications, item] });
    };
    const updateQual = (id: string, patch: Partial<QualificationItem>) => {
      setState({ qualifications: state.qualifications.map((q) => q.id === id ? { ...q, ...patch } : q) });
    };

    return (
      <div className="space-y-3">
        {state.qualifications.map((qual) => (
          <div key={qual.id} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
            <div className="flex items-center gap-2">
              <select
                value={qual.type}
                onChange={(e) => updateQual(qual.id, { type: e.target.value as QualificationItem['type'] })}
                className="px-2 py-1.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs"
              >
                {Object.keys(typeLabels).map((t) => <option key={t} value={t}>{typeLabels[t as QualificationItem['type']]}</option>)}
              </select>
              <div className="flex-1" />
              <button onClick={() => setState({ qualifications: state.qualifications.filter((q) => q.id !== qual.id) })} className="text-red-400/50 hover:text-red-400">
                <Trash2 size={15} />
              </button>
            </div>
            <input value={qual.title} onChange={(e) => updateQual(qual.id, { title: e.target.value })} className={inputClass} placeholder="Title" />
            <div className="grid grid-cols-2 gap-3">
              <input value={qual.organization} onChange={(e) => updateQual(qual.id, { organization: e.target.value })} className={inputClass} placeholder="Organization" />
              <input value={qual.period} onChange={(e) => updateQual(qual.id, { period: e.target.value })} className={inputClass} placeholder="Period" />
            </div>
            <textarea value={qual.description} onChange={(e) => updateQual(qual.id, { description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
          </div>
        ))}
        <button onClick={addQual} className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300">
          <Plus size={15} /> Add Qualification
        </button>
      </div>
    );
  }

  function ProjectsSkillsSubEditor() {
    // Skills
    const updateSkillGroup = (idx: number, patch: Partial<SkillGroup>) => {
      setState({ skills: state.skills.map((s, i) => i === idx ? { ...s, ...patch } : s) });
    };

    // Projects
    const addProject = () => {
      const item: ProjectItem = { id: uid(), title: 'New Project', description: '', techStack: [], repoUrl: '', liveUrl: '', category: 'ai-web' };
      setState({ projects: [...state.projects, item] });
    };
    const updateProject = (id: string, patch: Partial<ProjectItem>) => {
      setState({ projects: state.projects.map((p) => p.id === id ? { ...p, ...patch } : p) });
    };

    return (
      <div className="space-y-6">
        {/* Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-neon-400" />
            <h3 className="text-sm font-bold text-neon-300">Skills & Tech Stack</h3>
          </div>
          {state.skills.map((group, gi) => (
            <div key={gi} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
              <div className="flex items-center gap-2">
                <input value={group.category} onChange={(e) => updateSkillGroup(gi, { category: e.target.value })} className={inputClass} />
                <button onClick={() => setState({ skills: state.skills.filter((_, i) => i !== gi) })} className="text-red-400/50 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              </div>
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <input
                    value={item.name}
                    onChange={(e) => { const items = group.items.map((it, j) => j === ii ? { ...it, name: e.target.value } : it); updateSkillGroup(gi, { items }); }}
                    className={inputClass}
                  />
                  <select
                    value={item.level}
                    onChange={(e) => { const items = group.items.map((it, j) => j === ii ? { ...it, level: e.target.value } : it); updateSkillGroup(gi, { items }); }}
                    className="px-2 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs"
                  >
                    {skillLevels.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
                  </select>
                  <button onClick={() => updateSkillGroup(gi, { items: group.items.filter((_, j) => j !== ii) })} className="text-red-400/50 hover:text-red-400">
                    <X size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => updateSkillGroup(gi, { items: [...group.items, { name: 'New Skill', level: 'Learning' }] })} className="text-xs text-neon-400/70 hover:text-neon-400">
                <Plus size={12} className="inline" /> Add Skill
              </button>
            </div>
          ))}
          <button onClick={() => setState({ skills: [...state.skills, { category: 'New Category', items: [] }] })} className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300">
            <Plus size={15} /> Add Category
          </button>
        </div>

        {/* Projects */}
        <div className="space-y-3 pt-4 border-t border-obsidian-700/30">
          <div className="flex items-center gap-2">
            <FolderGit2 size={18} className="text-neon-400" />
            <h3 className="text-sm font-bold text-neon-300">Manual Project Cards</h3>
          </div>
          <p className="text-xs text-obsidian-100/40">These appear alongside your live GitHub repos on the public site.</p>

          {state.projects.map((project) => (
            <div key={project.id} className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3">
              <div className="flex items-center gap-2">
                <input value={project.title} onChange={(e) => updateProject(project.id, { title: e.target.value })} className={inputClass} placeholder="Title" />
                <select
                  value={project.category}
                  onChange={(e) => updateProject(project.id, { category: e.target.value as ProjectItem['category'] })}
                  className="px-2 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs"
                >
                  <option value="ai-web">AI Web App</option>
                  <option value="automation">Automation Tool</option>
                </select>
                <button onClick={() => setState({ projects: state.projects.filter((p) => p.id !== project.id) })} className="text-red-400/50 hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              </div>
              <textarea value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} rows={2} className={`${inputClass} resize-none`} />
              <div className="grid grid-cols-2 gap-3">
                <input value={project.repoUrl} onChange={(e) => updateProject(project.id, { repoUrl: e.target.value })} className={inputClass} placeholder="Repo URL" />
                <input value={project.liveUrl} onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })} className={inputClass} placeholder="Live URL" />
              </div>
              <div>
                <label className="text-xs text-obsidian-100/50 mb-1 block">Tech Stack (comma-separated)</label>
                <input
                  value={project.techStack.join(', ')}
                  onChange={(e) => updateProject(project.id, { techStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
          <button onClick={addProject} className="flex items-center gap-1 text-sm text-neon-400 hover:text-neon-300">
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>
    );
  }
}
