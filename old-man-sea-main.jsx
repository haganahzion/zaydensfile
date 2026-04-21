// old-man-sea-main.jsx
// Main animation: intro + 3 picture scenes + compare/contrast

// ── Timing constants ──────────────────────────────────────────────────────
// Intro: 0–4s
// Scene 1: 4–40s
// Scene 2: 40–76s
// Scene 3: 76–112s
// Compare/Contrast: 112–150s
// Total: 150s

const SCENE_START = [4, 40, 76];
const SCENE_DUR = 36;
const CC_START = 112;
const CC_DUR = 38;
const TOTAL = 150;

const SERIF = "'Playfair Display', Georgia, serif";
const BODY  = "'Lora', Georgia, serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

// ── Update screen label each second ──────────────────────────────────────
function ScreenLabelUpdater() {
  const t = useTime();
  React.useEffect(() => {
    const el = document.getElementById('video-root');
    if (el) el.setAttribute('data-screen-label', `t=${Math.floor(t)}s`);
  }, [Math.floor(t)]);
  return null;
}

// ── Music tick + mute button ──────────────────────────────────────────────
function MusicController() {
  const { time, playing } = useTimeline();
  const [muted, setMuted] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  // Start audio on first user interaction
  React.useEffect(() => {
    const start = () => {
      if (window.MusicEngine) { window.MusicEngine.start(); setStarted(true); }
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('click', start);
    window.addEventListener('keydown', start);
    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  // Tick music ~4× per second
  const quantized = Math.round(time * 4) / 4;
  React.useEffect(() => {
    if (window.MusicEngine && started) window.MusicEngine.tick(time, playing);
  }, [quantized, playing, started]);

  const toggle = (e) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (window.MusicEngine) window.MusicEngine.setMuted(next);
  };

  return (
    <div
      onClick={toggle}
      title={muted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'absolute', bottom: 58, right: 20,
        width: 32, height: 32, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(20,18,14,0.72)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, cursor: 'pointer',
        color: muted ? 'rgba(200,180,140,0.35)' : 'rgba(200,180,140,0.8)',
        transition: 'color 200ms, background 200ms',
        userSelect: 'none',
      }}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2V5.5Z" fill="currentColor" opacity="0.5"/>
          <line x1="10" y1="5" x2="15" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="5" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2V5.5Z" fill="currentColor"/>
          <path d="M10 4.5c1.5 0.8 2.5 2.2 2.5 3.5s-1 2.7-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M11.5 2c2.5 1.3 4 3.5 4 6s-1.5 4.7-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55"/>
        </svg>
      )}
    </div>
  );
}

// ── Fade from black overlay ───────────────────────────────────────────────
function FadeIn({ start = 0, dur = 1 }) {
  const t = useTime();
  const opacity = animate({ from: 1, to: 0, start, end: start + dur, ease: Easing.easeOutCubic })(t);
  if (opacity <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, background: '#000', opacity, zIndex: 100, pointerEvents: 'none' }} />;
}

function FadeOut({ start = 0, dur = 1 }) {
  const t = useTime();
  const opacity = animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeInCubic })(t);
  if (opacity <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, background: '#000', opacity, zIndex: 100, pointerEvents: 'none' }} />;
}

// ── INTRO SCENE ───────────────────────────────────────────────────────────
function IntroScene() {
  const t = useTime();
  const titleOpacity = animate({ from: 0, to: 1, start: 0.8, end: 2.2, ease: Easing.easeOutCubic })(t);
  const subtitleOpacity = animate({ from: 0, to: 1, start: 1.6, end: 3.0, ease: Easing.easeOutCubic })(t);
  const dividerW = animate({ from: 0, to: 180, start: 1.8, end: 3.0, ease: Easing.easeInOutCubic })(t);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #1a1008 0%, #080402 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', opacity: titleOpacity }}>
        <div style={{
          fontFamily: MONO, fontSize: 13, letterSpacing: '0.3em',
          color: 'rgba(200,170,110,0.7)', textTransform: 'uppercase', marginBottom: 18,
        }}>Ernest Hemingway, 1952</div>
        <div style={{
          fontFamily: SERIF, fontSize: 72, color: '#f0e8d8',
          fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.05,
        }}>The Old Man<br/>and the Sea</div>
      </div>
      <div style={{
        width: dividerW, height: 1.5,
        background: 'linear-gradient(90deg, transparent, rgba(200,160,80,0.7), transparent)',
        margin: '28px auto',
      }} />
      <div style={{
        fontFamily: BODY, fontSize: 19, color: 'rgba(220,200,170,0.65)',
        fontStyle: 'italic', opacity: subtitleOpacity, letterSpacing: '0.02em',
      }}>
        A Visual Analysis in Three Images
      </div>
      <FadeIn start={0} dur={0.6} />
    </div>
  );
}

// ── BULLET ITEM ───────────────────────────────────────────────────────────
function BulletItem({ text, index, sceneStart, accent, isTheme = false }) {
  const t = useTime();
  const BULLET_GAP = 7.5;
  const appearAt = sceneStart + 8 + index * BULLET_GAP;
  const fadeEnd = sceneStart + SCENE_DUR - 1;

  const progress = clamp((t - appearAt) / 0.7, 0, 1);
  const fadeOut = clamp((t - fadeEnd) / 0.8, 0, 1);
  const opacity = Easing.easeOutCubic(progress) * (1 - Easing.easeInCubic(fadeOut));
  const tx = (1 - Easing.easeOutCubic(progress)) * 22;

  if (t < appearAt - 0.1) return null;

  return (
    <div style={{
      opacity,
      transform: `translateX(${tx}px)`,
      marginBottom: isTheme ? 0 : 16,
      paddingLeft: isTheme ? 0 : 0,
      willChange: 'transform, opacity',
    }}>
      {isTheme ? (
        <div style={{
          marginTop: 10,
          padding: '10px 16px',
          borderLeft: `3px solid ${accent}`,
          background: `rgba(${hexToRgb(accent)}, 0.08)`,
          borderRadius: '0 6px 6px 0',
        }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', color: accent, textTransform: 'uppercase', marginBottom: 5 }}>Core Theme</div>
          <div style={{ fontFamily: BODY, fontSize: 16, color: 'rgba(230,215,190,0.92)', fontStyle: 'italic', lineHeight: 1.5 }}>{text}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: accent, flexShrink: 0, marginTop: 7,
            boxShadow: `0 0 8px ${accent}80`,
          }} />
          <div style={{ fontFamily: BODY, fontSize: 17, color: 'rgba(230,218,198,0.9)', lineHeight: 1.6 }}>{text}</div>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ── PICTURE SCENE ─────────────────────────────────────────────────────────
function PictureScene({ sceneIndex }) {
  const data = SCENE_DATA[sceneIndex];
  const start = SCENE_START[sceneIndex];
  const end = start + SCENE_DUR;
  const t = useTime();

  if (t < start - 0.5 || t > end + 0.5) return null;

  const progress = clamp((t - start) / SCENE_DUR, 0, 1);
  const { Painting, num, title, subtitle, accent, bullets, theme, bg } = data;

  // Panel / label animations
  const panelOpacity = animate({ from: 0, to: 1, start: start + 0.3, end: start + 1.5, ease: Easing.easeOutCubic })(t);
  const titleOpacity = animate({ from: 0, to: 1, start: start + 1.0, end: start + 2.2, ease: Easing.easeOutCubic })(t);
  const titleTy = (1 - clamp((t - start - 1.0) / 1.2, 0, 1)) * 14;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Full-bleed painting on left 58% */}
      <div style={{ position: 'absolute', inset: 0, width: '60%', overflow: 'hidden' }}>
        <Painting progress={progress} />
        {/* Gradient fade to right panel */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: 200,
          background: `linear-gradient(90deg, transparent, ${bg}ee)`,
        }} />
      </div>

      {/* Right text panel */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '44%',
        background: `linear-gradient(90deg, ${bg}ee, ${bg} 25%)`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 52px 0 40px',
        opacity: panelOpacity,
      }}>
        {/* Picture number */}
        <div style={{
          fontFamily: SERIF, fontSize: 11, letterSpacing: '0.35em',
          color: `${accent}99`, textTransform: 'uppercase', marginBottom: 8,
          opacity: titleOpacity,
        }}>
          Picture {num}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: SERIF, fontSize: 36, color: '#f0e8d8',
          fontWeight: 700, lineHeight: 1.1, marginBottom: 6,
          opacity: titleOpacity,
          transform: `translateY(${titleTy}px)`,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: BODY, fontSize: 15, color: `rgba(210,195,170,0.65)`,
          fontStyle: 'italic', marginBottom: 28,
          opacity: titleOpacity,
        }}>
          {subtitle}
        </div>

        {/* Divider */}
        <div style={{
          width: 40, height: 1.5, background: `${accent}88`,
          marginBottom: 24,
          opacity: titleOpacity,
        }} />

        {/* Bullets */}
        <div>
          {bullets.map((b, i) => (
            <BulletItem key={i} text={b} index={i} sceneStart={start} accent={accent} />
          ))}
          <BulletItem text={theme} index={bullets.length} sceneStart={start} accent={accent} isTheme />
        </div>
      </div>

      <FadeIn start={start} dur={0.8} />
      <FadeOut start={end - 0.8} dur={0.8} />
    </div>
  );
}

// ── MINI PAINTING (for compare/contrast section) ──────────────────────────
function MiniPainting({ sceneIndex, width = 280, height = 158 }) {
  const { Painting, accent, num, title } = SCENE_DATA[sceneIndex];
  return (
    <div style={{ width, flexShrink: 0 }}>
      <div style={{
        width, height, borderRadius: 6, overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        border: `1px solid rgba(255,255,255,0.07)`,
      }}>
        <Painting progress={0.4} />
      </div>
      <div style={{ marginTop: 8, textAlign: 'center' }}>
        <span style={{ fontFamily: SERIF, fontSize: 12, color: `${accent}cc`, letterSpacing: '0.15em' }}>
          PICTURE {num}
        </span>
        <span style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(200,185,165,0.55)', marginLeft: 8, fontStyle: 'italic' }}>
          {title}
        </span>
      </div>
    </div>
  );
}

// ── COMPARE/CONTRAST SCENE ────────────────────────────────────────────────
function CompareScene() {
  const t = useTime();
  if (t < CC_START - 0.5 || t > CC_START + CC_DUR + 0.5) return null;

  const CHUNK_DUR = 6.5;
  const headerOpacity = animate({ from: 0, to: 1, start: CC_START + 0.8, end: CC_START + 2.0 })(t);
  const miniOpacity = animate({ from: 0, to: 1, start: CC_START + 1.2, end: CC_START + 2.6 })(t);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #0e0c0a 0%, #060504 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 80px',
    }}>
      {/* Header */}
      <div style={{ opacity: headerOpacity, marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', color: 'rgba(180,160,120,0.6)', textTransform: 'uppercase', marginBottom: 10 }}>
          Compare &amp; Contrast
        </div>
        <div style={{ width: 60, height: 1, background: 'rgba(180,160,120,0.35)', margin: '0 auto' }} />
      </div>

      {/* Three mini paintings */}
      <div style={{
        display: 'flex', gap: 28, marginBottom: 36,
        opacity: miniOpacity,
        transform: `translateY(${(1-miniOpacity)*12}px)`,
      }}>
        {[0, 1, 2].map(i => <MiniPainting key={i} sceneIndex={i} />)}
      </div>

      {/* Paragraph chunks */}
      <div style={{ maxWidth: 860, width: '100%' }}>
        {COMPARE_PARA.map((chunk, i) => {
          const appearAt = CC_START + 2.5 + i * CHUNK_DUR;
          const hideAt = CC_START + CC_DUR - 0.8;
          const op = clamp((t - appearAt) / 0.9, 0, 1);
          const fadeOp = clamp((t - hideAt) / 0.7, 0, 1);
          const ty = (1 - Easing.easeOutCubic(op)) * 14;

          if (t < appearAt - 0.1) return null;
          return (
            <div key={i} style={{
              opacity: Easing.easeOutCubic(op) * (1 - Easing.easeInCubic(fadeOp)),
              transform: `translateY(${ty}px)`,
              marginBottom: 14,
              willChange: 'transform, opacity',
            }}>
              {i === 0 ? (
                <div style={{
                  fontFamily: SERIF, fontSize: 20, color: 'rgba(235,222,200,0.95)',
                  fontStyle: 'italic', lineHeight: 1.6, textAlign: 'center',
                  marginBottom: 20,
                }}>
                  "{chunk}"
                </div>
              ) : (
                <div style={{
                  fontFamily: BODY, fontSize: 16.5, color: 'rgba(215,200,178,0.85)',
                  lineHeight: 1.75, textWrap: 'pretty',
                  borderLeft: i === COMPARE_PARA.length - 1
                    ? '2px solid rgba(180,160,120,0.4)'
                    : 'none',
                  paddingLeft: i === COMPARE_PARA.length - 1 ? 16 : 0,
                }}>
                  {chunk}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FadeIn start={CC_START} dur={0.8} />
      <FadeOut start={CC_START + CC_DUR - 0.8} dur={0.8} />
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────
function OldManSea() {
  return (
    <Stage
      width={1280}
      height={720}
      duration={TOTAL}
      background="#080402"
      persistKey="old-man-sea"
      loop={false}
    >
      <div id="video-root" data-screen-label="t=0s" style={{ position: 'absolute', inset: 0 }}>
        <ScreenLabelUpdater />
        <MusicController />
        <Sprite start={0} end={4.5}><IntroScene /></Sprite>
        <PictureScene sceneIndex={0} />
        <PictureScene sceneIndex={1} />
        <PictureScene sceneIndex={2} />
        <CompareScene />
      </div>
    </Stage>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OldManSea />);
