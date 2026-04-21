// music-engine.js
// Web Audio synthesis: ambient soundscapes evoking each musical reference
// Scene 1: Arvo Pärt "Spiegel im Spiegel" — A major, sparse piano + violin pad
// Scene 2: Einaudi "Experience" — A minor, building piano figure + string swell
// Scene 3: Max Richter "On the Nature of Daylight" — D minor, slow string quartet
// Compare: Philip Glass "Metamorphosis" feel — E minor, cycling meditative piano

(function () {
  let ctx = null;
  let masterGain = null;
  let reverbDry = null;
  let reverbWet = null;
  let convolver = null;
  let currentScene = -2;
  let activeOscs = [];
  let scheduledTimers = [];
  let muted = false;

  // ── Init ────────────────────────────────────────────────────────────────
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = ctx.createGain();
    masterGain.gain.value = 0;

    // Reverb chain
    convolver = ctx.createConvolver();
    convolver.buffer = makeImpulse(ctx, 4.5, 2.8);

    reverbDry = ctx.createGain();
    reverbDry.gain.value = 0.28;

    reverbWet = ctx.createGain();
    reverbWet.gain.value = 0.72;

    masterGain.connect(reverbDry);
    masterGain.connect(convolver);
    convolver.connect(reverbWet);
    reverbDry.connect(ctx.destination);
    reverbWet.connect(ctx.destination);
  }

  function makeImpulse(ctx, duration, decay) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * duration);
    const buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const ch = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function freq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  // Piano tone: triangle wave, gentle ADSR
  function piano(f, t0, hold, vol = 0.25) {
    if (!ctx) return;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(vol, t0 + 0.018);
    env.gain.exponentialRampToValueAtTime(vol * 0.65, t0 + 0.22);
    env.gain.setValueAtTime(vol * 0.65, t0 + hold);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + hold + 2.2);

    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 3200;
    filt.Q.value = 0.4;

    env.connect(filt);
    filt.connect(masterGain);

    [1, 2.005].forEach((ratio, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? 'triangle' : 'sine';
      o.frequency.value = f * ratio;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 1 : 0.09;
      o.connect(g);
      g.connect(env);
      o.start(t0);
      o.stop(t0 + hold + 2.5);
      activeOscs.push(o);
    });
  }

  // String pad: detuned saws through heavy LPF, slow attack
  function pad(freqs, t0, dur, vol = 0.12, attackTime = 1.4) {
    if (!ctx) return;
    freqs.forEach(f => {
      [-4, 0, 4].forEach(cents => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f * Math.pow(2, cents / 1200);

        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 700;
        lp.Q.value = 0.8;

        const env = ctx.createGain();
        env.gain.setValueAtTime(0, t0);
        env.gain.linearRampToValueAtTime(vol / 3, t0 + attackTime);
        env.gain.setValueAtTime(vol / 3, t0 + dur - 1.2);
        env.gain.linearRampToValueAtTime(0, t0 + dur + 2.0);

        o.connect(lp);
        lp.connect(env);
        env.connect(masterGain);

        o.start(t0);
        o.stop(t0 + dur + 2.5);
        activeOscs.push(o);
      });
    });
  }

  // ── SCENE 1 — Spiegel im Spiegel (A major, tintinnabuli) ────────────────
  //  Piano: slow ascending A major arpeggios, each note ~3s
  //  Pad: violin-like A3 + E4, barely moving
  function scene1() {
    const now = ctx.currentTime;
    // MIDI: A3=57, E4=64, A4=69, C#5=73, E5=76
    const [A3,E4,A4,Cs5,E5] = [freq(57),freq(64),freq(69),freq(73),freq(76)];

    // Sustained violin-like pad
    pad([A3, E4], now, 38, 0.09, 1.6);

    // Ascending piano arpeggios — each note 3s, lots of space
    const seq = [
      [A3, 0],[E4, 3],[A4, 6],[Cs5, 9],[E5, 12],
      [Cs5,16],[A4,19],[E4,22],[A3,25],
      [E4,28],[A4,31],[Cs5,34],
    ];
    seq.forEach(([f, t]) => piano(f, now + t, 2.8, 0.21));

    // Shift pad slightly at halfway
    timer(() => pad([E4, A4 * 0.999], ctx.currentTime, 20, 0.07, 2), 17000);
  }

  // ── SCENE 2 — Einaudi "Experience" (A minor, building) ──────────────────
  //  Piano: repeating lyrical motif, gets fuller each repetition
  //  Strings: swell in from midpoint
  function scene2() {
    const now = ctx.currentTime;
    const [A3,C4,E4,G4,A4,D4] = [freq(57),freq(60),freq(64),freq(67),freq(69),freq(62)];

    pad([A3, E4], now, 36, 0.07, 2);

    // 8-second repeating motif × 4 reps, volume creeps up
    const motif = [
      [A4,0,1.6],[G4,1.6,1],[E4,2.6,1.6],[D4,4.2,1.2],[E4,5.4,1],[G4,6.4,0.8],
    ];
    for (let rep = 0; rep < 4; rep++) {
      const vol = 0.16 + rep * 0.05;
      motif.forEach(([f, t, d]) => piano(f, now + rep * 8 + t, d, vol));
    }

    // String swell: Am chord fills in from t+18
    timer(() => {
      pad([A3, E4, A4], ctx.currentTime, 20, 0.12, 1.8);
      pad([C4 * 0.5, G4 * 0.5], ctx.currentTime, 18, 0.07, 2.5);
    }, 18000);
  }

  // ── SCENE 3 — Richter "On the Nature of Daylight" (D minor) ─────────────
  //  String quartet feel: slow, melancholic, breathing pad
  //  Piano: wide-spaced lyrical melody over the pad
  function scene3() {
    const now = ctx.currentTime;
    const [D3,A3,F3,C4,D4,A4,F4] = [freq(50),freq(57),freq(53),freq(60),freq(62),freq(69),freq(65)];

    pad([D3, A3, F4], now, 36, 0.10, 2.0);

    // Slow melody — notes breathe
    const mel = [
      [A4,0,4],[F4,4,3],[D4,7,3.5],
      [C4,10.5,4],[D4,14.5,4.5],[A3,19,5],
      [F3*2,24,4],[A3,28,4.5],[D4,32.5,4],
    ];
    mel.forEach(([f, t, d]) => piano(f, now + t, d, 0.19));

    // Second string layer — deeper, enters at t+12
    timer(() => pad([D3 * 0.5, A3 * 0.5], ctx.currentTime, 24, 0.08, 2.5), 12000);
  }

  // ── COMPARE/CONTRAST — Philip Glass "Metamorphosis 2" feel (E minor) ────
  //  Cycling piano over held string pad, meditative and slowly resolving
  function sceneCC() {
    const now = ctx.currentTime;
    const [E3,B3,G4,D4,E4,A3,B4] = [freq(52),freq(59),freq(67),freq(62),freq(64),freq(57),freq(71)];

    pad([E3, B3, G4], now, 40, 0.09, 1.8);

    const mel = [
      [E4,0,3.5],[D4,3.5,3.5],[B3,7,4.5],
      [G4,11.5,3],[E4,14.5,3.5],[D4,18,4],
      [E4,22,3],[B3,25,3.5],[E4,28.5,5],
      [G4,33.5,5.5],
    ];
    mel.forEach(([f, t, d]) => piano(f, now + t, d, 0.20));

    // Gentle resolution swell near end
    timer(() => pad([E3 * 2, B3, G4, D4], ctx.currentTime, 14, 0.10, 1.5), 26000);
  }

  // ── Scheduling ───────────────────────────────────────────────────────────
  function timer(fn, ms) {
    const id = setTimeout(fn, ms);
    scheduledTimers.push(id);
    return id;
  }

  function stopAll() {
    scheduledTimers.forEach(id => clearTimeout(id));
    scheduledTimers = [];
    const fadeOut = ctx ? ctx.currentTime : 0;
    activeOscs.forEach(o => {
      try { o.stop(fadeOut + 1.5); } catch (_) {}
    });
    activeOscs = [];
  }

  const SCENES = [scene1, scene2, scene3, sceneCC];
  const STARTS = [4, 40, 76, 112];
  const ENDS   = [40, 76, 112, 150];

  function getScene(t) {
    for (let i = 0; i < STARTS.length; i++) {
      if (t >= STARTS[i] && t < ENDS[i]) return i;
    }
    return -1;
  }

  // Called from React ~4× per second
  window.MusicEngine = {
    tick(time, playing) {
      if (!ctx || muted) return;
      const scene = getScene(time);
      const vol = (scene >= 0 && playing) ? 0.45 : 0;
      masterGain.gain.setTargetAtTime(vol, ctx.currentTime, 0.9);

      if (scene !== currentScene) {
        stopAll();
        currentScene = scene;
        if (scene >= 0 && playing) {
          timer(() => SCENES[scene](), 200);
        }
      }
    },

    start() {
      if (!ctx) init();
      if (ctx.state === 'suspended') ctx.resume();
    },

    setMuted(val) {
      muted = val;
      if (!ctx) return;
      if (val) {
        stopAll();
        currentScene = -2;
        masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      } else {
        ctx.resume();
      }
    },
  };
})();
