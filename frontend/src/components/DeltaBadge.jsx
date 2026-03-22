import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * DeltaBadge — Displays the net improvement delta with directional coloring.
 * @param {object} props
 * @param {number} props.delta
 */
export default function DeltaBadge({ delta = 0 }) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  const bgColor = isPositive
    ? "bg-emerald-50 border-emerald-200"
    : isNeutral
      ? "bg-slate-50 border-slate-200"
      : "bg-red-50 border-red-200";

  const textColor = isPositive
    ? "text-emerald-700"
    : isNeutral
      ? "text-slate-500"
      : "text-red-700";

  const Icon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${bgColor}`}
    >
      <Icon size={18} className={textColor} />
      <span className={`text-sm font-semibold ${textColor}`}>
        {isPositive ? "+" : ""}
        {delta} Delta
      </span>
    </div>
  );
}
