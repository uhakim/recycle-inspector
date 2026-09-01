/* ═══════════ 물건 그림 — v1 24종 이식 + 색 보정 (나머지는 5단계에서 제작) ═══════════
   원칙: 그림의 색·형태는 물건의 속성 태그와 일치해야 한다 (색은 미끼 특징!) */

const P = {
  paper: "#e9b95c", can: "#9db4c9", plastic: "#7fc7bd", food: "#d98d63",
  line: "#3c4656", paperLight: "#f7e6c0", white: "#ffffff",
};
const w = (inner) => `<svg viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`;

export const ART = {
  newspaper: w(`
    <rect x="14" y="24" width="72" height="54" rx="4" fill="${P.paperLight}" stroke="${P.line}" stroke-width="3"/>
    <rect x="20" y="31" width="28" height="9" fill="${P.line}"/>
    <rect x="20" y="45" width="60" height="4" fill="#b7ac93"/><rect x="20" y="53" width="60" height="4" fill="#b7ac93"/>
    <rect x="20" y="61" width="42" height="4" fill="#b7ac93"/>
    <rect x="54" y="31" width="26" height="10" fill="#cfe0d6"/>`),
  magazine: w(`
    <rect x="24" y="16" width="52" height="68" rx="4" fill="#f2c14e" stroke="${P.line}" stroke-width="3"/>
    <rect x="31" y="24" width="38" height="8" fill="${P.white}"/>
    <circle cx="50" cy="52" r="13" fill="#ffe08a" stroke="${P.line}" stroke-width="2.5"/>
    <rect x="31" y="70" width="24" height="5" fill="${P.white}"/>`),
  notebook: w(`
    <rect x="26" y="18" width="50" height="64" rx="5" fill="#8fb6e0" stroke="${P.line}" stroke-width="3"/>
    <rect x="34" y="30" width="34" height="4" fill="${P.white}"/><rect x="34" y="40" width="34" height="4" fill="${P.white}"/>
    <rect x="34" y="50" width="22" height="4" fill="${P.white}"/>
    <circle cx="31" cy="26" r="2.6" fill="${P.line}"/><circle cx="31" cy="42" r="2.6" fill="${P.line}"/>
    <circle cx="31" cy="58" r="2.6" fill="${P.line}"/><circle cx="31" cy="74" r="2.6" fill="${P.line}"/>`),
  paperbox: w(`
    <rect x="18" y="34" width="64" height="46" rx="3" fill="${P.paper}" stroke="${P.line}" stroke-width="3"/>
    <path d="M18 34 L34 20 h48 l-16 14 z" fill="#f4cd84" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="44" y="34" width="12" height="46" fill="#d3a145"/>
    <path d="M30 52 h14 M30 60 h10" stroke="${P.line}" stroke-width="3" stroke-linecap="round"/>`),
  paperbag: w(`
    <path d="M26 34 h48 l-4 48 h-40 z" fill="${P.paperLight}" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M38 34 c0-14 24-14 24 0" fill="none" stroke="${P.line}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M40 52 c4 6 16 6 20 0" fill="none" stroke="#c9a25a" stroke-width="3" stroke-linecap="round"/>`),
  cola: w(`
    <rect x="34" y="22" width="32" height="58" rx="8" fill="${P.can}" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="23" rx="16" ry="5" fill="#c6d6e4" stroke="${P.line}" stroke-width="2.5"/>
    <rect x="34" y="40" width="32" height="20" fill="#e3574b"/>
    <text x="50" y="55" text-anchor="middle" font-size="13" font-weight="900" fill="${P.white}">쓱-</text>
    <rect x="46" y="18" width="8" height="4" rx="2" fill="${P.line}"/>`),
  tuna: w(`
    <ellipse cx="50" cy="66" rx="28" ry="11" fill="#8ca3b8" stroke="${P.line}" stroke-width="3"/>
    <rect x="22" y="42" width="56" height="24" fill="${P.can}" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="42" rx="28" ry="11" fill="#c6d6e4" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="42" rx="20" ry="7" fill="none" stroke="${P.line}" stroke-width="2" stroke-dasharray="5 4"/>`),
  pet: w(`
    <path d="M42 30 h16 v8 c8 5 10 10 10 18 v18 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 v-18 c0-8 2-13 10-18 z"
      fill="#bfe8f2" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="40" y="20" width="20" height="10" rx="3" fill="${P.plastic}" stroke="${P.line}" stroke-width="3"/>
    <rect x="34" y="56" width="32" height="14" fill="#8fd6e6"/>
    <path d="M38 42 c3 -4 6 -6 9 -7" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`),
  shampoo: w(`
    <path d="M34 36 c0 -6 4 -10 16 -10 s16 4 16 10 v38 a8 8 0 0 1 -8 8 h-16 a8 8 0 0 1 -8 -8 z"
      fill="#ffd95e" stroke="${P.line}" stroke-width="3"/>
    <rect x="44" y="14" width="12" height="14" rx="2" fill="${P.plastic}" stroke="${P.line}" stroke-width="3"/>
    <rect x="40" y="48" width="20" height="18" rx="4" fill="${P.white}" stroke="${P.line}" stroke-width="2"/>
    <path d="M45 57 h10" stroke="#c9a92e" stroke-width="3" stroke-linecap="round"/>`),
  yogurt: w(`
    <path d="M40 32 h20 l6 14 -4 32 h-24 l-4 -32 z" fill="#fef0d8" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="38" y="24" width="24" height="9" rx="3" fill="#f2b56f" stroke="${P.line}" stroke-width="3"/>
    <path d="M40 56 h20" stroke="#e5c9a0" stroke-width="3"/>`),
  banana: w(`
    <path d="M50 30 c-4 18 -18 34 -30 36 c10 8 24 6 32 -2 c8 8 22 10 32 2 c-12 -2 -26 -18 -30 -36 z"
      fill="#ffd95e" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="46" y="22" width="8" height="10" rx="2" fill="#8a6d3b" stroke="${P.line}" stroke-width="2.5"/>
    <path d="M42 48 c-2 6 -8 12 -12 14 M58 48 c2 6 8 12 12 14" stroke="#d9a93e" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  applecore: w(`
    <path d="M36 32 c6 8 6 10 4 18 c-2 8 -2 12 0 18 c2 6 8 10 10 10 s8 -4 10 -10 c2 -6 2 -10 0 -18 c-2 -8 -2 -10 4 -18
      c-6 -6 -10 -6 -14 -2 c-4 -4 -8 -4 -14 2 z" fill="#f0e3cf" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 30 c0 -6 2 -10 7 -12" stroke="#6c5535" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M57 20 c6 -2 9 2 8 6 c-5 2 -8 -1 -8 -6 z" fill="#8fc177" stroke="${P.line}" stroke-width="2.5"/>
    <circle cx="46" cy="52" r="2" fill="#6c5535"/><circle cx="54" cy="60" r="2" fill="#6c5535"/>`),
  flyer: w(`
    <rect x="20" y="18" width="60" height="64" rx="3" fill="#ffe9a8" stroke="${P.line}" stroke-width="3"/>
    <rect x="27" y="26" width="46" height="12" fill="#e3574b"/>
    <text x="50" y="36" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">SALE</text>
    <rect x="27" y="46" width="46" height="4" fill="#c9a25a"/><rect x="27" y="54" width="46" height="4" fill="#c9a25a"/>
    <rect x="27" y="62" width="30" height="4" fill="#c9a25a"/>`),
  calendar: w(`
    <rect x="22" y="24" width="56" height="58" rx="5" fill="${P.white}" stroke="${P.line}" stroke-width="3"/>
    <rect x="22" y="24" width="56" height="16" rx="5" fill="#8d99a8"/>
    <circle cx="36" cy="24" r="3" fill="${P.line}"/><circle cx="64" cy="24" r="3" fill="${P.line}"/>
    <text x="50" y="68" text-anchor="middle" font-size="24" font-weight="900" fill="${P.line}">31</text>`),
  hamcan: w(`
    <rect x="24" y="34" width="52" height="40" rx="9" fill="#9db4c9" stroke="${P.line}" stroke-width="3"/>
    <rect x="30" y="44" width="40" height="20" rx="4" fill="#7ba7d4"/>
    <text x="50" y="58" text-anchor="middle" font-size="11" font-weight="900" fill="${P.white}">HAM</text>
    <ellipse cx="50" cy="34" rx="26" ry="8" fill="#c6d6e4" stroke="${P.line}" stroke-width="3"/>`),
  detergent: w(`
    <path d="M36 34 h28 a6 6 0 0 1 6 6 v36 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 v-36 a6 6 0 0 1 6 -6 z"
      fill="#a8d8ea" stroke="${P.line}" stroke-width="3"/>
    <rect x="40" y="20" width="14" height="14" rx="3" fill="#5f9ec7" stroke="${P.line}" stroke-width="3"/>
    <path d="M64 24 l10 6 v8 l-10 -4 z" fill="#5f9ec7" stroke="${P.line}" stroke-width="2.5"/>
    <circle cx="50" cy="58" r="10" fill="${P.white}" stroke="${P.line}" stroke-width="2"/>
    <path d="M46 58 q4 -6 8 0 q-4 6 -8 0" fill="#7fc7bd"/>`),
  straw: w(`
    <path d="M42 84 l8 -40 l16 -20" fill="none" stroke="#f2789f" stroke-width="10" stroke-linecap="round"/>
    <path d="M42 84 l8 -40 l16 -20" fill="none" stroke="#ffb3c9" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 44 l3 0" stroke="${P.line}" stroke-width="2"/>`),
  block: w(`
    <rect x="24" y="42" width="52" height="34" rx="5" fill="#e3574b" stroke="${P.line}" stroke-width="3"/>
    <circle cx="38" cy="42" r="8" fill="#ef8177" stroke="${P.line}" stroke-width="3"/>
    <circle cx="62" cy="42" r="8" fill="#ef8177" stroke="${P.line}" stroke-width="3"/>`),
  watermelon: w(`
    <path d="M18 58 a32 32 0 0 0 64 0 z" fill="#8fc177" stroke="${P.line}" stroke-width="3"/>
    <path d="M24 58 a26 26 0 0 0 52 0 z" fill="#fdf6e3"/>
    <path d="M30 58 a20 20 0 0 0 40 0 z" fill="#ef8177"/>
    <circle cx="44" cy="66" r="2" fill="${P.line}"/><circle cx="56" cy="68" r="2" fill="${P.line}"/>`),
  tangerine: w(`
    <path d="M50 34 c-14 0 -24 10 -24 22 c0 10 6 16 10 14 c4 -2 2 -8 8 -8 s6 6 12 6 s6 -6 10 -6 c4 0 8 -8 4 -14 c-4 -8 -12 -14 -20 -14 z"
      fill="#f2b04e" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="52" r="1.8" fill="#c97b2e"/><circle cx="52" cy="48" r="1.8" fill="#c97b2e"/>
    <circle cx="60" cy="56" r="1.8" fill="#c97b2e"/>
    <path d="M48 34 c0 -4 2 -6 6 -7" stroke="#6c8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  receipt: w(`
    <path d="M30 16 h40 v62 l-6 -5 -7 5 -7 -5 -7 5 -7 -5 -6 5 z" fill="${P.white}" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="37" y="26" width="26" height="5" fill="${P.line}"/>
    <rect x="37" y="38" width="26" height="3" fill="#b9b2a2"/><rect x="37" y="45" width="26" height="3" fill="#b9b2a2"/>
    <rect x="37" y="52" width="18" height="3" fill="#b9b2a2"/>
    <rect x="37" y="61" width="26" height="4" fill="${P.line}"/>`),
  pizzabox: w(`
    <rect x="16" y="36" width="68" height="42" rx="4" fill="#e8c98a" stroke="${P.line}" stroke-width="3"/>
    <path d="M16 36 l10 -12 h48 l10 12 z" fill="#f4dda4" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="58" r="8" fill="#c9a25a" opacity="0.75"/>
    <circle cx="60" cy="64" r="6" fill="#c9a25a" opacity="0.65"/>
    <circle cx="66" cy="50" r="4" fill="#c9a25a" opacity="0.6"/>
    <text x="50" y="33" text-anchor="middle" font-size="9" font-weight="900" fill="#8a6b2f">PIZZA</text>`),
  cupramen: w(`
    <path d="M30 40 h40 l-5 38 a6 6 0 0 1 -6 5 h-18 a6 6 0 0 1 -6 -5 z" fill="#f0e3cf" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="40" rx="20" ry="7" fill="#d98d63" stroke="${P.line}" stroke-width="3"/>
    <path d="M38 40 c2 3 6 4 12 4 s10 -1 12 -4" fill="none" stroke="#b96a3e" stroke-width="2"/>
    <path d="M44 26 c0 -5 4 -5 4 -9 M56 28 c0 -5 4 -5 4 -9" stroke="#b9b2a2" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  eggshell: w(`
    <path d="M32 52 c0 -18 8 -30 18 -30 s18 12 18 30 l-5 4 -6 -5 -7 5 -7 -5 -6 5 z"
      fill="#fdf3df" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M36 66 l5 -4 6 5 7 -5 7 5 5 -4 c-1 8 -8 16 -15 16 s-14 -6 -15 -13 z"
      fill="#fbe8c5" stroke="${P.line}" stroke-width="3" stroke-linejoin="round" transform="translate(0,4)"/>
    <circle cx="46" cy="42" r="1.6" fill="#d9c9a8"/><circle cx="56" cy="38" r="1.6" fill="#d9c9a8"/>`),
};


/* ═══ 5단계: 나머지 76종 ═══ */

// 공용 부품
const metal = "#9db4c9", metalHi = "#c6d6e4", ln = P.line;
const gleam = `<path d="M38 30 c-2 8 -2 30 0 44" stroke="${P.white}" stroke-width="3" opacity="0.7" fill="none" stroke-linecap="round"/>`;
const canBody = (band, label = "") => w(`
  <rect x="34" y="22" width="32" height="58" rx="8" fill="${metal}" stroke="${ln}" stroke-width="3"/>
  <ellipse cx="50" cy="23" rx="16" ry="5" fill="${metalHi}" stroke="${ln}" stroke-width="2.5"/>
  <rect x="34" y="40" width="32" height="20" fill="${band}"/>
  ${label ? `<text x="50" y="55" text-anchor="middle" font-size="11" font-weight="900" fill="${P.white}">${label}</text>` : ""}
  ${gleam}`);
const book = (cover, emblem = "") => w(`
  <rect x="26" y="16" width="50" height="68" rx="4" fill="${cover}" stroke="${ln}" stroke-width="3"/>
  <rect x="26" y="16" width="9" height="68" rx="4" fill="rgba(0,0,0,0.18)"/>
  <rect x="42" y="26" width="26" height="7" fill="${P.white}"/>
  ${emblem}`);
const sheet = (bg, deco = "") => w(`
  <rect x="22" y="18" width="56" height="64" rx="3" fill="${bg}" stroke="${ln}" stroke-width="3"/>
  <rect x="29" y="28" width="42" height="4" fill="#b7ac93"/><rect x="29" y="37" width="42" height="4" fill="#b7ac93"/>
  <rect x="29" y="46" width="28" height="4" fill="#b7ac93"/>
  ${deco}`);
const bottle = (fill, cap, clear = false) => w(`
  <path d="M42 30 h16 v8 c7 5 9 10 9 17 v19 a8 8 0 0 1 -8 8 h-18 a8 8 0 0 1 -8 -8 v-19 c0-7 2-12 9-17 z"
    fill="${fill}" ${clear ? 'opacity="0.75"' : ""} stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="40" y="20" width="20" height="10" rx="3" fill="${cap}" stroke="${ln}" stroke-width="3"/>
  <path d="M40 44 c2 -4 4 -6 7 -8" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`);

Object.assign(ART, {
  /* ── 종이 15 ── */
  envelope: w(`
    <rect x="18" y="30" width="64" height="42" rx="4" fill="${P.paperLight}" stroke="${ln}" stroke-width="3"/>
    <path d="M18 32 L50 54 L82 32" fill="none" stroke="${ln}" stroke-width="3"/>
    <rect x="26" y="60" width="24" height="4" fill="#b7ac93"/>`),
  storybook: book("#8fc177", `<circle cx="54" cy="54" r="11" fill="#ffe08a" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="50" cy="52" r="1.8" fill="${ln}"/><circle cx="58" cy="52" r="1.8" fill="${ln}"/>
    <path d="M51 57 q3 3 6 0" stroke="${ln}" stroke-width="2" fill="none"/>`),
  sketchbook: w(`
    <rect x="24" y="20" width="52" height="62" rx="4" fill="${P.paperLight}" stroke="${ln}" stroke-width="3"/>
    <path d="M24 28 h52" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="34" cy="24" r="2.4" fill="${ln}"/><circle cx="50" cy="24" r="2.4" fill="${ln}"/><circle cx="66" cy="24" r="2.4" fill="${ln}"/>
    <path d="M36 52 l10 -14 l8 11 l6 -8 l8 13 z" fill="#8fc177" stroke="${ln}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="34" y="68" width="24" height="4" fill="#b7ac93"/>`),
  tissuebox: w(`
    <rect x="16" y="36" width="68" height="40" rx="6" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="17" ry="6" fill="${ln}" opacity="0.85"/>
    <path d="M44 42 c2 -8 10 -10 12 -2 l-2 4 z" fill="${P.white}" stroke="${ln}" stroke-width="2"/>
    <rect x="24" y="60" width="28" height="5" fill="rgba(255,255,255,0.7)"/>`),
  papercore: w(`
    <rect x="38" y="20" width="24" height="62" rx="6" fill="#d9c6a0" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="21" rx="12" ry="5" fill="#efe2c4" stroke="${ln}" stroke-width="2.5"/>
    <ellipse cx="50" cy="21" rx="6" ry="2.6" fill="#a08c62"/>
    <path d="M40 34 c6 3 14 3 20 0 M40 52 c6 3 14 3 20 0 M40 70 c6 3 14 3 20 0" stroke="#b9a276" stroke-width="2.5" fill="none"/>`),
  dictionary: book("#6b7686", `<rect x="42" y="44" width="26" height="5" fill="${P.white}"/>
    <rect x="42" y="54" width="26" height="5" fill="${P.white}"/>
    <text x="55" y="76" text-anchor="middle" font-size="10" font-weight="900" fill="${P.white}">사전</text>`),
  shoebox: w(`
    <rect x="16" y="42" width="68" height="36" rx="4" fill="${P.paper}" stroke="${ln}" stroke-width="3"/>
    <rect x="12" y="30" width="76" height="16" rx="4" fill="#ffd95e" stroke="${ln}" stroke-width="3"/>
    <rect x="30" y="54" width="26" height="5" fill="#c9a25a"/>
    <path d="M62 54 l10 10 M72 54 l-10 10" stroke="#c9a25a" stroke-width="3" stroke-linecap="round"/>`),
  comicbook: w(`
    <rect x="24" y="16" width="52" height="68" rx="4" fill="#f2a25c" stroke="${ln}" stroke-width="3"/>
    <rect x="30" y="24" width="40" height="10" fill="${ln}"/>
    <circle cx="44" cy="54" r="10" fill="#ffe08a" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="41" cy="52" r="1.6" fill="${ln}"/><circle cx="47" cy="52" r="1.6" fill="${ln}"/>
    <path d="M42 58 q2 2 4 0" stroke="${ln}" stroke-width="2" fill="none"/>
    <path d="M60 46 l8 -6 v12 z" fill="${P.white}" stroke="${ln}" stroke-width="2"/>
    <rect x="30" y="70" width="26" height="4" fill="${P.white}"/>`),
  testpaper: sheet(P.white, `<text x="66" y="34" text-anchor="middle" font-size="16" font-weight="900" fill="#e3574b">100</text>
    <path d="M60 40 a7 7 0 1 1 0.1 0" fill="none" stroke="#e3574b" stroke-width="2.5"/>`),
  shoppingbag: w(`
    <path d="M26 38 h48 l-4 44 h-40 z" fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M38 38 c0-12 24-12 24 0" fill="none" stroke="${ln}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="38" y="54" width="24" height="6" fill="${P.white}"/>
    <rect x="38" y="64" width="16" height="4" fill="rgba(255,255,255,0.7)"/>`),
  eggcarton: w(`
    <path d="M16 46 h68 v22 a6 6 0 0 1 -6 6 h-56 a6 6 0 0 1 -6 -6 z" fill="#d9c6a0" stroke="${ln}" stroke-width="3"/>
    <path d="M22 46 a8 8 0 0 1 14 0 a8 8 0 0 1 14 0 a8 8 0 0 1 14 0 a8 8 0 0 1 14 0" fill="none" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="29" cy="58" rx="6" ry="4" fill="#c4ae83"/><ellipse cx="50" cy="58" rx="6" ry="4" fill="#c4ae83"/>
    <ellipse cx="71" cy="58" rx="6" ry="4" fill="#c4ae83"/>`),
  wrapping: w(`
    <rect x="20" y="24" width="60" height="56" rx="4" fill="#ffe9a8" stroke="${ln}" stroke-width="3" transform="rotate(-4 50 52)"/>
    <circle cx="38" cy="42" r="6" fill="#f2a25c"/><circle cx="60" cy="38" r="5" fill="#8fc177"/>
    <circle cx="46" cy="62" r="6" fill="#8fc177"/><circle cx="66" cy="58" r="5" fill="#f2a25c"/>
    <path d="M30 70 q6 -4 12 0" stroke="#c9a25a" stroke-width="2.5" fill="none"/>
    <circle cx="64" cy="72" r="4" fill="${P.white}" stroke="${ln}" stroke-width="2"/>
    <circle cx="62.6" cy="71" r="0.9" fill="${ln}"/><circle cx="65.4" cy="71" r="0.9" fill="${ln}"/>`),
  adpaper: sheet("#cfe0f5", `<rect x="29" y="58" width="42" height="12" fill="#5b8fb8"/>
    <text x="50" y="67" text-anchor="middle" font-size="8" font-weight="900" fill="${P.white}">-50%</text>`),
  picturebook: book("#e88f6e", `<circle cx="54" cy="52" r="10" fill="#ffd95e" stroke="${ln}" stroke-width="2.5"/>
    <path d="M50 50 a4 4 0 1 1 8 0" fill="none" stroke="${ln}" stroke-width="2"/>
    <circle cx="52" cy="50" r="1.4" fill="${ln}"/><circle cx="56" cy="50" r="1.4" fill="${ln}"/>
    <path d="M44 70 h20" stroke="${P.white}" stroke-width="4"/>`),
  cardboard: w(`
    <rect x="16" y="34" width="68" height="46" rx="3" fill="#d9b98a" stroke="${ln}" stroke-width="3"/>
    <path d="M16 34 l12 -12 h56 l-12 12" fill="#e8cd9e" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M22 44 h10 M22 52 h7" stroke="${ln}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M30 62 c8 4 32 4 40 0" stroke="#b08c55" stroke-width="2.5" fill="none"/>`),

  /* ── 캔 12 ── */
  cider: canBody("#5b8fb8", "쉭-"),
  cannedfood: canBody("#8fc177", "콩"),
  sikhye: canBody("#ffd95e", "식혜"),
  coffeecan: canBody("#a5754f", "커피"),
  grapecan: (() => w(`
    <rect x="34" y="22" width="32" height="58" rx="8" fill="${metal}" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="23" rx="16" ry="5" fill="${metalHi}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="34" y="38" width="32" height="24" fill="#b48ec9"/>
    <circle cx="50" cy="50" r="7" fill="#ffe08a" stroke="${ln}" stroke-width="2"/>
    <circle cx="47.5" cy="49" r="1.3" fill="${ln}"/><circle cx="52.5" cy="49" r="1.3" fill="${ln}"/>
    <path d="M48 53 q2 2 4 0" stroke="${ln}" stroke-width="1.8" fill="none"/>
    ${gleam}`))(),
  butane: w(`
    <rect x="36" y="26" width="28" height="54" rx="9" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="27" rx="14" ry="5" fill="${metalHi}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="45" y="16" width="10" height="9" rx="2" fill="${metal}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="36" y="48" width="28" height="12" fill="${P.white}"/>
    <text x="50" y="57" text-anchor="middle" font-size="8" font-weight="900" fill="${ln}">GAS</text>
    ${gleam}`),
  spraycan: w(`
    <rect x="37" y="30" width="26" height="50" rx="8" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <rect x="41" y="18" width="18" height="12" rx="3" fill="${metalHi}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="45" y="12" width="6" height="7" rx="2" fill="${ln}"/>
    <path d="M56 12 q6 -3 9 2 M57 17 q4 -1 7 1" stroke="#9db4c9" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <rect x="37" y="50" width="26" height="10" fill="${P.white}"/>
    ${gleam}`),
  tinbox: w(`
    <rect x="18" y="34" width="64" height="42" rx="8" fill="${metal}" stroke="${ln}" stroke-width="3"/>
    <rect x="18" y="34" width="64" height="12" rx="6" fill="${metalHi}" stroke="${ln}" stroke-width="3"/>
    <circle cx="50" cy="60" r="9" fill="#ffe08a" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="47" cy="58" r="1.5" fill="${ln}"/><circle cx="53" cy="58" r="1.5" fill="${ln}"/>
    <path d="M47 63 q3 3 6 0" stroke="${ln}" stroke-width="2" fill="none"/>`),
  condmilk: canBody("#ffd95e", "연유"),
  canlid: w(`
    <ellipse cx="50" cy="52" rx="30" ry="22" fill="${metalHi}" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="52" rx="22" ry="15" fill="none" stroke="${ln}" stroke-width="2" stroke-dasharray="5 4"/>
    <rect x="44" y="44" width="12" height="7" rx="3.5" fill="none" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="50" cy="57" r="3" fill="${ln}"/>`),
  oilcan: w(`
    <rect x="36" y="28" width="28" height="52" rx="6" fill="#ffd95e" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="29" rx="14" ry="4.5" fill="${metalHi}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="45" y="18" width="10" height="10" rx="2" fill="${metal}" stroke="${ln}" stroke-width="2.5"/>
    <rect x="36" y="46" width="28" height="14" fill="#a5754f"/>
    <text x="50" y="56" text-anchor="middle" font-size="8" font-weight="900" fill="${P.white}">참기름</text>
    ${gleam}`),
  candytin: w(`
    <rect x="20" y="38" width="60" height="38" rx="9" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <rect x="20" y="38" width="60" height="11" rx="5" fill="${metalHi}" stroke="${ln}" stroke-width="3"/>
    <circle cx="38" cy="60" r="5" fill="#ffe08a"/><circle cx="52" cy="63" r="4" fill="${P.white}"/>
    <circle cx="63" cy="58" r="4.5" fill="#8fc177"/>`),

  /* ── 플라스틱 19 ── */
  waterbottle: bottle("#bfe8f2", "#5b8fb8", true),
  pcup: w(`
    <path d="M32 28 h36 l-5 50 a6 6 0 0 1 -6 5 h-14 a6 6 0 0 1 -6 -5 z" fill="#dff2f7" opacity="0.85" stroke="${ln}" stroke-width="3"/>
    <path d="M34 42 h32 M36 58 h28" stroke="#9fcfdd" stroke-width="2.5"/>
    <path d="M40 34 c-1 10 -1 28 0 40" stroke="${P.white}" stroke-width="3" opacity="0.8" fill="none"/>`),
  yoplait: w(`
    <path d="M34 36 h32 l-4 38 a6 6 0 0 1 -6 6 h-12 a6 6 0 0 1 -6 -6 z" fill="#fef0d8" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="36" rx="18" ry="6" fill="#f2b56f" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="36" rx="11" ry="3.4" fill="#fbe0bd"/>
    <circle cx="50" cy="60" r="7" fill="#ffe08a" stroke="${ln}" stroke-width="2"/>
    <circle cx="47.6" cy="59" r="1.2" fill="${ln}"/><circle cx="52.4" cy="59" r="1.2" fill="${ln}"/>
    <path d="M48 63 q2 2 4 0" stroke="${ln}" stroke-width="1.7" fill="none"/>`),
  toycar: w(`
    <path d="M22 58 c0 -8 6 -12 14 -12 l6 -10 h16 l6 10 c8 0 14 4 14 12 v8 h-56 z" fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="46" y="42" width="12" height="10" fill="#bfe8f2" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="34" cy="68" r="7" fill="${ln}"/><circle cx="66" cy="68" r="7" fill="${ln}"/>
    <circle cx="34" cy="68" r="2.6" fill="${P.white}"/><circle cx="66" cy="68" r="2.6" fill="${P.white}"/>
    <circle cx="30" cy="52" r="1.6" fill="${ln}"/><circle cx="38" cy="52" r="1.6" fill="${ln}"/>
    <path d="M31 56 q3 2 6 0" stroke="${ln}" stroke-width="1.8" fill="none"/>`),
  ketchup: w(`
    <path d="M38 34 h24 v42 a8 8 0 0 1 -8 8 h-8 a8 8 0 0 1 -8 -8 z" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <path d="M38 40 c8 6 16 6 24 0" stroke="#b8433a" stroke-width="2.5" fill="none"/>
    <rect x="43" y="22" width="14" height="12" rx="3" fill="#b8433a" stroke="${ln}" stroke-width="3"/>
    <rect x="42" y="52" width="16" height="14" rx="3" fill="${P.white}"/>
    <text x="50" y="62" text-anchor="middle" font-size="7.5" font-weight="900" fill="#b8433a">케첩</text>`),
  icecream: w(`
    <path d="M28 40 h44 l-4 34 a6 6 0 0 1 -6 6 h-24 a6 6 0 0 1 -6 -6 z" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="40" rx="24" ry="8" fill="#a8cbe8" stroke="${ln}" stroke-width="3"/>
    <circle cx="50" cy="60" r="8" fill="#fef0d8" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="47" cy="58" r="1.4" fill="${ln}"/><circle cx="53" cy="58" r="1.4" fill="${ln}"/>
    <path d="M47 63 q3 2.5 6 0" stroke="${ln}" stroke-width="1.8" fill="none"/>`),
  watergun: w(`
    <path d="M20 46 h34 v-8 c10 -4 22 -2 26 4 c4 6 0 14 -8 16 l-4 14 h-12 l2 -12 h-14 l-6 10 h-12 l6 -14 c-8 -2 -12 -6 -12 -10 z"
      fill="#7ba7d4" stroke="${ln}" stroke-width="3" stroke-linejoin="round" transform="translate(0,4)"/>
    <rect x="12" y="46" width="10" height="7" rx="3" fill="#f2c14e" stroke="${ln}" stroke-width="2.5" transform="translate(0,4)"/>
    <circle cx="60" cy="52" r="5" fill="#ffe08a" stroke="${ln}" stroke-width="2"/>`),
  saladbox: w(`
    <path d="M22 44 h56 l-6 28 h-44 z" fill="#dff2f7" opacity="0.8" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M18 38 h64 l-4 8 h-56 z" fill="#eef8fb" opacity="0.9" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M34 56 q6 -8 12 0 q6 -8 12 0" stroke="#8fc177" stroke-width="3" fill="none"/>`),
  juicebottle: w(`
    <path d="M42 30 h16 v8 c7 5 9 10 9 17 v19 a8 8 0 0 1 -8 8 h-18 a8 8 0 0 1 -8 -8 v-19 c0-7 2-12 9-17 z"
      fill="#ffd95e" opacity="0.85" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="40" y="20" width="20" height="10" rx="3" fill="#f2a25c" stroke="${ln}" stroke-width="3"/>
    <rect x="38" y="52" width="24" height="14" rx="3" fill="${P.white}"/>
    <text x="50" y="62" text-anchor="middle" font-size="8" font-weight="900" fill="#c98a2e">주스</text>`),
  mayo: w(`
    <path d="M36 34 c0 -6 6 -9 14 -9 s14 3 14 9 v40 a8 8 0 0 1 -8 8 h-12 a8 8 0 0 1 -8 -8 z" fill="#fef0d8" stroke="${ln}" stroke-width="3"/>
    <rect x="42" y="16" width="16" height="11" rx="3" fill="#ffd95e" stroke="${ln}" stroke-width="3"/>
    <rect x="40" y="48" width="20" height="16" rx="3" fill="#ffd95e"/>
    <text x="50" y="59" text-anchor="middle" font-size="7.5" font-weight="900" fill="${ln}">마요</text>`),
  scoop: w(`
    <path d="M22 44 a28 20 0 0 0 56 0 z" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="28" ry="9" fill="#ef8177" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="20" ry="5.5" fill="#b8433a"/>
    <rect x="72" y="28" width="10" height="22" rx="4" fill="#e3574b" stroke="${ln}" stroke-width="3" transform="rotate(28 77 39)"/>`),
  petcap: w(`
    <rect x="30" y="38" width="40" height="26" rx="6" fill="#5b8fb8" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="38" rx="20" ry="6" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <path d="M34 58 v6 M42 60 v6 M50 61 v6 M58 60 v6 M66 58 v6" stroke="${ln}" stroke-width="2.5"/>`),
  pencilcase: w(`
    <rect x="18" y="38" width="64" height="30" rx="8" fill="#8fc177" stroke="${ln}" stroke-width="3"/>
    <rect x="18" y="38" width="64" height="10" rx="5" fill="#a9d49a" stroke="${ln}" stroke-width="3"/>
    <rect x="60" y="48" width="14" height="5" rx="2.5" fill="${ln}" opacity="0.7"/>
    <circle cx="36" cy="57" r="6" fill="#ffe08a" stroke="${ln}" stroke-width="2"/>
    <circle cx="34" cy="56" r="1.2" fill="${ln}"/><circle cx="38" cy="56" r="1.2" fill="${ln}"/>
    <path d="M34.5 59.5 q1.5 1.5 3 0" stroke="${ln}" stroke-width="1.6" fill="none"/>`),
  basin: w(`
    <path d="M18 44 a32 24 0 0 0 64 0 z" fill="#5b8fb8" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="32" ry="10" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="44" rx="24" ry="6.5" fill="#4a7aa8"/>
    <path d="M34 60 c-1 4 -1 8 2 12" stroke="${P.white}" stroke-width="3" opacity="0.7" fill="none" stroke-linecap="round"/>`),
  laundrybox: w(`
    <path d="M22 36 h56 l-6 42 h-44 z" fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M28 44 h44 M30 54 h40 M31 64 h38" stroke="#b8433a" stroke-width="2.5" stroke-dasharray="6 4"/>
    <path d="M30 36 a6 6 0 0 1 0 -10 h8 M62 26 h8 a6 6 0 0 1 0 10" fill="none" stroke="${ln}" stroke-width="3"/>`),
  jellycup: w(`
    <path d="M28 44 h44 l-5 26 h-34 z" fill="#dff2f7" opacity="0.8" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 38 h52 l-3 6 h-46 z" fill="#eef8fb" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="58" r="7" fill="#ef8177"/>
    <circle cx="47.5" cy="56.5" r="1.2" fill="${ln}"/><circle cx="52.5" cy="56.5" r="1.2" fill="${ln}"/>
    <path d="M48 60 q2 2 4 0" stroke="${ln}" stroke-width="1.6" fill="none"/>`),
  spoon: w(`
    <ellipse cx="50" cy="30" rx="13" ry="16" fill="#fef0d8" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="28" rx="7" ry="9" fill="#e8d7b4"/>
    <rect x="46" y="44" width="8" height="40" rx="4" fill="#fef0d8" stroke="${ln}" stroke-width="3"/>`),
  figure: w(`
    <circle cx="50" cy="34" r="14" fill="#f8dcb8" stroke="${ln}" stroke-width="3"/>
    <path d="M38 28 c2 -8 22 -8 24 0 l-2 4 h-20 z" fill="#e3574b" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="45" cy="34" r="1.8" fill="${ln}"/><circle cx="55" cy="34" r="1.8" fill="${ln}"/>
    <path d="M46 40 q4 3 8 0" stroke="${ln}" stroke-width="2" fill="none"/>
    <path d="M38 82 v-18 c0 -10 4 -14 12 -14 s12 4 12 14 v18 z" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <rect x="30" y="52" width="8" height="18" rx="4" fill="#f8dcb8" stroke="${ln}" stroke-width="2.5"/>
    <rect x="62" y="52" width="8" height="18" rx="4" fill="#f8dcb8" stroke="${ln}" stroke-width="2.5"/>`),
  togocup: w(`
    <path d="M32 30 h36 l-5 48 a6 6 0 0 1 -6 5 h-14 a6 6 0 0 1 -6 -5 z" fill="#dff2f7" opacity="0.8" stroke="${ln}" stroke-width="3"/>
    <path d="M30 24 h40 l-2 8 h-36 z" fill="#eef8fb" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="47" y="8" width="6" height="18" rx="3" fill="#8fc177" stroke="${ln}" stroke-width="2.5"/>
    <rect x="38" y="48" width="24" height="12" rx="3" fill="${P.white}"/>
    <text x="50" y="57" text-anchor="middle" font-size="7" font-weight="900" fill="#5b8fb8">ICE</text>`),

  /* ── 음식 14 ── */
  lettuce: w(`
    <path d="M24 60 c-4 -18 8 -30 26 -30 s30 12 26 30 c-2 -3 -6 -4 -8 -2 c0 -8 -6 -13 -12 -12 c-2 -5 -10 -5 -12 0 c-6 -1 -12 4 -12 12 c-2 -2 -6 -1 -8 2 z"
      fill="#8fc177" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M36 60 c0 6 4 12 14 12 s14 -6 14 -12" fill="#a9d49a" stroke="${ln}" stroke-width="3"/>
    <path d="M50 42 v18 M42 48 l8 12 M58 48 l-8 12" stroke="#6c8f4f" stroke-width="2.5" fill="none"/>
    <path d="M30 74 q3 4 0 8 M38 76 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  rice: w(`
    <path d="M26 56 a24 16 0 0 0 48 0 z" fill="#d9c6a0" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="56" rx="24" ry="7" fill="#efe2c4" stroke="${ln}" stroke-width="3"/>
    <path d="M38 50 a12 8 0 0 1 24 0" fill="#fdf6e3" stroke="${ln}" stroke-width="3"/>
    <circle cx="44" cy="46" r="1.5" fill="${P.white}"/><circle cx="52" cy="44" r="1.5" fill="${P.white}"/><circle cx="58" cy="47" r="1.5" fill="${P.white}"/>
    <path d="M46 30 c0 -4 3 -4 3 -8 M56 32 c0 -4 3 -4 3 -8" stroke="#b9b2a2" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  bread: w(`
    <path d="M22 46 c0 -12 10 -18 28 -18 s28 6 28 18 v22 a6 6 0 0 1 -6 6 h-44 a6 6 0 0 1 -6 -6 z" fill="#f2c14e" stroke="${ln}" stroke-width="3"/>
    <path d="M22 52 h56" stroke="#c98a2e" stroke-width="2.5"/>
    <path d="M34 38 q4 -4 8 0 M52 36 q4 -4 8 0" stroke="#c98a2e" stroke-width="2.5" fill="none"/>
    <path d="M40 66 l6 -8 l6 8" fill="none" stroke="#c98a2e" stroke-width="2.5"/>`),
  grapeskin: w(`
    <circle cx="40" cy="44" r="9" fill="#b48ec9" stroke="${ln}" stroke-width="3"/>
    <circle cx="58" cy="42" r="9" fill="#a578c2" stroke="${ln}" stroke-width="3"/>
    <circle cx="49" cy="56" r="9" fill="#b48ec9" stroke="${ln}" stroke-width="3"/>
    <path d="M50 34 c0 -6 3 -9 8 -11" stroke="#6c8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M36 68 q3 4 0 8 M52 70 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M62 56 c4 4 4 10 0 14" stroke="#8a6da6" stroke-width="2.5" fill="none"/>`),
  melon: w(`
    <path d="M18 54 a32 26 0 0 0 64 0 z" fill="#a9d49a" stroke="${ln}" stroke-width="3"/>
    <path d="M24 54 a26 20 0 0 0 52 0 z" fill="#fdf6e3"/>
    <path d="M30 54 a20 14 0 0 0 40 0 z" fill="#cfe89e"/>
    <path d="M30 62 q4 3 8 0 M48 66 q4 3 8 0" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  cabbage: w(`
    <path d="M30 26 c-8 10 -10 34 -4 50 c8 4 40 4 48 0 c6 -16 4 -40 -4 -50 c-6 8 -10 8 -12 2 c-4 6 -12 6 -14 0 c-4 6 -10 6 -14 -2 z"
      fill="#cfe89e" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 32 v40 M38 40 c2 12 2 24 0 32 M62 40 c-2 12 -2 24 0 32" stroke="#8fc177" stroke-width="2.5" fill="none"/>
    <path d="M28 80 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  kimchi: w(`
    <path d="M28 34 c-6 12 -6 30 0 42 c6 4 38 4 44 0 c6 -12 6 -30 0 -42 c-6 6 -10 6 -13 1 c-4 5 -14 5 -18 0 c-3 5 -8 5 -13 -1 z"
      fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 42 c-2 10 -2 20 0 28 M52 40 c-2 10 -2 22 0 30 M62 44 c-1 8 -1 16 0 24" stroke="#b8433a" stroke-width="2.5" fill="none"/>
    <circle cx="46" cy="52" r="1.5" fill="#8a2820"/><circle cx="56" cy="60" r="1.5" fill="#8a2820"/>
    <path d="M30 80 q3 4 0 8" stroke="#e88f6e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  carrot: w(`
    <path d="M40 26 c-8 16 -10 36 -2 52 c4 4 16 4 20 0 c8 -16 6 -36 -2 -52 c-4 -4 -12 -4 -16 0 z"
      fill="#f2a25c" stroke="${ln}" stroke-width="3" stroke-linejoin="round" transform="rotate(14 50 52)"/>
    <path d="M40 40 h16 M40 52 h18 M42 64 h14" stroke="#c97b2e" stroke-width="2.5" transform="rotate(14 50 52)"/>
    <path d="M48 22 c-2 -6 2 -10 6 -12 M54 24 c2 -6 8 -8 12 -6" stroke="#6c8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  chickenmeat: w(`
    <path d="M30 42 c-4 14 2 30 16 34 c14 4 26 -6 26 -18 c0 -14 -10 -24 -22 -24 c-10 0 -17 3 -20 8 z"
      fill="#e8b77a" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M38 50 q6 -6 14 -3 M46 64 q8 -2 12 -8" stroke="#c98a4e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M28 68 q3 4 0 8 M70 64 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  cake: w(`
    <path d="M24 52 h52 v22 a6 6 0 0 1 -6 6 h-40 a6 6 0 0 1 -6 -6 z" fill="#ffd95e" stroke="${ln}" stroke-width="3"/>
    <path d="M24 52 c8 -10 44 -10 52 0" fill="#fef0d8" stroke="${ln}" stroke-width="3"/>
    <path d="M24 60 q6 6 13 0 q6 6 13 0 q6 6 13 0 q6 6 13 0" fill="none" stroke="#f2a25c" stroke-width="3"/>
    <circle cx="50" cy="42" r="5" fill="#e3574b" stroke="${ln}" stroke-width="2.5"/>
    <path d="M50 37 c0 -4 2 -6 4 -7" stroke="#6c8f4f" stroke-width="2.5" fill="none"/>`),
  orangepeel: w(`
    <path d="M50 32 c-14 0 -24 10 -24 22 c0 10 6 16 10 14 c4 -2 2 -8 8 -8 s6 6 12 6 s6 -6 10 -6 c4 0 8 -8 4 -14 c-4 -8 -12 -14 -20 -14 z"
      fill="#f2a25c" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="52" r="1.8" fill="#c97b2e"/><circle cx="52" cy="48" r="1.8" fill="#c97b2e"/><circle cx="60" cy="56" r="1.8" fill="#c97b2e"/>
    <path d="M34 70 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  potatopeel: w(`
    <path d="M28 40 c10 -8 34 -8 44 2 c6 8 2 20 -8 24 c-12 6 -30 4 -38 -6 c-6 -8 -4 -14 2 -20 z"
      fill="#d9b98a" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="52" r="4" fill="#8a6b2f" opacity="0.65"/>
    <circle cx="58" cy="46" r="3" fill="#8a6b2f" opacity="0.6"/>
    <circle cx="52" cy="58" r="3.4" fill="#8a6b2f" opacity="0.6"/>
    <path d="M32 68 q3 4 0 8 M62 66 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  appleskin: w(`
    <path d="M30 36 c-6 10 -4 22 4 28 c-8 2 -8 10 -2 12 c8 2 16 -4 18 -12 c2 8 10 14 18 12 c6 -2 6 -10 -2 -12 c8 -6 10 -18 4 -28 c-6 6 -12 6 -16 0 c-6 8 -18 8 -24 0 z"
      fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M42 44 c-2 6 -2 14 0 20 M58 44 c2 6 2 14 0 20" stroke="#b8433a" stroke-width="2.5" fill="none"/>
    <path d="M34 80 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  pineapple: w(`
    <path d="M30 44 h40 v30 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 z" fill="#f2c14e" stroke="${ln}" stroke-width="3"/>
    <path d="M30 52 l40 14 M30 66 l32 -20 M44 44 l26 22 M30 60 l24 -16" stroke="#c98a2e" stroke-width="2" fill="none"/>
    <path d="M40 44 c-2 -8 2 -14 10 -16 c8 2 12 8 10 16" fill="#8fc177" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>`),

  /* ── 재활용 안 됨 16 ── */
  pringles: w(`
    <rect x="34" y="20" width="32" height="60" rx="7" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="21" rx="16" ry="5.5" fill="#f4f7f9" stroke="${ln}" stroke-width="2.5"/>
    <rect x="34" y="40" width="32" height="18" fill="#fef0d8"/>
    <circle cx="50" cy="49" r="7" fill="#f8dcb8" stroke="${ln}" stroke-width="2"/>
    <path d="M45 47 q2 -3 4 0 M51 47 q2 -3 4 0 M46 52 q4 3 8 0" stroke="${ln}" stroke-width="1.7" fill="none"/>
    <text x="50" y="72" text-anchor="middle" font-size="8" font-weight="900" fill="${P.white}">CHIPS</text>`),
  dirtycup: w(`
    <path d="M32 28 h36 l-5 50 a6 6 0 0 1 -6 5 h-14 a6 6 0 0 1 -6 -5 z" fill="#fdf6e3" stroke="${ln}" stroke-width="3"/>
    <path d="M34 42 h32" stroke="#d8cfc0" stroke-width="2.5"/>
    <circle cx="44" cy="56" r="6" fill="#c9a25a" opacity="0.75"/>
    <circle cx="57" cy="66" r="4.5" fill="#c9a25a" opacity="0.65"/>
    <path d="M52 30 c0 -4 3 -4 3 -8" stroke="#b9b2a2" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  bone: w(`
    <path d="M30 62 l32 -28" stroke="#fdf3df" stroke-width="11" stroke-linecap="round"/>
    <path d="M30 62 l32 -28" stroke="${ln}" stroke-width="14" stroke-linecap="round" opacity="0.15"/>
    <circle cx="26" cy="56" r="7" fill="#fdf3df" stroke="${ln}" stroke-width="3"/>
    <circle cx="33" cy="68" r="7" fill="#fdf3df" stroke="${ln}" stroke-width="3"/>
    <circle cx="60" cy="28" r="7" fill="#fdf3df" stroke="${ln}" stroke-width="3"/>
    <circle cx="68" cy="38" r="7" fill="#fdf3df" stroke="${ln}" stroke-width="3"/>
    <path d="M30 62 l32 -28" stroke="#fdf3df" stroke-width="10" stroke-linecap="round"/>
    <circle cx="48" cy="46" r="4" fill="#c9a25a" opacity="0.7"/>`),
  wetwipe: w(`
    <path d="M24 34 c14 -6 38 -6 52 2 c-2 14 -4 30 -8 40 c-14 6 -28 6 -40 0 c-4 -12 -5 -28 -4 -42 z"
      fill="#eef5f7" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M32 44 c8 4 28 4 36 0 M30 56 c8 4 30 4 38 0 M32 66 c8 4 26 4 34 0" stroke="#c3d4da" stroke-width="2.5" fill="none"/>
    <circle cx="46" cy="52" r="5" fill="#c9a25a" opacity="0.6"/>
    <path d="M26 76 q3 4 0 8 M68 74 q3 4 0 8" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  mirror: w(`
    <circle cx="50" cy="44" r="24" fill="#e88f6e" stroke="${ln}" stroke-width="3"/>
    <circle cx="50" cy="44" r="17" fill="#dff2f7" stroke="${ln}" stroke-width="2.5"/>
    <path d="M42 36 l6 -4 M52 34 l8 6" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="45" y="66" width="10" height="20" rx="4" fill="#e88f6e" stroke="${ln}" stroke-width="3"/>
    <circle cx="62" cy="30" r="4" fill="#ffe08a" stroke="${ln}" stroke-width="2"/>`),
  icepack: w(`
    <rect x="26" y="24" width="48" height="60" rx="9" fill="#7ba7d4" stroke="${ln}" stroke-width="3"/>
    <rect x="26" y="24" width="48" height="12" rx="6" fill="#a8cbe8" stroke="${ln}" stroke-width="3"/>
    <path d="M50 48 v16 M42 52 l16 8 M58 52 l-16 8" stroke="${P.white}" stroke-width="3" stroke-linecap="round"/>
    <path d="M34 70 c4 4 8 4 12 0" stroke="#5b8fb8" stroke-width="2.5" fill="none"/>
    <path d="M78 40 q4 4 0 9" stroke="#79b7d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  seashell: w(`
    <path d="M50 24 c-18 0 -28 14 -26 30 c1 10 8 18 12 16 l4 -10 l6 12 l6 -13 l6 13 l6 -12 l4 10 c4 2 11 -6 12 -16 c2 -16 -8 -30 -26 -30 z"
      fill="#f3cfae" stroke="${ln}" stroke-width="3" stroke-linejoin="round" transform="rotate(180 50 50)"/>
    <path d="M50 76 l0 -36 M38 70 l6 -28 M62 70 l-6 -28" stroke="#d0a679" stroke-width="2.5" fill="none" transform="rotate(180 50 50)"/>`),
  corncob: w(`
    <path d="M40 22 c-8 12 -10 40 -4 56 c3 5 21 5 24 0 c8 -16 6 -44 -4 -56 c-4 -4 -12 -4 -16 0 z" fill="#ffe9a8" stroke="${ln}" stroke-width="3"/>
    <path d="M40 34 h22 M38 46 h26 M38 58 h26 M40 70 h22" stroke="#d9b45f" stroke-width="2"/>
    <path d="M46 26 v52 M56 26 v52" stroke="#d9b45f" stroke-width="2"/>
    <circle cx="44" cy="40" r="1.6" fill="#f2c14e"/><circle cx="58" cy="52" r="1.6" fill="#f2c14e"/>`),
  pen: w(`
    <rect x="44" y="14" width="12" height="52" rx="4" fill="#5b8fb8" stroke="${ln}" stroke-width="3"/>
    <path d="M44 66 h12 l-6 16 z" fill="#a8cbe8" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="84" r="2.4" fill="${ln}"/>
    <rect x="47" y="8" width="6" height="8" rx="2.5" fill="#a8cbe8" stroke="${ln}" stroke-width="2.5"/>
    <rect x="56" y="20" width="4" height="22" rx="2" fill="#a8cbe8"/>`),
  toothbrush: w(`
    <rect x="44" y="30" width="12" height="56" rx="6" fill="#e3574b" stroke="${ln}" stroke-width="3"/>
    <rect x="42" y="12" width="16" height="20" rx="5" fill="#ef8177" stroke="${ln}" stroke-width="3"/>
    <path d="M46 14 v-4 M50 14 v-5 M54 14 v-4" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M46 16 h8 M46 21 h8 M46 26 h8" stroke="${P.white}" stroke-width="2.5"/>`),
  rubberglove: w(`
    <path d="M36 84 v-30 c-6 -4 -10 -12 -8 -20 c1 -5 7 -6 9 -1 l3 8 v-22 c0 -6 8 -6 8 0 v18 l3 -20 c1 -6 9 -5 8 1 l-2 20 l4 -14 c2 -5 9 -3 8 3 l-4 18 c3 -2 7 0 6 5 c-2 10 -8 18 -14 22 v12 z"
      fill="#e3574b" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M36 72 h28" stroke="#b8433a" stroke-width="2.5"/>`),
  cd: w(`
    <circle cx="50" cy="50" r="30" fill="#dfe8ee" stroke="${ln}" stroke-width="3"/>
    <path d="M28 38 a30 30 0 0 1 14 -12 l6 16 z" fill="#bfe8f2"/>
    <path d="M74 58 a30 30 0 0 1 -12 14 l-6 -16 z" fill="#e8d7f2"/>
    <circle cx="50" cy="50" r="9" fill="${P.white}" stroke="${ln}" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="3.4" fill="${ln}"/>
    <path d="M34 32 l6 -4" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round"/>`),
  photo: w(`
    <rect x="24" y="20" width="52" height="62" rx="3" fill="${P.white}" stroke="${ln}" stroke-width="3"/>
    <rect x="29" y="25" width="42" height="42" fill="#bfe8f2"/>
    <circle cx="42" cy="42" r="6" fill="#f8dcb8" stroke="${ln}" stroke-width="2"/>
    <path d="M36 52 c2 -4 10 -4 12 0 v6 h-12 z" fill="#e3574b" stroke="${ln}" stroke-width="2"/>
    <circle cx="62" cy="32" r="4.5" fill="#ffe08a"/>
    <path d="M29 60 l10 -8 l8 6 l10 -9 l14 11 v8 h-42 z" fill="#8fc177" opacity="0.85"/>
    <path d="M60 26 l4 -3" stroke="${P.white}" stroke-width="3" stroke-linecap="round"/>`),
  toothpaste: w(`
    <path d="M26 46 l6 -6 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-40 l-6 -6 c4 -6 4 -14 0 -20 z"
      fill="#7ba7d4" stroke="${ln}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M26 46 c4 6 4 14 0 20" stroke="${ln}" stroke-width="2.5" fill="none"/>
    <rect x="78" y="50" width="8" height="12" rx="2" fill="#a8cbe8" stroke="${ln}" stroke-width="2.5"/>
    <rect x="40" y="50" width="24" height="12" rx="3" fill="${P.white}"/>
    <text x="52" y="59" text-anchor="middle" font-size="7" font-weight="900" fill="#5b8fb8">치약</text>
    <circle cx="36" cy="70" r="4" fill="#c9a25a" opacity="0.7"/>`),
  foilplate: w(`
    <ellipse cx="50" cy="54" rx="32" ry="20" fill="${metalHi}" stroke="${ln}" stroke-width="3"/>
    <ellipse cx="50" cy="52" rx="22" ry="12" fill="#dfe8ee" stroke="${ln}" stroke-width="2.5"/>
    <path d="M24 46 q4 -4 8 -5 M70 42 l4 -3" stroke="${P.white}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <circle cx="46" cy="52" r="4.5" fill="#c9a25a" opacity="0.7"/>
    <circle cx="58" cy="56" r="3.5" fill="#c9a25a" opacity="0.6"/>
    <path d="M30 62 c-2 2 -3 4 -2 7 M66 64 c2 2 2 5 1 7" stroke="#9db4c9" stroke-width="2.5" fill="none"/>`),
  tape: w(`
    <circle cx="50" cy="50" r="28" fill="#dff2f7" opacity="0.8" stroke="${ln}" stroke-width="3"/>
    <circle cx="50" cy="50" r="14" fill="#fffdf4" stroke="${ln}" stroke-width="3"/>
    <path d="M78 46 v12 l14 0 v-8 z" fill="#eef8fb" opacity="0.9" stroke="${ln}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M34 32 l6 -5" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round"/>`),
});
