import { Plus, Trash2, GripVertical } from 'lucide-react';
import { usePortfolio, uid, type QualificationItem } from '@/context/PortfolioContext';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

const typeLabels: Record<QualificationItem['type'], string> = {
  education: 'Education',
  certification: 'Certification',
  experience: 'Work Experience',
};

export default function QualificationsEditor() {
  const { state, setState } = usePortfolio();

  const addQualification = () => {
    const newItem: QualificationItem = {
      id: uid(),
      type: 'education',
      title: 'New Entry',
      organization: '',
      period: '',
      description: '',
    };
    setState({ qualifications: [...state.qualifications, newItem] });
  };

  const updateQualification = (id: string, patch: Partial<QualificationItem>) => {
    setState({
      qualifications: state.qualifications.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    });
  };

  const removeQualification = (id: string) => {
    setState({ qualifications: state.qualifications.filter((q) => q.id !== id) });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-obsidian-100/50">
        Add your academic background, certifications, and work experience. These appear as timeline entries
        in the Qualifications section of your portfolio.
      </p>

      {state.qualifications.map((qual) => (
        <div
          key={qual.id}
          className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-3"
        >
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-obsidian-100/20 flex-shrink-0" />
            <select
              value={qual.type}
              onChange={(e) => updateQualification(qual.id, { type: e.target.value as QualificationItem['type'] })}
              className="px-3 py-1.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-obsidian-100/70 text-xs focus:outline-none focus:border-neon-400/40"
            >
              {(Object.keys(typeLabels) as QualificationItem['type'][]).map((t) => (
                <option key={t} value={t}>
                  {typeLabels[t]}
                </option>
              ))}
            </select>
            <div className="flex-1" />
            <button
              onClick={() => removeQualification(qual.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <input
            value={qual.title}
            onChange={(e) => updateQualification(qual.id, { title: e.target.value })}
            className={inputClass}
            placeholder="Title (e.g., BSc Computer Science)"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={qual.organization}
              onChange={(e) => updateQualification(qual.id, { organization: e.target.value })}
              className={inputClass}
              placeholder="Organization / Institution"
            />
            <input
              value={qual.period}
              onChange={(e) => updateQualification(qual.id, { period: e.target.value })}
              className={inputClass}
              placeholder="Period (e.g., 2023 — 2024)"
            />
          </div>

          <textarea
            value={qual.description}
            onChange={(e) => updateQualification(qual.id, { description: e.target.value })}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Description..."
          />
        </div>
      ))}

      <button
        onClick={addQualification}
        className="flex items-center gap-1.5 text-sm text-neon-400 hover:text-neon-300 transition-colors"
      >
        <Plus size={16} /> Add Qualification
      </button>
    </div>
  );
}
