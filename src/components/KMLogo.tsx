import React from 'react';

interface KMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  withShield?: boolean;
}

export const KMLogo: React.FC<KMLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  withShield = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const svgDimension = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 80,
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Monogram Box / Shield with SHARP edges (انحنائيات حادة هندسية) */}
      <div
        className={`${sizeMap[size]} relative rounded-none flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-md overflow-hidden ${
          withShield
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-amber-500/20'
            : ''
        }`}
      >
        {/* Subtle inner light reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-cyan-400/15 pointer-events-none" />

        <svg
          width={svgDimension}
          height={svgDimension}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          <defs>
            {/* Gold Trust Gradient */}
            <linearGradient id="km-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Emerald Trust Gradient */}
            <linearGradient id="km-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Cyan/Blue High-tech Accent */}
            <linearGradient id="km-cyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          {/* Background Sharp Tech Grid Corners */}
          <rect x="14" y="14" width="3" height="3" fill="#F59E0B" opacity="0.6" />
          <rect x="83" y="14" width="3" height="3" fill="#10B981" opacity="0.6" />
          <rect x="14" y="83" width="3" height="3" fill="#10B981" opacity="0.6" />
          <rect x="83" y="83" width="3" height="3" fill="#F59E0B" opacity="0.6" />

          {/* Letter K & M Intertwined Monogram with Sharp Edges (حواف حادة ومستقيمة) */}
          {/* Main Left Pillar (Shares K stem & M 1st leg) */}
          <rect
            x="18"
            y="18"
            width="12"
            height="64"
            rx="0"
            fill="url(#km-gold)"
            className="drop-shadow-sm"
          />

          {/* K Upper Arm & M Left Slope Conjunction - Sharp Linear Angles */}
          <polygon
            points="28,50 56,22 62,22 62,32 36,58"
            fill="url(#km-gold)"
          />

          {/* K Lower Arm - Sharp Linear Angles */}
          <polygon
            points="35,52 60,78 60,82 48,82 28,62"
            fill="url(#km-emerald)"
          />

          {/* M Central Peak & Right Downward Slant - Sharp Precise Geometry */}
          <polygon
            points="48,22 64,48 80,22 88,22 88,32 70,64 62,64 42,34 42,22"
            fill="url(#km-cyan)"
            opacity="0.95"
          />

          {/* M Right Vertical Pillar - Sharp */}
          <rect
            x="76"
            y="24"
            width="12"
            height="58"
            rx="0"
            fill="url(#km-gold)"
          />

          {/* Center Trust Sharp Diamond Spark */}
          <polygon
            points="50,45 55,50 50,55 45,50"
            fill="#FFFFFF"
            className="animate-pulse"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-slate-900 text-lg leading-tight tracking-tight">
              صمملي
            </span>
            <span className="px-1.5 py-0.5 rounded-none bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400 text-amber-900 text-[10px] font-black">
              KM
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
            KM Design & Motion Studio
          </span>
        </div>
      )}
    </div>
  );
};
