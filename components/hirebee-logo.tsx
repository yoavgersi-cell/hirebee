export function HireBeeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wings — organic, slightly transparent */}
      <path d="M19 15 C15 9 2 9 4 18 C5.5 23 14 21 19 17 Z" fill="#93C5FD" opacity="0.75" />
      <path d="M21 15 C25 9 38 9 36 18 C34.5 23 26 21 21 17 Z" fill="#93C5FD" opacity="0.75" />
      {/* Body */}
      <ellipse cx="20" cy="29" rx="10.5" ry="12" fill="#FBBF24" />
      {/* Stripes */}
      <path d="M10 26 Q20 23 30 26 L30 30 Q20 27 10 30 Z" fill="#1F2937" opacity="0.45" />
      <path d="M10 33 Q20 30 30 33 L30 37 Q20 34 10 37 Z" fill="#1F2937" opacity="0.45" />
      {/* Head */}
      <circle cx="20" cy="14" r="9" fill="#FBBF24" />
      {/* Glasses — slightly oval for character */}
      <ellipse cx="16.5" cy="13" rx="4" ry="3.7" fill="white" stroke="#1F2937" strokeWidth="1.3" />
      <ellipse cx="23.5" cy="13" rx="4" ry="3.7" fill="white" stroke="#1F2937" strokeWidth="1.3" />
      {/* Bridge */}
      <line x1="20.5" y1="13" x2="19.5" y2="13" stroke="#1F2937" strokeWidth="1.3" />
      {/* Arms */}
      <line x1="12.5" y1="12.5" x2="11" y2="11.5" stroke="#1F2937" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="27.5" y1="12.5" x2="29" y2="11.5" stroke="#1F2937" strokeWidth="1.3" strokeLinecap="round" />
      {/* Pupils — looking slightly right */}
      <circle cx="17" cy="13" r="1.7" fill="#1F2937" />
      <circle cx="24" cy="13" r="1.7" fill="#1F2937" />
      {/* Smile */}
      <path d="M17.5 16.5 Q20 18.2 22.5 16.5" stroke="#1F2937" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      {/* Antennae */}
      <path d="M17 6 Q14 2.5 11.5 1" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="1" r="1.8" fill="#FBBF24" stroke="#1F2937" strokeWidth="1.1" />
      <path d="M23 6 Q26 2.5 28.5 1" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="29" cy="1" r="1.8" fill="#FBBF24" stroke="#1F2937" strokeWidth="1.1" />
      {/* Resume — slightly bigger, more readable */}
      <rect x="29" y="21" width="10.5" height="14" rx="1.5" fill="white" stroke="#D1D5DB" strokeWidth="1.1" />
      <line x1="31.5" y1="25" x2="37" y2="25" stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1="31.5" y1="28.5" x2="37" y2="28.5" stroke="#D1D5DB" strokeWidth="1" />
      <line x1="31.5" y1="31" x2="37" y2="31" stroke="#D1D5DB" strokeWidth="1" />
      <line x1="31.5" y1="33.5" x2="35" y2="33.5" stroke="#D1D5DB" strokeWidth="1" />
      {/* Arm */}
      <path d="M29.5 26 Q28 23 26 22" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
