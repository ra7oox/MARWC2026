import React from "react";

const ZelligePattern = ({ opacity = 0.08, className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="zellige-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Classic Moroccan Geometric Grid */}
            <path
              d="M 30 0 L 60 30 L 30 60 L 0 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-morocco-clay"
            />
            <circle
              cx="30"
              cy="30"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-morocco-gold"
            />
            <path
              d="M 30 10 L 40 30 L 30 50 L 20 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-morocco-green/30"
            />
            <path
              d="M 10 30 L 30 40 L 50 30 L 30 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-morocco-red/20"
            />
            {/* Corner details */}
            <path
              d="M 0 0 L 10 0 L 0 10 Z"
              fill="currentColor"
              className="text-morocco-clay/40"
            />
            <path
              d="M 60 0 L 50 0 L 60 10 Z"
              fill="currentColor"
              className="text-morocco-clay/40"
            />
            <path
              d="M 0 60 L 10 60 L 0 50 Z"
              fill="currentColor"
              className="text-morocco-clay/40"
            />
            <path
              d="M 60 60 L 50 60 L 60 50 Z"
              fill="currentColor"
              className="text-morocco-clay/40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellige-grid)" />
      </svg>
    </div>
  );
};

export default ZelligePattern;
