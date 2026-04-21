// old-man-sea-scenes.jsx
// Scene paintings + bullet content for The Old Man and the Sea video

// ─── SCENE 1: Golden Hour — Santiago Alone ──────────────────────────────────
function Scene1Painting({ progress = 0 }) {
  const zoom = 1 + progress * 0.05;
  const panX = progress * -18;
  return (
    <div style={{
      position: 'absolute', inset: '-8%',
      transform: `scale(${zoom}) translateX(${panX}px)`,
      transformOrigin: 'center',
    }}>
      {/* Sky */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '58%',
        background: 'linear-gradient(180deg, #6b1a0a 0%, #b8361c 18%, #d95a28 38%, #e87830 55%, #f0a040 72%, #f8c860 88%, #fde080 100%)',
      }} />
      {/* Sun disc */}
      <div style={{
        position: 'absolute',
        left: '38%', top: '47%',
        width: 100, height: 100, marginLeft: -50, marginTop: -50,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,248,200,0.98) 0%, rgba(255,220,100,0.85) 35%, rgba(248,170,50,0.5) 60%, transparent 100%)',
        filter: 'blur(1px)',
      }} />
      {/* Horizon atmospheric glow */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '52%', height: 80,
        background: 'linear-gradient(180deg, rgba(255,185,60,0.55) 0%, rgba(255,185,60,0) 100%)',
      }} />
      {/* Water */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(180deg, #1c5878 0%, #0f3550 30%, #071f38 65%, #020c18 100%)',
      }} />
      {/* Sun reflection on water */}
      <div style={{
        position: 'absolute', left: '24%', right: '24%', top: '57%', height: 90,
        background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,195,70,0.45) 0%, transparent 100%)',
      }} />
      {/* Distant wave hints */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 30}%`, top: `${57 + i * 3}%`,
          right: `${10 + i * 25}%`, height: 2,
          background: `rgba(100,160,200,${0.12 - i * 0.03})`,
          borderRadius: 2,
        }} />
      ))}
      {/* Boat */}
      <svg style={{position:'absolute', left:'55%', top:'53%', marginLeft:-70, marginTop:-20}} width="140" height="52" viewBox="0 0 140 52">
        {/* Shadow on water */}
        <ellipse cx="70" cy="46" rx="62" ry="6" fill="rgba(0,0,0,0.25)" />
        {/* Hull */}
        <path d="M14 30 Q70 42 126 30 L120 24 Q70 36 20 24 Z" fill="#4a2810" />
        <path d="M20 24 Q70 36 120 24 L118 20 Q70 32 22 20 Z" fill="#6a3c18" />
        {/* Gunwale line */}
        <path d="M22 21 Q70 33 118 21" stroke="rgba(160,100,50,0.6)" strokeWidth="1.5" fill="none" />
        {/* Santiago figure — hunched */}
        <ellipse cx="76" cy="20" rx="7" ry="9" fill="#1e0e04" />
        <circle cx="76" cy="11" r="5.5" fill="#140a02" />
        {/* Straw hat */}
        <ellipse cx="76" cy="7.5" rx="9" ry="2.5" fill="#2a1808" />
        <path d="M68 7 L84 7 L82 10 L70 10 Z" fill="#1e1004" />
        {/* Arm reaching line */}
        <line x1="79" y1="22" x2="108" y2="18" stroke="#1e0e04" strokeWidth="2.5" strokeLinecap="round" />
        {/* Taut fishing line */}
        <line x1="108" y1="18" x2="136" y2="52" stroke="rgba(220,200,160,0.8)" strokeWidth="1.5" />
        {/* Line tension mark */}
        <line x1="112" y1="20" x2="140" y2="52" stroke="rgba(220,200,160,0.3)" strokeWidth="1" />
      </svg>
      {/* Film grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
        opacity: 0.5, mixBlendMode: 'overlay',
      }} />
    </div>
  );
}

// ─── SCENE 2: Deep Blue — Santiago and the Marlin ───────────────────────────
function Scene2Painting({ progress = 0 }) {
  const zoom = 1 + progress * 0.04;
  return (
    <div style={{
      position: 'absolute', inset: '-8%',
      transform: `scale(${zoom})`,
      transformOrigin: '60% 50%',
    }}>
      {/* Pre-dawn sky */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(180deg, #0a0818 0%, #10152e 35%, #1a2448 65%, #263860 85%, #304868 100%)',
      }} />
      {/* Stars scattered */}
      {[[8,5],[15,12],[25,4],[35,9],[50,3],[62,14],[72,7],[85,11],[92,5],[20,18],[45,15],[78,3]].map(([x,y],i) => (
        <div key={i} style={{
          position:'absolute', left:`${x}%`, top:`${y}%`,
          width: i % 3 === 0 ? 2 : 1.5, height: i % 3 === 0 ? 2 : 1.5,
          borderRadius:'50%', background:`rgba(220,230,255,${0.4 + (i%3)*0.2})`,
        }} />
      ))}
      {/* First light at horizon */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '40%', height: 50,
        background: 'linear-gradient(180deg, rgba(40,70,120,0) 0%, rgba(60,100,160,0.4) 50%, rgba(80,130,180,0.3) 100%)',
      }} />
      {/* Deep ocean */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'linear-gradient(180deg, #1e3a58 0%, #112238 35%, #080f1e 70%, #020508 100%)',
      }} />
      {/* Marlin shape — massive, just breaking surface */}
      <svg style={{position:'absolute', left:'8%', top:'34%'}} width="900" height="250" viewBox="0 0 900 250">
        {/* Body glow/bioluminescence */}
        <ellipse cx="450" cy="130" rx="420" ry="55" fill="rgba(80,140,200,0.08)" />
        <ellipse cx="450" cy="130" rx="380" ry="40" fill="rgba(100,160,220,0.1)" />
        {/* Main body */}
        <path d="M30 140 Q180 105 380 118 Q520 128 700 122 Q800 118 870 135 L880 145 Q800 135 700 140 Q520 148 380 138 Q180 130 30 160 Z"
              fill="#1a3a6a" />
        <path d="M60 138 Q200 108 380 120 Q520 130 700 124 Q800 120 860 136"
              stroke="rgba(100,160,220,0.35)" strokeWidth="2" fill="none" />
        {/* Dorsal fin */}
        <path d="M350 118 Q390 60 440 55 Q490 52 510 80 Q530 108 510 118 Z"
              fill="#152e58" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5" />
        {/* Bill */}
        <path d="M30 140 L-20 130 L-5 143 L30 148 Z" fill="#1a3a6a" />
        {/* Silver flank shimmer */}
        <path d="M200 115 Q350 105 500 118 Q600 125 650 122"
              stroke="rgba(180,210,240,0.2)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M200 115 Q350 105 500 118 Q600 125 650 122"
              stroke="rgba(220,235,255,0.1)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Tail fin */}
        <path d="M860 136 Q890 105 905 115 L910 130 Q895 138 880 145 Z"
              fill="#152e58" />
        <path d="M860 136 Q890 155 900 148 L890 142 Q880 150 875 144 Z"
              fill="#152e58" />
      </svg>
      {/* Line from boat to marlin */}
      <div style={{
        position:'absolute', left:'68%', top:'44%',
        width: 2, height: 140,
        background: 'linear-gradient(180deg, rgba(200,180,140,0.7) 0%, rgba(200,180,140,0.2) 100%)',
        transform: 'rotate(22deg)',
        transformOrigin: 'top center',
      }} />
      {/* Boat — small, at right edge */}
      <svg style={{position:'absolute', left:'64%', top:'41%'}} width="140" height="44" viewBox="0 0 140 44">
        <path d="M10 26 Q70 36 130 26 L126 20 Q70 30 14 20 Z" fill="#2a1408" />
        <path d="M14 20 Q70 30 126 20 L124 16 Q70 26 16 16 Z" fill="#3a1c0c" />
        <ellipse cx="72" cy="14" rx="6" ry="7" fill="#100804" />
        <circle cx="72" cy="8" r="4.5" fill="#0c0602" />
        <ellipse cx="72" cy="6" rx="8" ry="2" fill="#100804" />
      </svg>
      {/* Surface wake/churn */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position:'absolute', left:`${18 + i*8}%`, top:`${46 + (i%2)*1.5}%`,
          width:`${4+i}%`, height:3,
          background:`rgba(100,160,220,${0.12 - i*0.02})`,
          borderRadius:2,
        }} />
      ))}
    </div>
  );
}

// ─── SCENE 3: Gray Dawn — The Return ────────────────────────────────────────
function Scene3Painting({ progress = 0 }) {
  const zoom = 1 + progress * 0.04;
  return (
    <div style={{
      position: 'absolute', inset: '-8%',
      transform: `scale(${zoom}) translateX(${progress * 12}px)`,
      transformOrigin: 'center',
    }}>
      {/* Pre-dawn sky */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
        background: 'linear-gradient(180deg, #0d0e12 0%, #141620 25%, #1e2230 50%, #2a3040 72%, #363e50 88%, #424c5e 100%)',
      }} />
      {/* Pale horizon glow */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%', height: 40,
        background: 'linear-gradient(180deg, rgba(180,170,160,0.25) 0%, rgba(180,170,160,0) 100%)',
      }} />
      {/* Water */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(180deg, #252830 0%, #181a20 40%, #0c0d12 100%)',
      }} />
      {/* Dock / pier structure */}
      <div style={{
        position: 'absolute', left: '12%', top: '54%', width: '76%', height: 12,
        background: '#1a1610', borderRadius: 2,
      }} />
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} style={{
          position:'absolute', left:`${15 + i * 9.5}%`, top:'54%',
          width: 8, height: '30%',
          background:'#141208',
          borderRadius: '0 0 2px 2px',
        }} />
      ))}
      {/* Boat hull */}
      <svg style={{position:'absolute', left:'20%', top:'52%'}} width="300" height="60" viewBox="0 0 300 60">
        <path d="M10 28 Q150 44 290 28 L284 20 Q150 36 16 20 Z" fill="#1c100a" />
        <path d="M16 20 Q150 36 284 20 L280 14 Q150 30 20 14 Z" fill="#28160c" />
        <path d="M20 15 Q150 31 280 15" stroke="rgba(100,70,40,0.5)" strokeWidth="1.5" fill="none" />
        {/* Santiago figure, barely upright, slumped */}
        <ellipse cx="90" cy="11" rx="5" ry="7" fill="#0c0806" />
        <circle cx="90" cy="5" r="4" fill="#080604" />
        {/* Mast */}
        <line x1="150" y1="14" x2="150" y2="-20" stroke="#1a1008" strokeWidth="3" />
      </svg>
      {/* The skeleton — long white bones alongside boat */}
      <svg style={{position:'absolute', left:'20%', top:'53%'}} width="500" height="40" viewBox="0 0 500 40">
        {/* Spine/backbone */}
        <path d="M10 18 Q120 12 250 14 Q380 16 490 12"
              stroke="rgba(210,200,185,0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Ribs */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <line key={i}
            x1={25 + i * 38} y1="14"
            x2={25 + i * 38 + (i%2===0 ? 8 : -8)} y2={i%2===0 ? 28 : 2}
            stroke={`rgba(200,190,175,${0.4 + (i%3)*0.1})`} strokeWidth="2.5" strokeLinecap="round"
          />
        ))}
        {/* Bill — long spike at head */}
        <line x1="10" y1="18" x2="-55" y2="15" stroke="rgba(210,200,185,0.55)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Tail remnant */}
        <path d="M490 12 Q510 4 515 8 L510 13 Q505 10 495 14 Z" fill="rgba(190,180,165,0.4)" />
      </svg>
      {/* Village silhouette */}
      <svg style={{position:'absolute', right:'5%', top:'30%'}} width="240" height="140" viewBox="0 0 240 140">
        {/* Building blocks */}
        {[
          {x:10,y:60,w:35,h:80},{x:48,y:40,w:30,h:100},{x:80,y:70,w:25,h:70},
          {x:108,y:50,w:40,h:90},{x:152,y:65,w:28,h:75},{x:183,y:45,w:35,h:95},{x:210,y:72,w:30,h:68},
        ].map((b,i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={`rgba(20,18,16,${0.7+i*0.03})`} />
        ))}
        {/* Lit windows */}
        {[[55,55],[60,72],[115,60],[120,78],[190,60],[192,80]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width={6} height={7} fill={`rgba(255,200,100,${0.25+i*0.05})`} rx={1} />
        ))}
      </svg>
      {/* Figures on dock — onlookers */}
      <svg style={{position:'absolute', left:'50%', top:'50%', marginLeft:-30}} width="120" height="60" viewBox="0 0 120 60">
        {[[8,0],[28,0],[52,-4],[72,-2]].map(([x,y],i) => (
          <g key={i}>
            <ellipse cx={x+6} cy={18+y} rx={5} ry={7} fill={`rgba(15,10,8,0.85)`} />
            <circle cx={x+6} cy={10+y} r={4} fill={`rgba(12,8,6,0.85)`} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── CONTENT DATA ───────────────────────────────────────────────────────────
const SCENE_DATA = [
  {
    num: 'I',
    title: 'The 85th Day',
    subtitle: 'Santiago Alone at Sea',
    accent: '#f0a030',
    bg: '#6b1a0a',
    bullets: [
      'Day 85 of no fish — Santiago is called salao, the worst form of unlucky',
      "He's alone because Manolin's parents made the boy leave him",
      'The marlin hits, and Santiago is pulled far out past any help',
    ],
    theme: 'Isolation & Pride — he chooses to go "far out" to prove he still has it',
    Painting: Scene1Painting,
  },
  {
    num: 'II',
    title: 'Three Days at Sea',
    subtitle: 'Santiago and the Marlin',
    accent: '#4aa8e8',
    bg: '#080c20',
    bullets: [
      'The marlin pulls the skiff 40 miles from shore — two nights, three days',
      'Santiago calls the fish "brother" — his first companion since Manolin left',
      'His hands cramp and bleed, but he refuses to let the line go',
    ],
    theme: 'Brotherhood & Dignity — the struggle itself is proof of worth',
    Painting: Scene2Painting,
  },
  {
    num: 'III',
    title: 'The Return',
    subtitle: 'Santiago and the Skeleton',
    accent: '#a8a090',
    bg: '#0d0e12',
    bullets: [
      'Sharks strip the marlin on the long journey home — nothing left but bones',
      'Santiago arrives before dawn, barely able to stand or walk',
      'The village sees only a skeleton — they cannot understand what he endured',
    ],
    theme: 'Defeat That Isn\'t — the struggle proves worth regardless of outcome',
    Painting: Scene3Painting,
  },
];

const COMPARE_PARA = [
  "These three images trace Santiago's arc from isolation, to connection, to a kind of holy defeat.",
  "In the first, he is alone and unlucky, defined by what he lacks — no fish, no boy, no company.",
  "In the second, he is no longer alone: the marlin becomes his brother, his rival, and his proof that he is still a real fisherman. The struggle gives him the dignity the empty sea took away.",
  "The third image inverts the second — the marlin is still with him, but only as bones, and the village that ignored him now sees something they can't understand.",
  "What the three pictures share is Santiago himself: unchanged in spirit across all of them. What separates them is how the sea answers him — with silence, with a worthy opponent, and finally with a cruel joke that Hemingway insists is not a defeat. Together they argue the novel's central claim: meaning comes from the struggle, not the outcome.",
];

Object.assign(window, {
  Scene1Painting, Scene2Painting, Scene3Painting,
  SCENE_DATA, COMPARE_PARA,
});
