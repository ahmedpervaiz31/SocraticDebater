import { useMemo } from "react";

/**
 * CircularProgress — Animated SVG ring for scoring metrics.
 * @param {object} props
 * @param {number} props.value - 0–100
 * @param {string} props.label - Metric name
 * @param {number} [props.size=96] - Diameter in px
 * @param {number} [props.strokeWidth=6]
 */
export default function CircularProgress({
  value = 0,
  label = "",
  size = 96,
  strokeWidth = 6,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color = useMemo(() => {
    if (value >= 75) return "#16a34a"; // green-600
    if (value >= 50) return "#4f46e5"; // indigo-600
    if (value >= 30) return "#d97706"; // amber-600
    return "#dc2626"; // red-600
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="block">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          {/* Value arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="progress-ring-circle"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-lg font-bold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
