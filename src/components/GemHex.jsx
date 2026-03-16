// Gem-faceted hexagonal shield — core visual component

const TIERS = {
  bronze:   { base: '#C8762A', light: '#E8A055', mid: '#D98A3A', dark: '#A05E1A', glow: 'rgba(200,118,42,0.5)' },
  iron:     { base: '#7A8E9C', light: '#A8BCC8', mid: '#8EA0AE', dark: '#5A6E7C', glow: 'rgba(122,142,156,0.5)' },
  gold:     { base: '#D4A800', light: '#F5D840', mid: '#E8C020', dark: '#A07800', glow: 'rgba(232,196,32,0.6)' },
  shadow:   { base: '#3A4558', light: '#5A6880', mid: '#4A5568', dark: '#1E2530', glow: 'rgba(90,104,128,0.5)' },
  crystal:  { base: '#6AA8D8', light: '#B8DEFF', mid: '#8EC8F0', dark: '#4A88B8', glow: 'rgba(142,200,240,0.7)' },
  emerald:  { base: '#1A7A4A', light: '#2EAA68', mid: '#22934E', dark: '#0E5232', glow: 'rgba(30,122,74,0.5)' },
  platinum: { base: '#A8C0D0', light: '#E0EEF8', mid: '#C0D8E8', dark: '#7898AC', glow: 'rgba(192,214,232,0.7)' },
}

export default function GemHex({ tier = 'bronze', size = 120, glow = false }) {
  const c = TIERS[tier] || TIERS.bronze
  const id = `hex-${tier}-${size}`

  // Pointy-top hexagon, viewBox 100 x 115
  // Center: (50, 57.5), circumradius: 57.5
  // Points: top(50,0), tr(99.8,28.75), br(99.8,86.25), bot(50,115), bl(0.2,86.25), tl(0.2,28.75)
  const pts = '50,2 98,28.75 98,86.25 50,113 2,86.25 2,28.75'
  const cx = 50
  const cy = 57.5

  return (
    <svg
      viewBox="0 0 100 115"
      width={size}
      height={size * 1.15}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glow ? `drop-shadow(0 0 ${size * 0.12}px ${c.glow})` : 'none' }}
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="50%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>

      {/* Base hex */}
      <polygon points={pts} fill={`url(#${id}-grad)`} />

      {/* Top-right facet — lightest */}
      <polygon
        points={`${cx},2 98,28.75 ${cx},${cy}`}
        fill="rgba(255,255,255,0.22)"
      />
      {/* Top-left facet */}
      <polygon
        points={`${cx},2 2,28.75 ${cx},${cy}`}
        fill="rgba(255,255,255,0.14)"
      />
      {/* Right facet */}
      <polygon
        points={`98,28.75 98,86.25 ${cx},${cy}`}
        fill="rgba(0,0,0,0.08)"
      />
      {/* Bottom-right facet — darkest */}
      <polygon
        points={`98,86.25 ${cx},113 ${cx},${cy}`}
        fill="rgba(0,0,0,0.2)"
      />
      {/* Bottom-left facet */}
      <polygon
        points={`${cx},113 2,86.25 ${cx},${cy}`}
        fill="rgba(0,0,0,0.14)"
      />
      {/* Left facet */}
      <polygon
        points={`2,86.25 2,28.75 ${cx},${cy}`}
        fill="rgba(255,255,255,0.06)"
      />

      {/* Gem glint — top-left highlight */}
      <polygon
        points={`${cx},2 70,20 ${cx},34 30,20`}
        fill="rgba(255,255,255,0.45)"
      />

      {/* Edge stroke */}
      <polygon
        points={pts}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
    </svg>
  )
}
