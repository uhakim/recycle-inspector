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
