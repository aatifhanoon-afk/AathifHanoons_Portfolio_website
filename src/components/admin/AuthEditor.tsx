import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/40 transition-all';

export default function AuthEditor() {
  const { state, setState } = usePortfolio();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(state.adminPassword);
  const [mismatch, setMismatch] = useState(false);

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-obsidian-900/40 border border-obsidian-700/40 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-neon-400" />
          <h3 className="text-sm font-bold text-neon-300">Admin Login Credentials</h3>
        </div>

        <p className="text-xs text-obsidian-100/40">
          These are the credentials used to access this dashboard. Changing them takes effect immediately.
        </p>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Username</label>
          <input
            value={state.adminUsername}
            onChange={(e) => setState({ adminUsername: e.target.value })}
            className={inputClass}
            placeholder="admin username"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={state.adminPassword}
              onChange={(e) => {
                setState({ adminPassword: e.target.value });
                setMismatch(e.target.value !== confirmPassword);
              }}
              className={inputClass}
              placeholder="password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian-100/40 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-obsidian-100/60 mb-1.5 block">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMismatch(e.target.value !== state.adminPassword);
            }}
            className={`${inputClass} ${mismatch ? 'border-red-400/60' : ''}`}
            placeholder="confirm password"
          />
        </div>

        {mismatch && (
          <p className="text-xs text-red-400">Passwords do not match.</p>
        )}

        <div className="p-3 rounded-lg bg-amber-400/5 border border-amber-400/20">
          <p className="text-xs text-amber-300/80">
            Note: Credentials are stored in your browser's local storage. For production deployments, consider
            moving authentication to a server-side solution.
          </p>
        </div>
      </div>
    </div>
  );
}
