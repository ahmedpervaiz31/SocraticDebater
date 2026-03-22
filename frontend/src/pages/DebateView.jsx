import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Shield,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Search,
  Loader2,
} from "lucide-react";
import CircularProgress from "../components/CircularProgress";
import DeltaBadge from "../components/DeltaBadge";
import DiffComponent from "../components/DiffComponent";

const API_BASE = "http://localhost:8000";

/* ────────────────────────── Phase Section Wrapper ────────────────────────── */
function PhaseSection({ number, title, icon: Icon, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-28"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500">
            Phase {number}
          </p>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

/* ──────────────────────────── Main Page ──────────────────────────── */
export default function DebateView() {
  const { id } = useParams();
  const [expandLogic, setExpandLogic] = useState(false);
  const [trace, setTrace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/debate/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Debate trace not found");
        return res.json();
      })
      .then((data) => {
        setTrace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <p className="text-slate-500 text-sm font-medium">Reconstructing Debate Trace...</p>
      </div>
    );
  }

  if (error || !trace) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <AlertTriangle size={32} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Analysis Missing</h1>
          <p className="text-slate-500 text-sm">{error || "This specific debate trace could not be localized."}</p>
        </div>
        <Link to="/" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200">
          Return to Gauntlet
        </Link>
      </div>
    );
  }

  const { initial_claim, questions, revision, score } = trace;
  const isClean = !score.evasion_flags?.some(flag => flag.includes("EVASION_DETECTED"));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Sticky Header Dashboard ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors mb-3"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-5">
            {trace.thesis_input}
          </h1>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <CircularProgress
              value={Math.round(score.validity_score * 100)}
              label="Validity"
              size={72}
              strokeWidth={5}
            />
            <CircularProgress
              value={Math.round(score.soundness_score * 100)}
              label="Soundness"
              size={72}
              strokeWidth={5}
            />
            <CircularProgress
              value={Math.round(score.resilience_score * 100)}
              label="Resilience"
              size={72}
              strokeWidth={5}
            />
            <CircularProgress
              value={Math.round(score.precision_score * 100)}
              label="Precision"
              size={72}
              strokeWidth={5}
            />

            <div className="ml-auto">
              <DeltaBadge delta={Math.round(trace.net_improvement_delta * 100)} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Timeline Content ── */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* ════════════ Phase 1 — The Thesis ════════════ */}
        <PhaseSection number={1} title="The Thesis" icon={Search}>
          <blockquote className="border-l-4 border-indigo-400 bg-indigo-50/40 rounded-r-xl pl-5 pr-6 py-4 text-slate-700 text-sm leading-relaxed italic">
            {trace.initial_claim_summary}
          </blockquote>

          <button
            id="expand-logic-toggle"
            onClick={() => setExpandLogic((p) => !p)}
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            {expandLogic ? (
              <>
                <ChevronUp size={14} /> Collapse Logic
              </>
            ) : (
              <>
                <ChevronDown size={14} /> Expand Logic
              </>
            )}
          </button>

          {expandLogic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 space-y-8"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3">
                  Assumptions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-left px-4 py-2.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                          ID
                        </th>
                        <th className="text-left px-4 py-2.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                          Text
                        </th>
                        <th className="text-left px-4 py-2.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                          Grounding
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {initial_claim.assumptions.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-indigo-600 font-semibold">
                            {a.id}
                          </td>
                          <td className="px-4 py-3 text-slate-700 leading-relaxed">
                            {a.text}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                              {a.grounding_type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-3">
                  Inferential Chain
                </h3>
                <ol className="space-y-3 pl-1">
                  {initial_claim.inferential_chain.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {step.id || i + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">{step.from_premise}</span> → <span className="font-semibold text-slate-900">{step.to_conclusion}</span>
                        <span className="block text-[11px] text-slate-400 mt-0.5 italic">
                          Type: {step.inference_type} | Gap Score: {step.logical_gap_score}
                        </span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </PhaseSection>

        {/* ════════════ Phase 2 — The Interrogation ════════════ */}
        <PhaseSection number={2} title="The Interrogation" icon={Shield}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {questions.map((q) => (
              <div
                key={q.question_id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm
                           hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold tracking-wide">
                    Target: {q.target_element_id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{q.layer}</span>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-3">
                  {q.question_text}
                </p>

                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {q.interrogator_reasoning}
                </p>
              </div>
            ))}
          </div>
        </PhaseSection>

        {/* ════════════ Phase 3 — The Crucible ════════════ */}
        <PhaseSection number={3} title="The Crucible" icon={Scale}>
          <div className="space-y-6">
            {revision.responses.map((r, idx) => (
              <DiffComponent
                key={idx}
                before={r.before}
                after={r.after}
                revisionType={r.revision_type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                defense={r.response_to_question}
              />
            ))}
          </div>
        </PhaseSection>

        {/* ════════════ Phase 4 — The Verdict ════════════ */}
        <PhaseSection number={4} title="The Verdict" icon={Zap}>
          <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Judge Commentary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              {score.judge_commentary}
            </p>

            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Key Inflection Point
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              {trace.key_inflection}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
              {isClean ? (
                <>
                  <CheckCircle2 size={22} className="text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">
                    No Evasion Detected — Clean Analysis
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={22} className="text-red-400" />
                  <span className="text-sm font-semibold text-red-400">
                    Evasion Detected — Review flagged responses
                  </span>
                </>
              )}
            </div>
          </div>
        </PhaseSection>
      </main>

      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-400">
        © 2026 Epistemic Gauntlet. Built for rigorous thinking.
      </footer>
    </div>
  );
}
