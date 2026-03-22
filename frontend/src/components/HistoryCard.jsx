import { useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";

/**
 * HistoryCard — Card for the "Explore Past Debates" grid.
 * Displays truncated thesis, domain badge, and composite score ring.
 */
export default function HistoryCard({ trace }) {
  const navigate = useNavigate();

  const thesisText = trace.thesis_input || "";
  const truncated =
    thesisText.length > 100
      ? thesisText.slice(0, 100) + "…"
      : thesisText;

  // Score comes as 0–1 from the backend
  const rawScore = trace.score?.composite_score ?? 0;
  const displayScore = rawScore <= 1 ? Math.round(rawScore * 100) : Math.round(rawScore);

  const domainColors = {
    Economics: "bg-indigo-100 text-indigo-700",
    "AI / Computer Science": "bg-violet-100 text-violet-700",
    "Political Science": "bg-rose-100 text-rose-700",
  };

  return (
    <button
      onClick={() => navigate(`/debate/${trace.id}`)}
      className="group text-left w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
                 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1
                 transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Domain Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide mb-4 ${domainColors[trace.domain] || "bg-slate-100 text-slate-600"}`}
      >
        {trace.domain}
      </span>

      {/* Thesis (truncated) */}
      <p className="text-sm text-slate-700 leading-relaxed mb-5 min-h-[3.5rem]">
        {truncated}
      </p>

      {/* Score Ring + Label */}
      <div className="flex items-center justify-between">
        <CircularProgress
          value={displayScore}
          label="Score"
          size={56}
          strokeWidth={4}
        />
        <span className="text-xs text-slate-400 group-hover:text-indigo-500 transition-colors">
          View Debate →
        </span>
      </div>
    </button>
  );
}
