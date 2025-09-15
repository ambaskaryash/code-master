import React from 'react';

interface CodeMasterLogoProps {
  className?: string;
  size?: number;
}

const CodeMasterLogo: React.FC<CodeMasterLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="50%" stopColor="#FFA116" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
        
        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main logo background */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="8"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        className="drop-shadow-lg"
      />

      {/* Code symbol < */}
      <path
        d="M14 12 L10 20 L14 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="drop-shadow-sm"
      />

      {/* Code symbol > */}
      <path
        d="M26 12 L30 20 L26 28"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="drop-shadow-sm"
      />

      {/* Center C */}
      <text
        x="20"
        y="25"
        textAnchor="middle"
        className="fill-white font-bold text-sm"
        style={{ fontSize: '14px', fontFamily: 'system-ui, sans-serif' }}
      >
        C
      </text>

      {/* Small decorative dots */}
      <circle cx="16" cy="15" r="1" fill="rgba(255,255,255,0.6)" />
      <circle cx="24" cy="15" r="1" fill="rgba(255,255,255,0.6)" />
      <circle cx="16" cy="25" r="1" fill="rgba(255,255,255,0.6)" />
      <circle cx="24" cy="25" r="1" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
};

export default CodeMasterLogo;