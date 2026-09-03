import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, X, Github, Linkedin, Youtube, User, MessageSquare, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  youtube: Youtube,
};

const serviceOptions = [
  'AI-Powered Website Development',
  'Custom Automation & CLI Scripts',
  'Web Platform & Product Creation',
  'Other / Let\'s Discuss',
];

export default function Contact() {
  const { state } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', service: '', details: '' });
  const [toast, setToast] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const showToast = useCallback((success: boolean, message: string) => {
    setToast({ show: true, success, message });
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.details) {
      showToast(false, 'Please fill in all required fields.');
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      showToast(true, `Thanks ${form.name}! I'll get back to you soon.`);
      setForm({ name: '', email: '', service: '', details: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-electric-600/10 rounded-full blur-3xl" />

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-24 left-1/2 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-xl glass-strong border ${
              toast.success ? 'border-neon-400/40' : 'border-red-400/40'
            } box-glow`}
          >
            {toast.success ? (
              <CheckCircle2 size={20} className="text-neon-400" />
            ) : (
              <X size={20} className="text-red-400" />
            )}
            <span className="text-sm text-white font-medium">{toast.message}</span>
            <button
              onClick={() => setToast((t) => ({ ...t, show: false }))}
              className="text-obsidian-100/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neon-400/60">05 — Contact</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Let's <span className="gradient-text">Build</span> Something
          </h2>
          <p className="mt-4 text-obsidian-100/50 max-w-2xl mx-auto">
            Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Quick contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Email card */}
            <div className="p-6 rounded-2xl glass box-glow-hover">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neon-400/10 text-neon-400 mb-4">
                <Mail size={22} />
              </div>
              <h3 className="text-white font-bold mb-1">Direct Email</h3>
              <p className="text-sm text-obsidian-100/50 mb-3">Fastest way to reach me.</p>
              <a
                href={`mailto:${state.email}`}
                className="text-sm text-neon-300 hover:text-neon-400 transition-colors break-all"
              >
                {state.email}
              </a>
            </div>

            {/* Social links cards */}
            {Object.entries(state.socialLinks)
              .filter(([key]) => key !== 'email')
              .map(([key, cfg]) => {
                const Icon = socialIcons[key] || Github;
                return (
                  <div key={key} className="p-6 rounded-2xl glass box-glow-hover">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-white font-bold mb-1">{cfg.label}</h3>
                    <p className="text-sm text-obsidian-100/50 mb-3">Connect with me on {cfg.label}.</p>
                    <a
                      href={cfg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-electric-300 hover:text-electric-400 transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                );
              })}

            <div className="p-6 rounded-2xl glass">
              <p className="text-xs font-mono text-obsidian-100/40 leading-relaxed">
                <span className="text-neon-400">{'>'}</span> Currently accepting new projects
                <br />
                <span className="text-neon-400">{'>'}</span> Avg. response time: under 24h
                <br />
                <span className="text-neon-400">{'>'}</span> Remote / worldwide
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl glass-strong space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
                    <User size={13} /> Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/50 focus:ring-1 focus:ring-neon-400/30 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
                    <Mail size={13} /> Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/50 focus:ring-1 focus:ring-neon-400/30 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
                  <MessageSquare size={13} /> Service Needed
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border border-obsidian-700/50 text-white text-sm focus:outline-none focus:border-neon-400/50 focus:ring-1 focus:ring-neon-400/30 transition-all"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-obsidian-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-obsidian-100/60 mb-2">
                  <MessageSquare size={13} /> Project Details *
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-900/50 border border-obsidian-700/50 text-white text-sm placeholder-obsidian-100/30 focus:outline-none focus:border-neon-400/50 focus:ring-1 focus:ring-neon-400/30 transition-all resize-none"
                  placeholder="Tell me about your project, goals, and timeline..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-500 to-electric-600 text-white font-semibold text-sm tracking-wide box-glow disabled:opacity-60 transition-opacity"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
