/**
 * DiffComponent — Side-by-side diff view for thesis revisions.
 * Shows before (red/strikethrough) vs. after (green/bold) text.
 */
export default function DiffComponent({ before, after, revisionType, defense }) {
  const tagColors = {
    Concession: "bg-amber-100 text-amber-800 border-amber-300",
    Qualification: "bg-blue-100 text-blue-800 border-blue-300",
    Defense: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Revision type tag */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${tagColors[revisionType] || "bg-slate-100 text-slate-600 border-slate-300"}`}
        >
          {revisionType}
        </span>
      </div>

      {/* Split diff view */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {/* Before */}
        <div className="diff-before p-5">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-red-400 mb-2">
            Before
          </span>
          <p className="text-sm text-red-700 line-through leading-relaxed">
            {before}
          </p>
        </div>

        {/* After */}
        <div className="diff-after p-5">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-500 mb-2">
            After
          </span>
          <p className="text-sm text-emerald-800 font-semibold leading-relaxed">
            {after}
          </p>
        </div>
      </div>

      {/* Defense paragraph */}
      {defense && (
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Defense
          </span>
          <p className="text-sm text-slate-600 leading-relaxed">{defense}</p>
        </div>
      )}
    </div>
  );
}
