import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { fetchGitHubRepos, type GitHubRepo } from '@/utils/github';
import { RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

export default function GitHubEditor() {
  const { state, setState } = usePortfolio();
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; count: number; repos?: GitHubRepo[] } | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const repos = await fetchGitHubRepos(state.github.username, state.github.pat, state.github.exclusions);
      setSyncResult({ success: true, count: repos.length, repos });
    } catch {
      setSyncResult({ success: false, count: 0 });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <h3 className="text-sm font-bold text-neon-300">GitHub Connection</h3>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">GitHub Username</label>
          <input
            value={state.github.username}
            onChange={(e) => setState({ github: { ...state.github, username: e.target.value } })}
            className={inputClass}
            placeholder="your-username"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">
            Personal Access Token (optional — for private repos)
          </label>
          <input
            type="password"
            value={state.github.pat}
            onChange={(e) => setState({ github: { ...state.github, pat: e.target.value } })}
            className={inputClass}
            placeholder="ghp_..."
          />
          <p className="text-[11px] text-obsidian-100/30 mt-1">
            Stored locally in your browser only. Used to authenticate API requests for private repository access.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Excluded Repos (comma-separated)</label>
          <input
            value={state.github.exclusions.join(', ')}
            onChange={(e) =>
              setState({ github: { ...state.github, exclusions: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) } })
            }
            className={inputClass}
            placeholder="dotfiles, old-project"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Show Private Repositories</label>
          <button
            onClick={() => setState({ github: { ...state.github, showPrivate: !state.github.showPrivate } })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              state.github.showPrivate ? 'bg-neon-400/40' : 'bg-obsidian-700/50'
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                state.github.showPrivate ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <p className="text-[11px] text-obsidian-100/30 mt-1">
            When enabled, private repos display name and language only with all external links disabled.
          </p>
        </div>

        {/* Sync button */}
        <div className="pt-2 border-t border-obsidian-700/30">
          <button
            onClick={handleSync}
            disabled={syncing || !state.github.username}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neon-400/10 text-neon-400 text-sm font-medium hover:bg-neon-400/20 transition-all disabled:opacity-40"
          >
            {syncing ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
            {syncing ? 'Syncing...' : 'Sync Repositories Now'}
          </button>

          {syncResult && (
            <div className="mt-3 p-3 rounded-lg bg-obsidian-950/40 border border-obsidian-700/30">
              {syncResult.success ? (
                <>
                  <div className="flex items-center gap-2 text-xs text-neon-400 mb-2">
                    <Check size={14} /> Successfully fetched {syncResult.count} repositories
                  </div>
                  {syncResult.repos && syncResult.repos.length > 0 && (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {syncResult.repos.slice(0, 10).map((r) => (
                        <div key={r.id} className="flex items-center gap-2 text-[11px] text-obsidian-100/50">
                          <span className={`w-1.5 h-1.5 rounded-full ${r.isPrivate ? 'bg-amber-400' : 'bg-neon-400'}`} />
                          {r.name}
                          {r.language && <span className="text-obsidian-100/30">({r.language})</span>}
                          {r.isPrivate && <span className="text-amber-400/60">Private</span>}
                        </div>
                      ))}
                      {syncResult.repos.length > 10 && (
                        <p className="text-[11px] text-obsidian-100/30">+ {syncResult.repos.length - 10} more...</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle size={14} /> Failed to fetch. Check your username and try again.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
