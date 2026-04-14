import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const SIGNS = [
  {
    sign: 'Aries',       dates: 'Mar 21 – Apr 19', symbol: '♈',
    from: '#ef4444',     to: '#f97316',             glow: '#ef4444',
    text: "Your hustle culture addiction will manifest as reorganizing productivity apps while actual goals collect dust. Society celebrates your 'entrepreneurial mindset' — code for unemployed with opinions. You mistake motion for progress, urgency for importance. The universe notes your startup ideas are expensive therapy sessions.",
  },
  {
    sign: 'Taurus',      dates: 'Apr 20 – May 20', symbol: '♉',
    from: '#22c55e',     to: '#10b981',             glow: '#22c55e',
    text: "Your luxury minimalism aesthetic will be achieved through purchasing seventeen organizational systems. Comfort zone imprisonment comes with premium amenities and five-star reviews. Stubbornness rebranded as 'having principles' fools absolutely nobody. Venus suggests your routine is fear wearing designer pajamas.",
  },
  {
    sign: 'Gemini',      dates: 'May 21 – Jun 20', symbol: '♊',
    from: '#f59e0b',     to: '#f97316',             glow: '#f59e0b',
    text: "Your intellectual curiosity leads down seventeen Wikipedia rabbit holes while responsibilities multiply exponentially. Communication mastery paired with inability to hold authentic conversations. You've perfected knowing enough about everything to contribute nothing meaningful. Mercury notes that being interesting differs from being interested.",
  },
  {
    sign: 'Cancer',      dates: 'Jun 21 – Jul 22', symbol: '♋',
    from: '#3b82f6',     to: '#06b6d4',             glow: '#3b82f6',
    text: "Your emotional intelligence showcases itself through crafting perfect passive-aggressive text messages over thirty-seven minutes. Vulnerability weaponized as social strategy while remaining genuinely closed off. Empathy became your brand until including yourself felt optional. The moon wonders when feelings became competitive sports.",
  },
  {
    sign: 'Leo',         dates: 'Jul 23 – Aug 22', symbol: '♌',
    from: '#f97316',     to: '#ef4444',             glow: '#f97316',
    text: "Your natural confidence channels into perfecting personal brands while actual personalities atrophy steadily. Audience confused with community, performance with presence, applause with affection. Authenticity became another role in your elaborate one-person show. The sun suggests spotlights cast shadows on everything meaningful.",
  },
  {
    sign: 'Virgo',       dates: 'Aug 23 – Sep 22', symbol: '♍',
    from: '#16a34a',     to: '#14b8a6',             glow: '#16a34a',
    text: "Your perfectionist tendencies manifest as reorganizing optimization systems while chaos reigns everywhere else. Anxiety elevated to artform, called 'high standards' for social acceptability. Productivity became personality until efficiency without purpose revealed itself as expensive procrastination. The harvest reminds you that perfect seeds never planted yield nothing.",
  },
  {
    sign: 'Libra',       dates: 'Sep 23 – Oct 22', symbol: '♎',
    from: '#ec4899',     to: '#f43f5e',             glow: '#ec4899',
    text: "Your diplomatic nature gets tested choosing between fifteen mediocre options while good choices expire. Indecision aestheticized, paralysis called 'thorough consideration' for appearances. Balance obsession achieved equal weighting toward nothing meaningful whatsoever. The scales suggest avoiding conflict creates internal warfare.",
  },
  {
    sign: 'Scorpio',     dates: 'Oct 23 – Nov 21', symbol: '♏',
    from: '#9333ea',     to: '#dc2626',             glow: '#9333ea',
    text: "Your transformative energy directs toward stalking your own 2019 social media while avoiding present-moment growth. Emotional unavailability branded as mysterious depth, distance as wisdom disguised. Intensity became aesthetic while emotional range remained surprisingly narrow throughout. The underworld wonders when you'll investigate personal psychological basements.",
  },
  {
    sign: 'Sagittarius', dates: 'Nov 22 – Dec 21', symbol: '♐',
    from: '#8b5cf6',     to: '#6366f1',             glow: '#8b5cf6',
    text: "Your philosophical nature expresses itself through sharing inspirational quotes while avoiding inspirational action entirely. Motion confused with meaning, exploration with escapism, seeking with finding. Freedom became your cage when true liberty required choosing something meaningful. The archer suggests targets keep moving because you never learned proper aim.",
  },
  {
    sign: 'Capricorn',   dates: 'Dec 22 – Jan 19', symbol: '♑',
    from: '#475569',     to: '#334155',             glow: '#64748b',
    text: "Your ambitious drive propels you toward optimizing optimization while actual goals remain mysteriously undefined. Busy confused with important, climbing with having destinations worth reaching. Success became identity until forgetting what you were succeeding at exactly. The mountain suggests reaching summits means nothing without remembering why climbing started.",
  },
  {
    sign: 'Aquarius',    dates: 'Jan 20 – Feb 18', symbol: '♒',
    from: '#06b6d4',     to: '#3b82f6',             glow: '#06b6d4',
    text: "Your innovative thinking channels into designing solutions for nonexistent problems while ignoring existing ones. Intellectual arrogance branded as progressive thinking, detachment as objectivity performed. Uniqueness became conformity, rebellion your uniform worn proudly. The water-bearer wonders when being different became more important than being useful.",
  },
  {
    sign: 'Pisces',      dates: 'Feb 19 – Mar 20', symbol: '♓',
    from: '#6366f1',     to: '#9333ea',             glow: '#6366f1',
    text: "Your intuitive gifts guide you toward spending four hours researching mercury retrograde while avoiding mercury-level responsibilities. Avoidance spiritualized, escapism called 'self-care' for social acceptability. Dreams became refuge when reality demanded participation in actual life. The fish remind you that deep waters require surfacing for air occasionally.",
  },
];

// ─── Ambient blob config ──────────────────────────────────────────────────────
const BLOBS = [
  { bg: '#5b21b6', left: '-8%',  top: '-12%', w: '640px', h: '640px', dur: '22s', delay: '0s'   },
  { bg: '#1e3a8a', left: '58%',  top: '-8%',  w: '520px', h: '520px', dur: '29s', delay: '-7s'  },
  { bg: '#9d174d', left: '12%',  top: '52%',  w: '460px', h: '460px', dur: '19s', delay: '-13s' },
  { bg: '#6d28d9', left: '72%',  top: '58%',  w: '400px', h: '400px', dur: '25s', delay: '-9s'  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Righteous&display=swap');

  .cv-root {
    font-family: 'Poppins', system-ui, sans-serif;
    min-height: 100dvh;
    background: radial-gradient(ellipse 130% 65% at 50% 0%, #1e0845 0%, #0a001a 45%, #000208 100%);
    overflow-x: hidden;
    position: relative;
    color: #ededef;
    -webkit-font-smoothing: antialiased;
  }

  /* ─── Background layer ─── */
  .cv-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .cv-star {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    animation: cv-twinkle var(--dur, 3s) var(--delay, 0s) infinite ease-in-out;
    will-change: opacity, transform;
  }

  .cv-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.14;
    animation: cv-blob-drift var(--dur, 22s) var(--delay, 0s) infinite ease-in-out alternate;
    will-change: transform;
  }

  /* ─── Layout ─── */
  .cv-content {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 5rem;
  }

  /* ─── Header ─── */
  .cv-header {
    text-align: center;
    margin-bottom: 3.5rem;
  }

  .cv-title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.85rem;
  }

  .cv-sparkle-icon {
    color: #fde68a;
    flex-shrink: 0;
    animation: cv-float 3.2s ease-in-out infinite;
  }
  .cv-sparkle-icon:last-child { animation-delay: -1.6s; }

  .cv-title {
    font-family: 'Righteous', cursive;
    font-size: clamp(2.6rem, 6.5vw, 5.2rem);
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1.1;
    background: linear-gradient(
      90deg,
      #c4b5fd 0%,
      #f9a8d4 18%,
      #fde68a 36%,
      #a5f3fc 54%,
      #c4b5fd 72%,
      #f9a8d4 90%,
      #c4b5fd 100%
    );
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cv-shimmer 6s linear infinite;
  }

  .cv-subtitle {
    font-size: clamp(0.95rem, 2.2vw, 1.2rem);
    font-weight: 300;
    color: #c4b5fd;
    letter-spacing: 0.025em;
    margin-bottom: 0.4rem;
  }

  .cv-date {
    font-size: 0.8rem;
    color: rgba(196, 181, 253, 0.55);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .cv-divider {
    width: 72px;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b);
    margin: 1.25rem auto 0;
    border-radius: 2px;
  }

  /* ─── Grid ─── */
  .cv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
    gap: 1.2rem;
  }

  /* ─── Card ─── */
  .cv-card {
    position: relative;
    background: rgba(255, 255, 255, 0.038);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: 20px;
    padding: 1.5rem;
    cursor: pointer;
    overflow: hidden;
    outline: none;

    opacity: 0;
    transform: translateY(28px);
    animation: cv-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;

    transition:
      transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.25s ease;
  }

  @media (hover: hover) {
    .cv-card:hover {
      transform: translateY(-5px) scale(1.022);
      border-color: rgba(255, 255, 255, 0.15);
    }
  }

  .cv-card:active {
    transform: scale(0.97) !important;
    transition-duration: 0.1s !important;
  }

  .cv-card:focus-visible {
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
  }

  .cv-card.cv-open {
    border-color: rgba(255, 255, 255, 0.18);
  }

  /* Card gradient sheen */
  .cv-card-sheen {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    opacity: 0.13;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  @media (hover: hover) {
    .cv-card:hover .cv-card-sheen { opacity: 0.22; }
  }
  .cv-card.cv-open .cv-card-sheen { opacity: 0.22; }

  /* Top-edge specular highlight */
  .cv-card-spec {
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
    pointer-events: none;
    border-radius: 0 0 1px 1px;
  }

  /* Card body */
  .cv-card-body {
    position: relative;
    z-index: 1;
  }

  .cv-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
  }

  .cv-sign-name {
    font-family: 'Righteous', cursive;
    font-size: 1.18rem;
    font-weight: 400;
    color: #ededef;
    line-height: 1.25;
  }

  .cv-sign-dates {
    font-size: 0.73rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 0.2rem;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .cv-sign-symbol {
    font-size: 2.1rem;
    line-height: 1;
    opacity: 0.65;
    flex-shrink: 0;
    transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .cv-card.cv-open .cv-sign-symbol {
    opacity: 0.9;
    transform: scale(1.1);
  }

  /* Footer row */
  .cv-card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .cv-hint {
    font-size: 0.77rem;
    color: rgba(255, 255, 255, 0.38);
    font-style: italic;
    font-weight: 300;
    transition: color 0.2s ease;
  }
  .cv-card.cv-open .cv-hint {
    color: rgba(255, 255, 255, 0.6);
    font-style: normal;
    font-weight: 400;
  }

  .cv-chevron {
    color: rgba(255, 255, 255, 0.32);
    flex-shrink: 0;
    transition:
      transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
      color 0.2s ease;
  }
  .cv-card.cv-open .cv-chevron {
    transform: rotate(180deg);
    color: rgba(255, 255, 255, 0.65);
  }

  /* ─── Reveal panel ─── */
  .cv-reveal {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                margin-top 0.42s cubic-bezier(0.16, 1, 0.3, 1);
    margin-top: 0;
  }
  .cv-reveal.cv-reveal-open {
    grid-template-rows: 1fr;
    margin-top: 0.9rem;
  }

  .cv-reveal-clip {
    overflow: hidden;
    min-height: 0;
  }

  .cv-reveal-text {
    font-size: 0.875rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 300;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  /* ─── Footer ─── */
  .cv-footer {
    text-align: center;
    margin-top: 4.5rem;
    padding-bottom: 1rem;
  }
  .cv-footer-line1 {
    color: rgba(196, 181, 253, 0.55);
    font-size: 0.875rem;
    font-weight: 300;
  }
  .cv-footer-line2 {
    color: rgba(196, 181, 253, 0.32);
    font-size: 0.78rem;
    font-style: italic;
    margin-top: 0.4rem;
  }

  /* ─── Keyframes ─── */
  @keyframes cv-fade-up {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes cv-twinkle {
    0%, 100% { opacity: 0.12; transform: scale(1); }
    50%       { opacity: 0.9;  transform: scale(1.5); }
  }

  @keyframes cv-blob-drift {
    0%   { transform: translate(0,    0)    scale(1);    }
    25%  { transform: translate(25px, -18px) scale(1.05); }
    50%  { transform: translate(-12px, 28px) scale(0.95); }
    75%  { transform: translate(18px,  12px) scale(1.03); }
    100% { transform: translate(-8px, -22px) scale(0.97); }
  }

  @keyframes cv-shimmer {
    0%   { background-position: 0%   center; }
    100% { background-position: 300% center; }
  }

  @keyframes cv-float {
    0%, 100% { transform: translateY(0)   rotate(-6deg); }
    50%       { transform: translateY(-9px) rotate(6deg);  }
  }

  /* ─── Responsive ─── */
  @media (max-width: 600px) {
    .cv-content { padding: 2.5rem 1rem 4rem; }
    .cv-grid    { grid-template-columns: 1fr; gap: 1rem; }
    .cv-sparkle-icon { width: 26px; height: 26px; }
  }

  /* ─── Reduced motion ─── */
  @media (prefers-reduced-motion: reduce) {
    .cv-star, .cv-blob, .cv-sparkle-icon, .cv-title {
      animation: none !important;
      opacity: 1 !important;
    }
    .cv-card {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: box-shadow 0.1s ease, border-color 0.1s ease !important;
    }
    .cv-card:hover    { transform: none !important; }
    .cv-card:active   { transform: none !important; }
    .cv-reveal, .cv-chevron, .cv-card-sheen,
    .cv-sign-symbol, .cv-hint { transition: none !important; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
const SatiricalHoroscope = () => {
  const [openSign, setOpenSign] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        timeZone: 'Europe/Berlin',
      })
    );
  }, []);

  // Stable star positions derived from index (no random on re-render)
  const stars = useMemo(() =>
    Array.from({ length: 75 }, (_, i) => ({
      id: i,
      left:  `${((i * 37.71) % 100).toFixed(2)}%`,
      top:   `${((i * 23.31) % 100).toFixed(2)}%`,
      size:  i % 6 === 0 ? '2.5px' : i % 3 === 0 ? '1.5px' : '1px',
      dur:   `${(2.2 + (i % 5) * 0.65).toFixed(1)}s`,
      delay: `${((i * 0.41) % 3.5).toFixed(1)}s`,
    }))
  , []);

  const toggle = (sign) => setOpenSign(prev => (prev === sign ? null : sign));

  return (
    <div className="cv-root">
      <style>{CSS}</style>

      {/* ── Background: stars + blobs ── */}
      <div className="cv-bg" aria-hidden="true">
        {stars.map(s => (
          <div
            key={s.id}
            className="cv-star"
            style={{
              left: s.left, top: s.top,
              width: s.size, height: s.size,
              '--dur': s.dur, '--delay': s.delay,
            }}
          />
        ))}
        {BLOBS.map((b, i) => (
          <div
            key={i}
            className="cv-blob"
            style={{
              background: b.bg,
              left: b.left, top: b.top,
              width: b.w, height: b.h,
              '--dur': b.dur, '--delay': b.delay,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="cv-content">

        {/* Header */}
        <header className="cv-header">
          <div className="cv-title-row">
            <Sparkles className="cv-sparkle-icon" size={34} aria-hidden="true" />
            <h1 className="cv-title">Cosmic Delusions</h1>
            <Sparkles className="cv-sparkle-icon" size={34} aria-hidden="true" />
          </div>
          <p className="cv-subtitle">Daily Horoscopes for the Intellectually Superior</p>
          {currentDate && (
            <p className="cv-date">{currentDate}&nbsp;&middot;&nbsp;Updated daily at 7:00 CEST</p>
          )}
          <div className="cv-divider" />
        </header>

        {/* Zodiac grid */}
        <main>
          <div className="cv-grid" role="list">
            {SIGNS.map((h, i) => {
              const isOpen = openSign === h.sign;
              const rgb    = hexToRgb(h.glow);
              return (
                <article
                  key={h.sign}
                  className={`cv-card${isOpen ? ' cv-open' : ''}`}
                  role="listitem"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${h.sign} horoscope`}
                  style={{
                    animationDelay: `${i * 55}ms`,
                    boxShadow: isOpen
                      ? `0 0 48px rgba(${rgb}, 0.28), 0 12px 40px rgba(0,0,0,0.55)`
                      : '0 4px 28px rgba(0,0,0,0.35)',
                  }}
                  onClick={() => toggle(h.sign)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(h.sign);
                    }
                  }}
                >
                  {/* Gradient overlay */}
                  <div
                    className="cv-card-sheen"
                    style={{ background: `linear-gradient(135deg, ${h.from}, ${h.to})` }}
                    aria-hidden="true"
                  />
                  {/* Top specular */}
                  <div className="cv-card-spec" aria-hidden="true" />

                  <div className="cv-card-body">
                    {/* Sign name + symbol */}
                    <div className="cv-card-header">
                      <div>
                        <div className="cv-sign-name">{h.sign}</div>
                        <div className="cv-sign-dates">{h.dates}</div>
                      </div>
                      <div className="cv-sign-symbol" aria-hidden="true">{h.symbol}</div>
                    </div>

                    {/* Footer row: hint + chevron */}
                    <div className="cv-card-foot">
                      <span className="cv-hint">
                        {isOpen ? 'Your cosmic verdict:' : 'Tap to reveal your fate'}
                      </span>
                      <ChevronDown
                        className="cv-chevron"
                        size={15}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Collapsible text */}
                    <div
                      className={`cv-reveal${isOpen ? ' cv-reveal-open' : ''}`}
                      aria-live="polite"
                    >
                      <div className="cv-reveal-clip">
                        <p className="cv-reveal-text">{h.text}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="cv-footer">
          <p className="cv-footer-line1">Satirical astrology for the modern existential crisis</p>
          <p className="cv-footer-line2">
            "Because if you're going to believe in nonsense, at least make it intellectually honest nonsense."
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SatiricalHoroscope;
