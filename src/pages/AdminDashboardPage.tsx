import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, ExternalLink, Save, Check, RotateCcw,
  KeyRound, Palette, Github, FileText, type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import AuthEditor from '@/components/admin/AuthEditor';
import SiteCustomizerEditor from '@/components/admin/SiteCustomizerEditor';
import GitHubEditor from '@/components/admin/GitHubEditor';
import ContentEditor from '@/components/admin/ContentEditor';

type Section = 'auth' | 'customizer' | 'github' | 'content';

const sections: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: 'auth', label: 'Authentication & Credentials', icon: KeyRound },
  { id: 'customizer', label: 'Site Customizer', icon: Palette },
  { id: 'github', label: 'GitHub Integration', icon: Github },
  { id: 'content', label: 'Content Management', icon: FileText },
];

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const { resetToDefaults } = usePortfolio();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('auth');
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-strong border-r border-obsidian-700/40 flex flex-col fixed lg:sticky top-0 h-screen z-30 hidden md:flex">
        <div className="p-5 border-b border-obsidian-700/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-neon-400/10 text-neon-400">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">CMS Dashboard</h1>
              <p className="text-[10px] text-obsidian-100/40">Portfolio Manager</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-neon-400/10 text-neon-400 border border-neon-400/20'
                    : 'text-obsidian-100/50 hover:text-white hover:bg-obsidian-700/30'
                }`}
              >
                <Icon size={17} /> {s.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-obsidian-700/40 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-obsidian-100/60 hover:text-white hover:bg-obsidian-700/30 transition-all"
          >
            <ExternalLink size={15} /> View Public Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile section tabs */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 glass-strong border-b border-obsidian-700/40 px-3 py-2 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400/70 hover:text-red-400 transition-all flex-shrink-0"
        >
          <LogOut size={14} />
        </button>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeSection === s.id ? 'bg-neon-400/10 text-neon-400' : 'text-obsidian-100/50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 lg:ml-0 mt-14 md:mt-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-5 md:p-8 pb-24">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">
              {sections.find((s) => s.id === activeSection)?.label}
            </h2>
            <p className="text-xs text-obsidian-100/40 mt-1">
              Changes save automatically to your browser. Click Save to confirm.
            </p>
          </div>

          {activeSection === 'auth' && <AuthEditor />}
          {activeSection === 'customizer' && <SiteCustomizerEditor />}
          {activeSection === 'github' && <GitHubEditor />}
          {activeSection === 'content' && <ContentEditor />}

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={showSaved}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-500 to-electric-600 text-white font-semibold text-sm box-glow"
            >
              {saved ? <Check size={16} /> : <Save size={15} />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
            <button
              onClick={() => {
                if (confirm('Reset all content to defaults? This cannot be undone.')) {
                  resetToDefaults();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl glass text-obsidian-100/60 text-xs font-medium hover:text-white transition-all"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
