import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-500/15 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Back to site link */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-obsidian-100/40 hover:text-white transition-colors z-10"
      >
        <ArrowLeft size={16} /> Back to Portfolio
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-sm p-8 rounded-2xl glass-strong box-glow"
      >
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-neon-400/10 text-neon-400 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Access</h1>
          <p className="text-xs text-obsidian-100/40 mt-1">Sign in to manage your portfolio content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
              <User size={13} /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              autoFocus
              className={`w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:ring-1 transition-all ${
                error
                  ? 'border-red-400/60 focus:ring-red-400/30'
                  : 'border-obsidian-700/50 focus:border-neon-400/50 focus:ring-neon-400/30'
              }`}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
              <Lock size={13} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:ring-1 transition-all ${
                error
                  ? 'border-red-400/60 focus:ring-red-400/30'
                  : 'border-obsidian-700/50 focus:border-neon-400/50 focus:ring-neon-400/30'
              }`}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-red-400"
            >
              <AlertCircle size={14} /> Invalid username or password. Please try again.
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-500 to-electric-600 text-white font-semibold text-sm box-glow"
          >
            <Lock size={15} /> Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
