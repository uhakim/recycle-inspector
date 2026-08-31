/* ═══════════ v2 자산 — v1에서 이식 (사운드·주민·재활용이) ═══════════ */

const P = { line: "#3c4656", white: "#ffffff" };

/* ── 사운드 (WebAudio 합성 — v1 검증본) ── */
export const Sound = {
  ctx: null,
  ready() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  stamp() {
    const c = this.ready(), t = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(1.0, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.19);
    const o2 = c.createOscillator(), g2 = c.createGain();
    o2.type = "sine"; o2.frequency.setValueAtTime(82, t + 0.008); o2.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    g2.gain.setValueAtTime(0.65, t + 0.008); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o2.connect(g2).connect(c.destination); o2.start(t + 0.008); o2.stop(t + 0.32);
    const buf = c.createBuffer(1, c.sampleRate * 0.07, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const n = c.createBufferSource(), ng = c.createGain(), f = c.createBiquadFilter();
    n.buffer = buf; f.type = "lowpass"; f.frequency.value = 1200;
    ng.gain.setValueAtTime(0.7, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    n.connect(f).connect(ng).connect(c.destination); n.start(t);
    const n2 = c.createBufferSource(), ng2 = c.createGain(), f2 = c.createBiquadFilter();
    n2.buffer = buf; f2.type = "highpass"; f2.frequency.value = 2600;
    ng2.gain.setValueAtTime(0.3, t); ng2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    n2.connect(f2).connect(ng2).connect(c.destination); n2.start(t);
  },
  mumble(baseHz, syllables) {
    const c = this.ready();
    let t = c.currentTime + 0.04;
    for (let i = 0; i < syllables; i++) {
      const dur = 0.05 + Math.random() * 0.055;
      const hz = baseHz * (0.82 + Math.random() * 0.42);
      const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(hz, t);
      o.frequency.exponentialRampToValueAtTime(hz * (0.88 + Math.random() * 0.3), t + dur);
      f.type = "bandpass"; f.frequency.value = hz * 2.6; f.Q.value = 1.6;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.014);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f).connect(g).connect(c.destination);
      o.start(t); o.stop(t + dur + 0.02);
      t += dur + 0.018 + Math.random() * 0.04;
      if (Math.random() < 0.18) t += 0.07;
    }
  },
  robo(syllables) {
    const c = this.ready();
    let t = c.currentTime + 0.02;
    for (let i = 0; i < syllables; i++) {
      const dur = 0.045 + Math.random() * 0.035;
      const o = c.createOscillator(), g = c.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(620 + Math.random() * 420, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination);
      o.start(t); o.stop(t + dur + 0.01);
      t += dur + 0.02 + Math.random() * 0.025;
    }
  },
  dice() {
    const c = this.ready(), t0 = c.currentTime;
    [0, 0.07, 0.13].forEach((dt, i) => {
      const buf = c.createBuffer(1, c.sampleRate * 0.03, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * (1 - j / d.length);
      const n = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter();
      n.buffer = buf; f.type = "bandpass"; f.frequency.value = 2400 - i * 500; f.Q.value = 1.4;
      g.gain.setValueAtTime(0.22, t0 + dt); g.gain.exponentialRampToValueAtTime(0.001, t0 + dt + 0.03);
      n.connect(f).connect(g).connect(c.destination); n.start(t0 + dt);
    });
  },
  learn() {
    const c = this.ready(), t = c.currentTime;
    [[660, 0], [880, 0.09], [1174, 0.18]].forEach(([hz, dt]) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "triangle"; o.frequency.value = hz;
      g.gain.setValueAtTime(0.2, t + dt); g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.25);
      o.connect(g).connect(c.destination); o.start(t + dt); o.stop(t + dt + 0.27);
    });
  },
  good() {
    const c = this.ready(), t = c.currentTime;
    [[523, 0], [784, 0.09]].forEach(([hz, dt]) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "triangle"; o.frequency.value = hz;
      g.gain.setValueAtTime(0.28, t + dt); g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.22);
      o.connect(g).connect(c.destination); o.start(t + dt); o.stop(t + dt + 0.24);
    });
  },
  bad() {
    const c = this.ready(), t = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sawtooth"; o.frequency.setValueAtTime(170, t); o.frequency.linearRampToValueAtTime(120, t + 0.28);
    g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.34);
  },
  paper() {
    const c = this.ready(), t = c.currentTime;
    const buf = c.createBuffer(1, c.sampleRate * 0.12, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.35 * (1 - i / d.length);
    const n = c.createBufferSource(), f = c.createBiquadFilter();
    n.buffer = buf; f.type = "highpass"; f.frequency.value = 1800;
    n.connect(f).connect(c.destination); n.start(t);
  },
};

/* ── 주민 (v1 이식) ── */
function personSvg(skin, hair, shirt, extra = "") {
  return `<svg class="person" viewBox="0 0 120 120" aria-hidden="true">
    <path d="M20 120 c0 -26 18 -38 40 -38 s40 12 40 38 z" fill="${shirt}" stroke="${P.line}" stroke-width="3.5"/>
    <circle cx="60" cy="52" r="26" fill="${skin}" stroke="${P.line}" stroke-width="3.5"/>
    ${hair}
    <circle cx="51" cy="52" r="2.8" fill="${P.line}"/><circle cx="69" cy="52" r="2.8" fill="${P.line}"/>
    <path d="M54 63 q6 5 12 0" stroke="${P.line}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${extra}
  </svg>`;
}

export const PEOPLE = [
  { name: "김 할머니", voice: 300, svg: personSvg("#f6d7b8",
      `<path d="M36 46 a24 24 0 0 1 48 0 v-4 a24 24 0 0 0 -48 0 z" fill="#cfd4dc"/><circle cx="60" cy="26" r="9" fill="#cfd4dc" stroke="${P.line}" stroke-width="3"/>`,
      "#b48ec9",
      `<rect x="40" y="70" width="40" height="4" rx="2" fill="#8f6aa6"/>`),
    lines: ["아이고, 우리 손주가 싸준 거예요~", "이거 버리는 날 맞지요?", "허리야… 빨리 부탁해요~"] },
  { name: "박 아저씨", voice: 145, svg: personSvg("#eec39a",
      `<path d="M34 44 a26 20 0 0 1 52 0 l0 -8 h-52 z" fill="#4a5568"/><rect x="30" y="36" width="60" height="9" rx="4" fill="#5f7085" stroke="${P.line}" stroke-width="3"/>`,
      "#5b8fb8"),
    lines: ["바빠 죽겠네, 빨리 좀 봐줘요!", "이 정도면 되지, 뭐.", "아 하나쯤은 괜찮잖아~"] },
  { name: "민수", voice: 430, svg: personSvg("#f8dcb8",
      `<path d="M36 44 c2 -14 12 -20 24 -20 s22 6 24 20 c-8 -6 -16 -8 -24 -8 s-16 2 -24 8 z" fill="#3f3a36"/>`,
      "#f2c14e",
      `<circle cx="60" cy="96" r="7" fill="#e3574b" stroke="${P.line}" stroke-width="3"/>`),
    lines: ["엄마 심부름 왔어요!", "이거… 맞게 가져온 거죠?", "재활용이 멋있다…"] },
  { name: "정 이모", voice: 330, svg: personSvg("#f3cfae",
      `<path d="M32 52 c-4 -20 10 -30 28 -30 s32 10 28 30 c-2 -4 -6 -6 -8 -4 c2 -10 -6 -18 -20 -18 s-22 8 -20 18 c-2 -2 -6 0 -8 4 z" fill="#a2543c"/>`,
      "#e88f6e"),
    lines: ["가게 정리하고 오는 길이에요~", "오늘 뭐 버리는 날이더라?", "잘 부탁해요~"] },
  { name: "최 사장", voice: 180, svg: personSvg("#e8bd93",
      `<path d="M38 40 a24 16 0 0 1 44 0 v-6 h-44 z" fill="#6b7686"/><path d="M46 70 a14 10 0 0 0 28 0 z" fill="#6b7686"/>`,
      "#4f9e83"),
    lines: ["식당에서 나온 것들이오.", "분리수거는 자신 있소만…", "어험, 문제 없겠지요?"] },
];

/* ── 재활용이 (AI 알바) ── */
export const AI_SVG = `<svg viewBox="0 0 120 130" aria-hidden="true">
  <rect x="30" y="58" width="60" height="52" rx="14" fill="#8fd0dc" stroke="${P.line}" stroke-width="3.5"/>
  <path d="M45 70 l10 8 l-10 8 M75 70 l-10 8 l10 8" fill="none" stroke="#2c6e8f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="14" width="72" height="48" rx="16" fill="#bfe8f0" stroke="${P.line}" stroke-width="3.5"/>
  <circle cx="46" cy="38" r="6" fill="${P.line}"/><circle cx="74" cy="38" r="6" fill="${P.line}"/>
  <path d="M50 50 q10 7 20 0" stroke="${P.line}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <line x1="60" y1="14" x2="60" y2="4" stroke="${P.line}" stroke-width="3.5"/>
  <circle cx="60" cy="3" r="4.5" fill="#ffb648" stroke="${P.line}" stroke-width="2.5"/>
  <rect x="14" y="66" width="12" height="30" rx="6" fill="#8fd0dc" stroke="${P.line}" stroke-width="3"/>
  <rect x="94" y="66" width="12" height="30" rx="6" fill="#8fd0dc" stroke="${P.line}" stroke-width="3"/>
</svg>`;

/* ── 물건 카드 플레이스홀더 (5단계에서 품목별 SVG로 교체) ── */
export const ITEM_PLACEHOLDER = `<svg viewBox="0 0 100 100" aria-hidden="true">
  <path d="M28 30 h44 l-4 52 a8 8 0 0 1 -8 7 h-22 a8 8 0 0 1 -8 -7 z" fill="#e8dcc2" stroke="#b9ab8b" stroke-width="3"/>
  <path d="M38 30 c0-14 24-14 24 0" fill="none" stroke="#b9ab8b" stroke-width="4" stroke-linecap="round"/>
  <text x="50" y="66" text-anchor="middle" font-size="26" fill="#a08c62">?</text>
</svg>`;
