import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Zap, AlertCircle } from "lucide-react";
import HistoryCard from "../components/HistoryCard";

const API_BASE = "http://localhost:8000"; // Default FastAPI port

export default function HomePage() {
  const [thesis, setThesis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ── Load History ──
  useEffect(() => {
    fetch(`${API_BASE}/api/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Failed to fetch history:", err));
  }, []);

  const handleRunGauntlet = useCallback(async () => {
    if (!thesis.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/debate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thesis }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Engine failed to process thesis.");
      }

      const trace = await response.json();
      navigate(`/debate/${trace.trace_id}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [thesis, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Navbar ── */}
      <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Shield size={22} className="text-indigo-600" />
            <span className="font-bold text-slate-900 tracking-tight">
              Epistemic Gauntlet
            </span>
          </a>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Zap size={14} />
            <span>v1.0 — Logical Analysis Platform</span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Epistemic Gauntlet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-5 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Submit a thesis. Watch the AI tear it apart and rebuild it stronger.
          </motion.p>

          {/* ── Input Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6"
          >
            <div className="relative">
              <Search
                size={18}
                className="absolute top-4 left-4 text-slate-400"
              />
              <textarea
                id="thesis-input"
                value={thesis}
                onChange={(e) => setThesis(e.target.value)}
                placeholder="Enter your thesis or claim to stress-test…"
                rows={4}
                className="w-full pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400
                           border border-slate-200 rounded-xl bg-slate-50/50
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
                           resize-none transition-all duration-200"
              />
            </div>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-50 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                id="run-gauntlet-btn"
                onClick={handleRunGauntlet}
                disabled={isLoading || !thesis.trim()}
                className="relative px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl
                           hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <span className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </span>
                      Analyzing…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Run Gauntlet
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Row ── */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Search size={20} />,
              title: "Deconstruct",
              desc: "Break down claims into assumptions and inferential chains.",
            },
            {
              icon: <Shield size={20} />,
              title: "Interrogation",
              desc: "AI-generated Socratic questions target every weak point.",
            },
            {
              icon: <Zap size={20} />,
              title: "Strengthening",
              desc: "Revise and harden your thesis through structured revision.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-100"
            >
              <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── History Grid ── */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Explore Past Debates
          </h2>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((trace) => (
                <HistoryCard key={trace.id} trace={trace} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
              No debates found in history. Submit your first thesis above!
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-400">
        © 2026 Epistemic Gauntlet. Built for rigorous thinking.
      </footer>
    </div>
  );
}
