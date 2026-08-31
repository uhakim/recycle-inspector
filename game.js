/* ═══════════ 분리수거 검사관 — 1단계: 검사관 코어 ═══════════ */
"use strict";

/* ---------- 데이터: 재활용품 (인라인 SVG, 통일 팔레트) ---------- */

const P = {
  paper: "#e9b95c", can: "#9db4c9", plastic: "#7fc7bd", food: "#d98d63",
  line: "#3c4656", paperLight: "#f7e6c0", white: "#ffffff",
};

function svgWrap(inner) {
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`;
}

const ITEMS = {
  newspaper: { name: "신문", cat: "paper", feat: ["flat","printed"], svg: svgWrap(`
    <rect x="14" y="24" width="72" height="54" rx="4" fill="${P.paperLight}" stroke="${P.line}" stroke-width="3"/>
    <rect x="20" y="31" width="28" height="9" fill="${P.line}"/>
    <rect x="20" y="45" width="60" height="4" fill="#b7ac93"/><rect x="20" y="53" width="60" height="4" fill="#b7ac93"/>
    <rect x="20" y="61" width="42" height="4" fill="#b7ac93"/>
    <rect x="54" y="31" width="26" height="10" fill="#cfe0d6"/>`) },
  magazine: { name: "잡지", cat: "paper", feat: ["flat","printed"], svg: svgWrap(`
    <rect x="24" y="16" width="52" height="68" rx="4" fill="#f2a25c" stroke="${P.line}" stroke-width="3"/>
    <rect x="31" y="24" width="38" height="8" fill="${P.white}"/>
    <circle cx="50" cy="52" r="13" fill="#ffe08a" stroke="${P.line}" stroke-width="2.5"/>
    <rect x="31" y="70" width="24" height="5" fill="${P.white}"/>`) },
  notebook: { name: "공책", cat: "paper", feat: ["flat","printed"], svg: svgWrap(`
    <rect x="26" y="18" width="50" height="64" rx="5" fill="#8fd0a8" stroke="${P.line}" stroke-width="3"/>
    <rect x="34" y="30" width="34" height="4" fill="${P.white}"/><rect x="34" y="40" width="34" height="4" fill="${P.white}"/>
    <rect x="34" y="50" width="22" height="4" fill="${P.white}"/>
    <circle cx="31" cy="26" r="2.6" fill="${P.line}"/><circle cx="31" cy="42" r="2.6" fill="${P.line}"/>
    <circle cx="31" cy="58" r="2.6" fill="${P.line}"/><circle cx="31" cy="74" r="2.6" fill="${P.line}"/>`) },
  box: { name: "종이 상자", cat: "paper", feat: ["printed"], svg: svgWrap(`
    <rect x="18" y="34" width="64" height="46" rx="3" fill="${P.paper}" stroke="${P.line}" stroke-width="3"/>
    <path d="M18 34 L34 20 h48 l-16 14 z" fill="#f4cd84" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="44" y="34" width="12" height="46" fill="#d3a145"/>
    <path d="M30 52 h14 M30 60 h10" stroke="${P.line}" stroke-width="3" stroke-linecap="round"/>`) },
  paperbag: { name: "종이 봉투", cat: "paper", feat: ["light"], svg: svgWrap(`
    <path d="M26 34 h48 l-4 48 h-40 z" fill="${P.paperLight}" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M38 34 c0-14 24-14 24 0" fill="none" stroke="${P.line}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M40 52 c4 6 16 6 20 0" fill="none" stroke="#c9a25a" stroke-width="3" stroke-linecap="round"/>`) },
  soda: { name: "음료수 캔", cat: "can", feat: ["shiny","container"], svg: svgWrap(`
    <rect x="34" y="22" width="32" height="58" rx="8" fill="${P.can}" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="23" rx="16" ry="5" fill="#c6d6e4" stroke="${P.line}" stroke-width="2.5"/>
    <rect x="34" y="40" width="32" height="20" fill="#e3574b"/>
    <text x="50" y="55" text-anchor="middle" font-size="13" font-weight="900" fill="${P.white}">쓱-</text>
    <rect x="46" y="18" width="8" height="4" rx="2" fill="${P.line}"/>`) },
  tuna: { name: "통조림 캔", cat: "can", feat: ["shiny","container"], svg: svgWrap(`
    <ellipse cx="50" cy="66" rx="28" ry="11" fill="#8ca3b8" stroke="${P.line}" stroke-width="3"/>
    <rect x="22" y="42" width="56" height="24" fill="${P.can}" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="42" rx="28" ry="11" fill="#c6d6e4" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="42" rx="20" ry="7" fill="none" stroke="${P.line}" stroke-width="2" stroke-dasharray="5 4"/>`) },
  pet: { name: "페트병", cat: "plastic", feat: ["container","light"], svg: svgWrap(`
    <path d="M42 30 h16 v8 c8 5 10 10 10 18 v18 a8 8 0 0 1 -8 8 h-20 a8 8 0 0 1 -8 -8 v-18 c0-8 2-13 10-18 z"
      fill="#bfe8f2" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="40" y="20" width="20" height="10" rx="3" fill="${P.plastic}" stroke="${P.line}" stroke-width="3"/>
    <rect x="34" y="56" width="32" height="14" fill="#8fd6e6"/>
    <path d="M38 42 c3 -4 6 -6 9 -7" stroke="${P.white}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`) },
  shampoo: { name: "샴푸통", cat: "plastic", feat: ["container","light"], svg: svgWrap(`
    <path d="M34 36 c0 -6 4 -10 16 -10 s16 4 16 10 v38 a8 8 0 0 1 -8 8 h-16 a8 8 0 0 1 -8 -8 z"
      fill="#e8a7c3" stroke="${P.line}" stroke-width="3"/>
    <rect x="44" y="14" width="12" height="14" rx="2" fill="${P.plastic}" stroke="${P.line}" stroke-width="3"/>
    <rect x="40" y="48" width="20" height="18" rx="4" fill="${P.white}" stroke="${P.line}" stroke-width="2"/>
    <path d="M45 57 h10" stroke="#c47ba0" stroke-width="3" stroke-linecap="round"/>`) },
  yogurt: { name: "요구르트병", cat: "plastic", feat: ["container","light"], svg: svgWrap(`
    <path d="M40 32 h20 l6 14 -4 32 h-24 l-4 -32 z" fill="#fef0d8" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="38" y="24" width="24" height="9" rx="3" fill="#f2b56f" stroke="${P.line}" stroke-width="3"/>
    <path d="M40 56 h20" stroke="#e5c9a0" stroke-width="3"/>`) },
  banana: { name: "바나나 껍질", cat: "food", feat: ["foodish"], svg: svgWrap(`
    <path d="M50 30 c-4 18 -18 34 -30 36 c10 8 24 6 32 -2 c8 8 22 10 32 2 c-12 -2 -26 -18 -30 -36 z"
      fill="#ffd95e" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="46" y="22" width="8" height="10" rx="2" fill="#8a6d3b" stroke="${P.line}" stroke-width="2.5"/>
    <path d="M42 48 c-2 6 -8 12 -12 14 M58 48 c2 6 8 12 12 14" stroke="#d9a93e" stroke-width="3" fill="none" stroke-linecap="round"/>`) },
  apple: { name: "사과 심", cat: "food", feat: ["foodish"], svg: svgWrap(`
    <path d="M36 32 c6 8 6 10 4 18 c-2 8 -2 12 0 18 c2 6 8 10 10 10 s8 -4 10 -10 c2 -6 2 -10 0 -18 c-2 -8 -2 -10 4 -18
      c-6 -6 -10 -6 -14 -2 c-4 -4 -8 -4 -14 2 z" fill="#f0e3cf" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 30 c0 -6 2 -10 7 -12" stroke="#6c5535" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M57 20 c6 -2 9 2 8 6 c-5 2 -8 -1 -8 -6 z" fill="#8fc177" stroke="${P.line}" stroke-width="2.5"/>
    <circle cx="46" cy="52" r="2" fill="#6c5535"/><circle cx="54" cy="60" r="2" fill="#6c5535"/>`) },
  flyer: { name: "전단지", cat: "paper", feat: ["flat","printed"], svg: svgWrap(`
    <rect x="20" y="18" width="60" height="64" rx="3" fill="#ffe9a8" stroke="${P.line}" stroke-width="3"/>
    <rect x="27" y="26" width="46" height="12" fill="#e3574b"/>
    <text x="50" y="36" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">SALE</text>
    <rect x="27" y="46" width="46" height="4" fill="#c9a25a"/><rect x="27" y="54" width="46" height="4" fill="#c9a25a"/>
    <rect x="27" y="62" width="30" height="4" fill="#c9a25a"/>`) },
  calendar: { name: "달력", cat: "paper", feat: ["flat","printed"], svg: svgWrap(`
    <rect x="22" y="24" width="56" height="58" rx="5" fill="${P.white}" stroke="${P.line}" stroke-width="3"/>
    <rect x="22" y="24" width="56" height="16" rx="5" fill="#e3574b"/>
    <circle cx="36" cy="24" r="3" fill="${P.line}"/><circle cx="64" cy="24" r="3" fill="${P.line}"/>
    <text x="50" y="68" text-anchor="middle" font-size="24" font-weight="900" fill="${P.line}">31</text>`) },
  spam: { name: "햄 통조림", cat: "can", feat: ["shiny","container"], svg: svgWrap(`
    <rect x="24" y="34" width="52" height="40" rx="9" fill="#9db4c9" stroke="${P.line}" stroke-width="3"/>
    <rect x="30" y="44" width="40" height="20" rx="4" fill="#f2a25c"/>
    <text x="50" y="58" text-anchor="middle" font-size="11" font-weight="900" fill="${P.line}">HAM</text>
    <ellipse cx="50" cy="34" rx="26" ry="8" fill="#c6d6e4" stroke="${P.line}" stroke-width="3"/>`) },
  detergent: { name: "세제통", cat: "plastic", feat: ["container","light"], svg: svgWrap(`
    <path d="M36 34 h28 a6 6 0 0 1 6 6 v36 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 v-36 a6 6 0 0 1 6 -6 z"
      fill="#a8d8ea" stroke="${P.line}" stroke-width="3"/>
    <rect x="40" y="20" width="14" height="14" rx="3" fill="#5f9ec7" stroke="${P.line}" stroke-width="3"/>
    <path d="M64 24 l10 6 v8 l-10 -4 z" fill="#5f9ec7" stroke="${P.line}" stroke-width="2.5"/>
    <circle cx="50" cy="58" r="10" fill="${P.white}" stroke="${P.line}" stroke-width="2"/>
    <path d="M46 58 q4 -6 8 0 q-4 6 -8 0" fill="#7fc7bd"/>`) },
  straw: { name: "빨대", cat: "plastic", feat: ["light"], svg: svgWrap(`
    <path d="M42 84 l8 -40 l16 -20" fill="none" stroke="#f2789f" stroke-width="10" stroke-linecap="round"/>
    <path d="M42 84 l8 -40 l16 -20" fill="none" stroke="#ffb3c9" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 44 l3 0" stroke="${P.line}" stroke-width="2"/>`) },
  block: { name: "장난감 블록", cat: "plastic", feat: ["light"], svg: svgWrap(`
    <rect x="24" y="42" width="52" height="34" rx="5" fill="#e3574b" stroke="${P.line}" stroke-width="3"/>
    <circle cx="38" cy="42" r="8" fill="#ef8177" stroke="${P.line}" stroke-width="3"/>
    <circle cx="62" cy="42" r="8" fill="#ef8177" stroke="${P.line}" stroke-width="3"/>`) },
  watermelon: { name: "수박 껍질", cat: "food", feat: ["foodish"], svg: svgWrap(`
    <path d="M18 58 a32 32 0 0 0 64 0 z" fill="#8fc177" stroke="${P.line}" stroke-width="3"/>
    <path d="M24 58 a26 26 0 0 0 52 0 z" fill="#fdf6e3"/>
    <path d="M30 58 a20 20 0 0 0 40 0 z" fill="#ef8177"/>
    <circle cx="44" cy="66" r="2" fill="${P.line}"/><circle cx="56" cy="68" r="2" fill="${P.line}"/>`) },
  tangerine: { name: "귤 껍질", cat: "food", feat: ["foodish"], svg: svgWrap(`
    <path d="M50 34 c-14 0 -24 10 -24 22 c0 10 6 16 10 14 c4 -2 2 -8 8 -8 s6 6 12 6 s6 -6 10 -6 c4 0 8 -8 4 -14 c-4 -8 -12 -14 -20 -14 z"
      fill="#f2a25c" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="52" r="1.8" fill="#c97b2e"/><circle cx="52" cy="48" r="1.8" fill="#c97b2e"/>
    <circle cx="60" cy="56" r="1.8" fill="#c97b2e"/>
    <path d="M48 34 c0 -4 2 -6 6 -7" stroke="#6c8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>`) },
  receipt: { name: "영수증", cat: "trash", feat: ["flat","printed"], svg: svgWrap(`
    <path d="M30 16 h40 v62 l-6 -5 -7 5 -7 -5 -7 5 -7 -5 -6 5 z" fill="${P.white}" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="37" y="26" width="26" height="5" fill="${P.line}"/>
    <rect x="37" y="38" width="26" height="3" fill="#b9b2a2"/><rect x="37" y="45" width="26" height="3" fill="#b9b2a2"/>
    <rect x="37" y="52" width="18" height="3" fill="#b9b2a2"/>
    <rect x="37" y="61" width="26" height="4" fill="${P.line}"/>`) },
  pizzabox: { name: "기름 묻은 피자박스", cat: "trash", feat: ["flat","printed","dirty"], svg: svgWrap(`
    <rect x="16" y="36" width="68" height="42" rx="4" fill="#e8c98a" stroke="${P.line}" stroke-width="3"/>
    <path d="M16 36 l10 -12 h48 l10 12 z" fill="#f4dda4" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="58" r="8" fill="#c9a25a" opacity="0.75"/>
    <circle cx="60" cy="64" r="6" fill="#c9a25a" opacity="0.65"/>
    <circle cx="66" cy="50" r="4" fill="#c9a25a" opacity="0.6"/>
    <text x="50" y="33" text-anchor="middle" font-size="9" font-weight="900" fill="#8a6b2f">PIZZA</text>`) },
  cupramen: { name: "국물 남은 컵라면", cat: "trash", feat: ["container","light","dirty"], svg: svgWrap(`
    <path d="M30 40 h40 l-5 38 a6 6 0 0 1 -6 5 h-18 a6 6 0 0 1 -6 -5 z" fill="#f0e3cf" stroke="${P.line}" stroke-width="3"/>
    <ellipse cx="50" cy="40" rx="20" ry="7" fill="#d98d63" stroke="${P.line}" stroke-width="3"/>
    <path d="M38 40 c2 3 6 4 12 4 s10 -1 12 -4" fill="none" stroke="#b96a3e" stroke-width="2"/>
    <path d="M44 26 c0 -5 4 -5 4 -9 M56 28 c0 -5 4 -5 4 -9" stroke="#b9b2a2" stroke-width="3" fill="none" stroke-linecap="round"/>`) },
  eggshell: { name: "달걀 껍데기", cat: "trash", feat: ["foodish"], svg: svgWrap(`
    <path d="M32 52 c0 -18 8 -30 18 -30 s18 12 18 30 l-5 4 -6 -5 -7 5 -7 -5 -6 5 z"
      fill="#fdf3df" stroke="${P.line}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M36 66 l5 -4 6 5 7 -5 7 5 5 -4 c-1 8 -8 16 -15 16 s-14 -6 -15 -13 z"
      fill="#fbe8c5" stroke="${P.line}" stroke-width="3" stroke-linejoin="round" transform="translate(0,4)"/>
    <circle cx="46" cy="42" r="1.6" fill="#d9c9a8"/><circle cx="56" cy="38" r="1.6" fill="#d9c9a8"/>`) },
};

/* ---------- 데이터: 특징·규칙·날짜 ---------- */

const FEATS = {
  flat: "납작하고", printed: "글자·그림이 있고", shiny: "반짝이고",
  container: "통 모양이고", light: "가볍고", foodish: "먹던 것 같고", dirty: "지저분하고",
};

const GUESS_CATS = ["paper", "can", "food", "plastic"];

// 재활용이가 세울 수 있는 가설 후보
const RULE_CANDIDATES = [
  { id: "r-paper", feats: ["flat", "printed"], cat: "paper", label: "납작하고 글자가 있는 것" },
  { id: "r-can", feats: ["shiny", "container"], cat: "can", label: "반짝이는 통" },
  { id: "r-plastic", feats: ["container", "light"], cat: "plastic", label: "가볍고 통 모양인 것" },
  { id: "r-food", feats: ["foodish"], cat: "food", label: "먹다 남은 것 같은 물건" },
];

const BASE_IDS = ["newspaper","magazine","notebook","box","paperbag","soda","tuna","pet","shampoo","yogurt","banana","apple"];
const EXTRA_IDS = ["flyer","calendar","spam","detergent","straw","block","watermelon","tangerine"];
const KILLER_IDS = ["receipt","pizzabox","cupramen","eggshell"];

const DAYS = {
  1: { rule: "paper", label: "1일차 · 종이류", pool: BASE_IDS },
  2: { rule: "can", label: "2일차 · 캔류", pool: [...BASE_IDS, ...EXTRA_IDS] },
  3: { rule: "plastic", label: "3일차 · 플라스틱류 (어려움!)", pool: [...BASE_IDS, ...EXTRA_IDS, ...KILLER_IDS], killer: true },
};

/* ---------- 데이터: 주민 ---------- */

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

const PEOPLE = [
  { name: "김 할머니", voice: 300, svg: personSvg("#f6d7b8",
      `<path d="M36 46 a24 24 0 0 1 48 0 v-4 a24 24 0 0 0 -48 0 z" fill="#cfd4dc"/><circle cx="60" cy="26" r="9" fill="#cfd4dc" stroke="${P.line}" stroke-width="3"/>`,
      "#b48ec9",
      `<rect x="40" y="70" width="40" height="4" rx="2" fill="#8f6aa6"/>`),
    lines: ["아이고, 우리 손주가 싸준 거예요~", "이거 버리는 날 맞지요?", "허리야… 빨리 부탁해요~"] },
  { name: "박 아저씨", voice: 145, svg: personSvg("#eec39a",
      `<path d="M34 44 a26 20 0 0 1 52 0 l0 -8 h-52 z" fill="#4a5568"/><rect x="30" y="36" width="60" height="9" rx="4" fill="#5f7085" stroke="${P.line}" stroke-width="3"/>`,
      "#5b8fb8"),
    lines: ["바빠 죽겠네, 빨리 좀 봐줘요!", "이 정도면 되지, 뭐.", "아 캔 하나쯤은 괜찮잖아~"] },
  { name: "민수", voice: 430, svg: personSvg("#f8dcb8",
      `<path d="M36 44 c2 -14 12 -20 24 -20 s22 6 24 20 c-8 -6 -16 -8 -24 -8 s-16 2 -24 8 z" fill="#3f3a36"/>`,
      "#f2c14e",
      `<circle cx="60" cy="96" r="7" fill="#e3574b" stroke="${P.line}" stroke-width="3"/>`),
    lines: ["엄마 심부름 왔어요!", "이거… 맞게 가져온 거죠?", "검사관님 멋있다…"] },
  { name: "정 이모", voice: 330, svg: personSvg("#f3cfae",
      `<path d="M32 52 c-4 -20 10 -30 28 -30 s32 10 28 30 c-2 -4 -6 -6 -8 -4 c2 -10 -6 -18 -20 -18 s-22 8 -20 18 c-2 -2 -6 0 -8 4 z" fill="#a2543c"/>`,
      "#e88f6e"),
    lines: ["가게 정리하고 오는 길이에요~", "오늘 뭐 버리는 날이더라?", "잘 부탁해요, 검사관님!"] },
  { name: "최 사장", voice: 180, svg: personSvg("#e8bd93",
      `<path d="M38 40 a24 16 0 0 1 44 0 v-6 h-44 z" fill="#6b7686"/><path d="M46 70 a14 10 0 0 0 28 0 z" fill="#6b7686"/>`,
      "#4f9e83"),
    lines: ["식당에서 나온 것들이오.", "분리수거는 자신 있소만…", "어험, 문제 없겠지요?"] },
];

/* ---------- 데이터: 하루 구성 ---------- */

const CATS = { paper: "종이류", can: "캔류", food: "음식물", plastic: "플라스틱류", trash: "재활용 안 됨" };

const DAY1 = {
  rule: "paper",
  bags: [
    { items: ["newspaper", "magazine", "box"] },
    { items: ["notebook", "soda", "paperbag"] },
    { items: ["box", "magazine", "newspaper", "paperbag"] },
    { items: ["notebook", "banana", "box"] },
    { items: ["magazine", "pet", "newspaper", "notebook"] },
  ],
};

/* ---------- 사운드 (WebAudio 합성) ---------- */

const Sound = {
  ctx: null,
  ready() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  stamp() {
    const c = this.ready(), t = c.currentTime;
    // 몸통: 떨어지는 저음
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(1.0, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.19);
    // 바닥 울림: 더 낮은 둥-
    const o2 = c.createOscillator(), g2 = c.createGain();
    o2.type = "sine"; o2.frequency.setValueAtTime(82, t + 0.008); o2.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    g2.gain.setValueAtTime(0.65, t + 0.008); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o2.connect(g2).connect(c.destination); o2.start(t + 0.008); o2.stop(t + 0.32);
    // 타격 노이즈
    const buf = c.createBuffer(1, c.sampleRate * 0.07, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const n = c.createBufferSource(), ng = c.createGain(), f = c.createBiquadFilter();
    n.buffer = buf; f.type = "lowpass"; f.frequency.value = 1200;
    ng.gain.setValueAtTime(0.7, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    n.connect(f).connect(ng).connect(c.destination); n.start(t);
    // 딱- 클릭
    const n2 = c.createBufferSource(), ng2 = c.createGain(), f2 = c.createBiquadFilter();
    n2.buffer = buf; f2.type = "highpass"; f2.frequency.value = 2600;
    ng2.gain.setValueAtTime(0.3, t); ng2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    n2.connect(f2).connect(ng2).connect(c.destination); n2.start(t);
  },
  // 중얼중얼: 대사 음절 수만큼 목소리 블립을 이어붙인 가짜 말소리
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
      if (Math.random() < 0.18) t += 0.07; // 숨 고르기
    }
  },
  // 재활용이 목소리: 전자음 삐빅
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

/* ---------- 재활용이 (AI 알바) ---------- */

const AI_SVG = `<svg viewBox="0 0 120 130" aria-hidden="true">
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

const NOTEBOOK_KEY = "recycle-notebook-v1";
const RECORDS_KEY = "recycle-records-v1";
const POLICIES = {
  pass: { emoji: "🙂", title: "일단 통과시켜", desc: "봉투 주인이 화 안 나게!\n대신 오염될 수 있어요" },
  deny: { emoji: "🛑", title: "일단 반려해", desc: "재활용장은 깨끗하게!\n대신 억울한 반려가 생겨요" },
  guess: { emoji: "🎲", title: "찍어볼게", desc: "운에 맡겨요!\n맞을 수도, 틀릴 수도" },
};

function loadNotebook() {
  try {
    const saved = JSON.parse(localStorage.getItem(NOTEBOOK_KEY) || "null");
    return saved && typeof saved === "object" ? saved : {};
  } catch { return {}; }
}
function saveNotebook() { localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(S.notebook)); }
function loadRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECORDS_KEY) || "null");
    const base = { humanBest: null, aiHistory: [], policy: null, rules: [], rejectedRules: [], day: 1 };
    return saved && typeof saved === "object" ? { ...base, ...saved } : base;
  } catch { return { humanBest: null, aiHistory: [], policy: null, rules: [], rejectedRules: [], day: 1 }; }
}
function saveRecords() { localStorage.setItem(RECORDS_KEY, JSON.stringify(S.records)); }

/* ---------- 상태 ---------- */

const S = {
  day: DAY1,
  bagIndex: 0,
  phase: "idle",     // idle | bag | judging | done
  ok: 0, bad: 0,
  citations: [],
  mode: "human",     // human | ai
  notebook: loadNotebook(),
  records: loadRecords(),
  aiGuesses: {},     // 이번 봉투에서 재활용이가 매긴 분류 { itemId: cat | "reject" }
  aiTimers: [],
  fixedThisBag: new Set(),
  taughtRecently: new Set(),  // 콜백 연출용: 최근 가르친 물건
  taughtThisShift: new Set(), // 훈련 카드용: 이번 근무(오리엔테이션 포함)에 가르친 물건
  learnedThisShift: 0,
  orientBudget: 0,
};

// ?reset=1 로 접속하면 모든 기록 삭제 (교사용)
if (new URLSearchParams(location.search).get("reset")) {
  localStorage.removeItem(NOTEBOOK_KEY);
  localStorage.removeItem(RECORDS_KEY);
  history.replaceState(null, "", location.pathname);
}

const $ = (id) => document.getElementById(id);
const el = {};
["startScreen","workScreen","endScreen","startHumanBtn","startAiBtn","notebookHomeBtn","startRecords","noticeBoard","noticeCat","bagCount","bagTotal",
 "scoreOk","scoreBad","personSlot","speech","speechText","bagBtn","itemRow","verdictSlip","slipText",
 "inkMark","stampPass","stampDeny","citation","citationText","citationOk","zoom","zoomArt","zoomName",
 "zoomClose","retryBtn","nextBtn","endAcc","endOk","endBad","endGrade","endCitations",
 "aiZone","aiSpeech","aiSpeechText","aiAvatar","notebookBtn","notebookOverlay","notebookCols",
 "notebookUnknown","notebookClose","interveneBar","interveneBtn","interveneFill","reviewOverlay",
 "reviewItems","reviewDone","catPicker","catPickerName","aiStats","statHuman","statAi",
 "orientOverlay","orientAvatar","orientGrid","orientCount","orientStepTeach","orientStepPolicy",
 "orientPolicyCards","orientStart","notebookPolicy","resetBtn","daySelect","notebookRules",
 "homeBtn","nextDayBtn",
 "hypoOverlay","hypoAvatar","hypoText","hypoYes","hypoNo",
 "trainCardBtn","trainCardOverlay","trainCard","trainCardClose",
].forEach((id) => (el[id] = $(id)));

/* ---------- 흐름 ---------- */

function startDay(mode = "human") {
  S.mode = mode;
  S.bagIndex = 0; S.ok = 0; S.bad = 0; S.citations = [];
  const oldLine = document.getElementById("learnCountLine");
  if (oldLine) oldLine.remove();
  clearAiTimers();
  const dayNum = S.records.day || 1;
  const cfg = DAYS[dayNum];
  if (mode === "human" && dayNum === 1) {
    S.day = { ...DAY1, pool: cfg.pool, num: 1 };
  } else {
    S.day = { rule: cfg.rule, pool: cfg.pool, num: dayNum, killer: !!cfg.killer, bags: [] };
    S.day.bags = generateAiBags();
  }
  el.startScreen.classList.add("hidden");
  el.endScreen.classList.add("hidden");
  el.workScreen.classList.remove("hidden");
  el.noticeCat.textContent = CATS[S.day.rule];
  el.bagTotal.textContent = S.day.bags.length;
  el.noticeBoard.classList.add("flash");
  setTimeout(() => el.noticeBoard.classList.remove("flash"), 950);
  // 재활용이 등장/퇴장
  const isAi = mode === "ai";
  el.aiZone.classList.toggle("hidden", !isAi);
  el.notebookBtn.classList.toggle("hidden", !isAi);
  if (isAi) {
    el.aiAvatar.innerHTML = AI_SVG;
    aiSay("오늘도 열심히 하겠습니다! 수첩 보면서 할게요!", 7);
  }
  updateHud();
  setTimeout(() => (isAi ? aiNextBag() : nextBag()), isAi ? 1300 : 600);
}

/* ═══════════ 2단계: 재활용이 근무 ═══════════ */

function clearAiTimers() {
  S.aiTimers.forEach(clearTimeout);
  S.aiTimers = [];
}
function aiWait(fn, ms) { S.aiTimers.push(setTimeout(fn, ms)); }

function generateAiBags() {
  const pool = S.day.pool || Object.keys(ITEMS);
  const ruleItems = pool.filter((id) => ITEMS[id].cat === S.day.rule);
  const otherItems = pool.filter((id) => ITEMS[id].cat !== S.day.rule);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const bags = [];
  for (let i = 0; i < 5; i += 1) {
    const contaminate = Math.random() < 0.55;
    const n = 3 + (Math.random() < 0.4 ? 1 : 0);
    const set = new Set();
    while (set.size < (contaminate ? n - 1 : n)) set.add(pick(ruleItems));
    if (contaminate) set.add(pick(otherItems));
    bags.push({ items: [...set].sort(() => Math.random() - 0.5) });
  }
  // 최소 한 봉투는 깨끗하게
  if (bags.every((b) => b.items.some((id) => ITEMS[id].cat !== S.day.rule))) {
    bags[0].items = ruleItems.slice(0, 3);
  }
  // 어려운 날: 킬러 아이템이 최소 2번 등장하도록 보장
  if (S.day.killer) {
    const killers = KILLER_IDS.sort(() => Math.random() - 0.5).slice(0, 2);
    killers.forEach((kid, i) => {
      const bag = bags[1 + i * 2];
      if (bag && !bag.items.includes(kid)) bag.items[bag.items.length - 1] = kid;
    });
  }
  return bags;
}

function aiSay(text, syllables = null) {
  if (el.aiZone.classList.contains("hidden")) return;
  el.aiSpeechText.textContent = text;
  el.aiSpeech.classList.remove("hidden");
  const n = syllables ?? Math.max(3, Math.min(10, Math.round(text.replace(/[^가-힣a-zA-Z]/g, "").length * 0.55)));
  Sound.robo(n);
}
function aiQuiet() { el.aiSpeech.classList.add("hidden"); }

function aiNextBag() {
  if (S.bagIndex >= S.day.bags.length) return endDay();
  S.phase = "bag";
  const bag = currentBag();
  bag.person = PEOPLE[S.bagIndex % PEOPLE.length];
  S.aiGuesses = {};
  S.fixedThisBag = new Set();
  updateHud();

  el.itemRow.innerHTML = "";
  el.verdictSlip.classList.add("hidden");
  el.inkMark.classList.add("hidden");
  el.inkMark.classList.remove("slam");
  el.interveneBar.classList.add("hidden");
  setStamps(false);
  aiQuiet();

  el.personSlot.innerHTML = bag.person.svg;
  const line = bag.person.lines[Math.floor(Math.random() * bag.person.lines.length)];
  aiWait(() => {
    el.speechText.textContent = line;
    el.speech.classList.remove("hidden");
    const syl = Math.max(4, Math.min(12, Math.round(line.replace(/[^가-힣a-zA-Z]/g, "").length * 0.7)));
    Sound.mumble(bag.person.voice || 220, syl);
  }, 480);

  el.bagBtn.classList.remove("hidden");
  el.bagBtn.style.animation = "none";
  void el.bagBtn.offsetWidth;
  el.bagBtn.style.animation = "";

  // 재활용이가 스스로 봉투를 연다
  aiWait(() => {
    el.speech.classList.add("hidden");
    aiOpenBag();
  }, 1900);
}

function aiOpenBag() {
  S.phase = "judging";
  Sound.paper();
  el.bagBtn.classList.add("hidden");
  const bag = currentBag();

  bag.items.forEach((itemId, i) => {
    const item = ITEMS[itemId];
    const card = document.createElement("div");
    card.className = "item-card";
    card.dataset.itemId = itemId;
    card.style.animationDelay = `${i * 0.09}s`;
    card.innerHTML = `${item.svg}<span class="item-name">${item.name}</span><span class="cat-tag" style="visibility:hidden">?</span>`;
    el.itemRow.appendChild(card);
  });

  el.verdictSlip.classList.remove("hidden");
  el.slipText.textContent = "검사 전표";
  aiWait(() => aiInspect(0), bag.items.length * 90 + 500);
}

function aiInspect(index) {
  const bag = currentBag();
  const cards = [...el.itemRow.children];
  cards.forEach((c) => c.classList.remove("inspecting"));

  if (index >= bag.items.length) return aiVerdict();

  const itemId = bag.items[index];
  const item = ITEMS[itemId];
  const card = cards[index];
  card.classList.add("inspecting");
  el.aiAvatar.classList.add("thinking");

  const known = S.notebook[itemId];
  const tag = card.querySelector(".cat-tag");
  tag.style.visibility = "visible";

  if (known) {
    S.aiGuesses[itemId] = known;
    tag.textContent = CATS[known];
    tag.className = `cat-tag known-${known}`;
    if (S.taughtRecently.has(itemId)) {
      S.taughtRecently.delete(itemId);
      aiSay(`${item.name}! 아까 가르쳐 주신 거다! ✨ ${CATS[known]}!`, 8);
      Sound.learn();
      aiWait(() => aiInspect(index + 1), 1300);
    } else {
      aiSay(`${item.name}… 수첩에 있다! ${CATS[known]}!`);
      aiWait(() => aiInspect(index + 1), 1050);
    }
  } else if (findRule(item)) {
    // 공통점 규칙으로 추론
    const rule = findRule(item);
    S.aiGuesses[itemId] = rule.cat;
    tag.textContent = `📐 ${CATS[rule.cat]}`;
    tag.className = "cat-tag rule";
    aiSay(`${item.name}… 수첩엔 없지만, ${rule.label}은 ${CATS[rule.cat]}랬으니까… 📐 ${CATS[rule.cat]} 같아요!`, 9);
    aiWait(() => aiInspect(index + 1), 1400);
  } else {
    // 모르는 물건: 학생이 정해준 방침대로 행동한다
    const policy = S.records.policy || "guess";
    if (policy === "pass") {
      S.aiGuesses[itemId] = S.day.rule;
      tag.textContent = `🙂 일단 통과?`;
      tag.className = "cat-tag guess";
      aiSay(`${item.name}…? 몰라요… 방침대로 일단 통과 쪽으로 볼게요!`);
    } else if (policy === "deny") {
      S.aiGuesses[itemId] = "reject";
      tag.textContent = `🛑 몰라서 반려`;
      tag.className = "cat-tag guess";
      aiSay(`${item.name}…? 모르는 건 방침대로 반려할게요!`);
    } else {
      const guess = Math.random() < 0.6 ? S.day.rule : GUESS_CATS[Math.floor(Math.random() * GUESS_CATS.length)];
      S.aiGuesses[itemId] = guess;
      tag.textContent = `🎲 ${CATS[guess]}?`;
      tag.className = "cat-tag guess";
      aiSay(`${item.name}…? 몰라요… 🎲 ${CATS[guess]} 아닐까요?`);
      Sound.dice();
    }
    aiWait(() => aiInspect(index + 1), 1350);
  }
}

function aiVerdict() {
  el.aiAvatar.classList.remove("thinking");
  const bag = currentBag();
  const wrongByGuess = bag.items.filter((id) => S.aiGuesses[id] !== S.day.rule);
  const aiPass = wrongByGuess.length === 0;
  S.aiVerdictPass = aiPass;

  const firstWrong = wrongByGuess[0];
  aiSay(aiPass
    ? `전부 ${CATS[S.day.rule]}! 통과입니다!`
    : S.aiGuesses[firstWrong] === "reject"
      ? `${ITEMS[firstWrong].name}은(는) 모르는 물건… 방침대로 반려!`
      : `${ITEMS[firstWrong].name}은(는) ${CATS[S.aiGuesses[firstWrong]]}… 오늘은 ${CATS[S.day.rule]} 날! 반려!`);

  aiWait(() => {
    Sound.stamp();
    const stampEl = aiPass ? el.stampPass : el.stampDeny;
    stampEl.classList.add("slammed");
    aiWait(() => stampEl.classList.remove("slammed"), 240);
    el.inkMark.className = `ink ${aiPass ? "pass" : "deny"} slam`;
    el.inkMark.innerHTML = `<span>${aiPass ? "통과" : "반려"}</span>`;
    el.inkMark.classList.remove("hidden");
    // [잠깐!] 유예
    aiWait(openInterveneWindow, 500);
  }, 900);
}

function openInterveneWindow() {
  S.phase = "intervene";
  el.interveneBar.classList.remove("hidden");
  el.interveneFill.classList.remove("run");
  void el.interveneFill.offsetWidth;
  el.interveneFill.style.animationDuration = "4.5s";
  el.interveneFill.classList.add("run");
  S.aiTimers.push(setTimeout(() => resolveAiBag(false), 4550));
}

function intervene() {
  if (S.phase !== "intervene") return;
  S.phase = "review";
  clearAiTimers();
  el.interveneBar.classList.add("hidden");
  aiSay("네?! 뭐가 잘못됐어요?", 5);
  renderReview();
  el.reviewOverlay.classList.remove("hidden");
}

function renderReview() {
  const bag = currentBag();
  el.reviewItems.innerHTML = "";
  bag.items.forEach((itemId) => {
    const item = ITEMS[itemId];
    const cat = S.aiGuesses[itemId];
    const known = S.notebook[itemId] && !S.fixedThisBag.has(itemId);
    const fixed = S.fixedThisBag.has(itemId);
    const btn = document.createElement("button");
    btn.className = "review-item";
    const catLabel = cat === "reject" ? "몰라서 반려" : CATS[cat] || "?";
    btn.innerHTML = `${item.svg}<span class="item-name">${item.name}</span>
      <span class="cat-tag ${fixed ? "fixed" : known ? `known-${cat}` : "guess"}">${fixed ? "✔ " : known ? "" : "🎲 "}${catLabel}</span>`;
    btn.addEventListener("click", () => openCatPicker(itemId));
    el.reviewItems.appendChild(btn);
  });
}

let pickingItemId = null;
let pickingContext = "review"; // review | notebook
function openCatPicker(itemId, context = "review") {
  pickingItemId = itemId;
  pickingContext = context;
  el.catPickerName.innerHTML = `${ITEMS[itemId].svg.replace('<svg ', '<svg style="width:64px;vertical-align:middle" ')} ${ITEMS[itemId].name}`;
  el.catPicker.classList.remove("hidden");
}

function teachCategory(cat) {
  if (!pickingItemId) return;
  const itemId = pickingItemId;
  const isNew = !S.notebook[itemId];
  S.notebook[itemId] = cat;
  saveNotebook();
  S.taughtRecently.add(itemId);
  S.taughtThisShift.add(itemId);
  if (isNew) S.learnedThisShift += 1;
  Sound.learn();
  el.catPicker.classList.add("hidden");
  pickingItemId = null;
  if (pickingContext === "review") {
    S.aiGuesses[itemId] = cat;
    S.fixedThisBag.add(itemId);
    aiSay(`아하! ${ITEMS[itemId].name}은(는) ${CATS[cat]}! 수첩에 적었어요!`, 8);
    renderReview();
  } else if (pickingContext === "orient") {
    orientAfterTeach(itemId);
  } else if (pickingContext === "citation") {
    renderCitationTeachDone(itemId);
  } else {
    renderNotebook();
  }
}

function renderCitationTeachDone(itemId) {
  document.querySelectorAll(`.cite-teach[data-item="${itemId}"]`).forEach((b) => {
    b.textContent = "배웠어요 ✔";
    b.classList.add("done");
    b.disabled = true;
  });
}

function finishReview() {
  el.reviewOverlay.classList.add("hidden");
  // 카드 태그 갱신 후 재판정
  const bag = currentBag();
  [...el.itemRow.children].forEach((card) => {
    const itemId = card.dataset.itemId;
    const tag = card.querySelector(".cat-tag");
    const cat = S.aiGuesses[itemId];
    if (S.fixedThisBag.has(itemId)) {
      tag.textContent = CATS[cat];
      tag.className = "cat-tag fixed";
      card.classList.add("corrected");
    }
  });
  const wrong = bag.items.filter((id) => S.aiGuesses[id] !== S.day.rule);
  const aiPass = wrong.length === 0;
  S.aiVerdictPass = aiPass;
  aiSay(aiPass ? `다시 보니… 전부 ${CATS[S.day.rule]}! 통과!` : `다시 보니… ${CATS[S.day.rule]} 아닌 게 있네요! 반려!`);
  aiWait(() => {
    Sound.stamp();
    el.inkMark.className = `ink ${aiPass ? "pass" : "deny"} slam`;
    el.inkMark.innerHTML = `<span>${aiPass ? "통과" : "반려"}</span>`;
    el.inkMark.classList.remove("hidden");
    aiWait(() => resolveAiBag(true), 700);
  }, 850);
}

function resolveAiBag(afterReview) {
  clearAiTimers();
  el.interveneBar.classList.add("hidden");
  S.phase = "done";
  const bag = currentBag();
  const wrongItems = bag.items.filter((id) => ITEMS[id].cat !== S.day.rule);
  const shouldPass = wrongItems.length === 0;
  const correct = S.aiVerdictPass === shouldPass;

  if (correct) {
    S.ok += 1; Sound.good();
    leavePerson();
  } else {
    S.bad += 1;
    const reason = shouldPass
      ? "전부 통과해도 되는 봉투였는데 반려했습니다."
      : `${wrongItems.map((id) => `${ITEMS[id].name}(${CATS[ITEMS[id].cat]})`).join(", ")}이(가) 섞여 있었는데 통과시켰습니다.`;
    // 실수와 관련된, 아직 수첩에 없는 물건들 → 정산에서 가르칠 수 있게 기록
    const teachables = (shouldPass ? bag.items : wrongItems).filter((id) => !S.notebook[id]);
    S.citations.push({ bag: S.bagIndex + 1, reason: `재활용이의 실수 — ${reason}`, teach: teachables });
    leavePerson();
  }
  updateHud();
  aiWait(() => { aiQuiet(); S.bagIndex += 1; aiNextBag(); }, 900);
}

/* ---------- 공통점 규칙 (추측-승인) ---------- */

function findRule(item) {
  return (S.records.rules || []).find((r) => r.feats.every((f) => (item.feat || []).includes(f)));
}

// 조건: 수첩에서 후보 규칙과 맞는 물건 2개 이상 + 반례 없음 + 미승인·미거절
function findHypothesis() {
  const known = Object.keys(S.notebook).filter((id) => ITEMS[id]);
  for (const cand of RULE_CANDIDATES) {
    if ((S.records.rules || []).some((r) => r.id === cand.id)) continue;
    if ((S.records.rejectedRules || []).includes(cand.id)) continue;
    const matches = known.filter((id) => cand.feats.every((f) => (ITEMS[id].feat || []).includes(f)));
    const support = matches.filter((id) => S.notebook[id] === cand.cat);
    const counter = matches.filter((id) => S.notebook[id] !== cand.cat);
    if (support.length >= 2 && counter.length === 0) {
      return { ...cand, examples: support.slice(0, 3) };
    }
  }
  return null;
}

let pendingHypo = null;
function maybeProposeHypothesis() {
  const hypo = findHypothesis();
  if (!hypo) return;
  pendingHypo = hypo;
  el.hypoAvatar.innerHTML = AI_SVG;
  const ex = hypo.examples.map((id) => ITEMS[id].name).join(", ");
  el.hypoText.innerHTML =
    `${ex}… 가만 보니까<br/><b>${hypo.label}</b>은 다 <b>${CATS[hypo.cat]}</b> 아니에요?`;
  el.hypoOverlay.classList.remove("hidden");
  Sound.robo(8);
}

el.hypoYes && el.hypoYes.addEventListener("click", () => {
  if (pendingHypo) {
    S.records.rules = S.records.rules || [];
    S.records.rules.push({ id: pendingHypo.id, feats: pendingHypo.feats, cat: pendingHypo.cat, label: pendingHypo.label });
    saveRecords();
    Sound.learn();
  }
  pendingHypo = null;
  el.hypoOverlay.classList.add("hidden");
});
el.hypoNo && el.hypoNo.addEventListener("click", () => {
  if (pendingHypo) {
    S.records.rejectedRules = S.records.rejectedRules || [];
    S.records.rejectedRules.push(pendingHypo.id);
    saveRecords();
  }
  pendingHypo = null;
  el.hypoOverlay.classList.add("hidden");
});

function renderNotebookRules() {
  const rules = S.records.rules || [];
  if (!rules.length) {
    el.notebookRules.innerHTML = `<div class="nb-rules-empty">아직 없어요. 재활용이가 일하면서 뭔가 알아채면 물어볼 거예요!</div>`;
    return;
  }
  el.notebookRules.innerHTML = rules.map((r, i) => {
    // 규칙과 특징은 맞지만 분류가 다른, 이미 배운 물건 = 예외
    const exceptions = Object.keys(S.notebook)
      .filter((id) => ITEMS[id] && r.feats.every((f) => (ITEMS[id].feat || []).includes(f)) && S.notebook[id] !== r.cat)
      .map((id) => `<div class="nb-rule-exception">⚠ 하지만 ${ITEMS[id].name}은(는) ${CATS[S.notebook[id]]}!</div>`)
      .join("");
    return `<div class="nb-rule"><span>📐 ${r.label} → <b>${CATS[r.cat]}</b>${exceptions}</span>
      <button class="rule-del" data-rule="${i}" aria-label="규칙 지우기">×</button></div>`;
  }).join("");
  el.notebookRules.querySelectorAll(".rule-del").forEach((btn) =>
    btn.addEventListener("click", () => {
      S.records.rules.splice(Number(btn.dataset.rule), 1);
      saveRecords();
      renderNotebookRules();
    }));
}

/* ---------- 알바 수첩 열람 ---------- */

function renderNotebook() {
  const empty = Object.keys(S.notebook).length === 0;
  const sub = document.querySelector("#notebookOverlay .review-sub");
  if (sub) sub.innerHTML = empty
    ? "아직 아무것도 못 배웠어요! <b>[🤖 재활용이에게 맡기기]</b>를 누르면 출근 전에 3개를 가르칠 수 있어요."
    : "재활용이가 배운 것들이에요. 새로운 건 <b>근무 중에 틀렸을 때</b> 가르칠 수 있어요.";
  const cols = Object.keys(CATS);
  el.notebookCols.innerHTML = cols.map((cat) => {
    const chips = Object.keys(S.notebook)
      .filter((id) => S.notebook[id] === cat && ITEMS[id])
      .map((id) => `<div class="nb-chip" style="cursor:default">${ITEMS[id].name}</div>`)
      .join("") || `<div class="nb-chip" style="opacity:0.45;cursor:default">아직 없음</div>`;
    return `<div class="nb-col"><div class="nb-col-title cat-${cat}">${CATS[cat]}</div>${chips}</div>`;
  }).join("");
  const unknown = Object.keys(ITEMS).filter((id) => !S.notebook[id]);
  el.notebookUnknown.innerHTML = unknown.length
    ? unknown.map(() => `<span class="nb-mystery-chip">?</span>`).join("")
    : `<span class="nb-all-done">모든 물건을 다 배웠어요! 🎉</span>`;
  renderNotebookRules();
  renderPolicyCards(el.notebookPolicy);
}

function renderPolicyCards(container, onPick) {
  container.innerHTML = Object.keys(POLICIES).map((key) => {
    const p = POLICIES[key];
    return `<button class="policy-card ${S.records.policy === key ? "selected" : ""}" data-policy="${key}">
      <span class="p-emoji">${p.emoji}</span><span class="p-title">${p.title}</span>
      <span class="p-desc">${p.desc.replace(/\n/g, "<br/>")}</span></button>`;
  }).join("");
  container.querySelectorAll("[data-policy]").forEach((btn) =>
    btn.addEventListener("click", () => {
      S.records.policy = btn.dataset.policy;
      saveRecords();
      Sound.good();
      renderPolicyCards(container, onPick);
      if (onPick) onPick(btn.dataset.policy);
    }));
}

/* ---------- 출근 전 오리엔테이션 ---------- */

function openOrientation() {
  S.orientBudget = 3;
  el.orientAvatar.innerHTML = AI_SVG;
  el.orientStepTeach.classList.remove("hidden");
  el.orientStepPolicy.classList.add("hidden");
  el.orientCount.textContent = "0";
  // 전체 목록을 노출하지 않도록, 무작위 6개만 후보로 보여준다
  const dayPool = (DAYS[S.records.day || 1] || DAYS[1]).pool;
  const candidates = [...dayPool].sort(() => Math.random() - 0.5).slice(0, 6);
  el.orientGrid.innerHTML = candidates.map((id) =>
    `<button class="orient-item" data-item="${id}">${ITEMS[id].svg}<span class="item-name">${ITEMS[id].name}</span></button>`
  ).join("");
  el.orientGrid.querySelectorAll("[data-item]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (S.notebook[btn.dataset.item] || S.orientBudget <= 0) return;
      openCatPicker(btn.dataset.item, "orient");
    }));
  el.orientOverlay.classList.remove("hidden");
  Sound.robo(6);
}

function orientAfterTeach(itemId) {
  const taught = Object.keys(S.notebook).length;
  el.orientCount.textContent = taught;
  const btn = el.orientGrid.querySelector(`[data-item="${itemId}"]`);
  if (btn) { btn.classList.add("taught"); btn.disabled = true; }
  S.orientBudget = 3 - taught;
  if (S.orientBudget <= 0) {
    // 나머지 비활성화 후 방침 단계로
    el.orientGrid.querySelectorAll("button").forEach((b) => (b.disabled = true));
    setTimeout(() => {
      el.orientStepTeach.classList.add("hidden");
      el.orientStepPolicy.classList.remove("hidden");
      renderPolicyCards(el.orientPolicyCards, () => { el.orientStart.disabled = false; });
      el.orientStart.disabled = !S.records.policy;
      Sound.robo(5);
    }, 650);
  }
}

function currentBag() { return S.day.bags[S.bagIndex]; }

function nextBag() {
  if (S.bagIndex >= S.day.bags.length) return endDay();
  S.phase = "bag";
  const bag = currentBag();
  bag.person = PEOPLE[S.bagIndex % PEOPLE.length];
  updateHud();

  // 초기화
  el.itemRow.innerHTML = "";
  el.verdictSlip.classList.add("hidden");
  el.inkMark.classList.add("hidden");
  el.inkMark.classList.remove("slam");
  el.interveneBar.classList.add("hidden");
  setStamps(false);

  // 주민 등장
  el.personSlot.innerHTML = bag.person.svg;
  const line = bag.person.lines[Math.floor(Math.random() * bag.person.lines.length)];
  setTimeout(() => {
    el.speechText.textContent = line;
    el.speech.classList.remove("hidden");
    const syllables = Math.max(4, Math.min(12, Math.round(line.replace(/[^가-힣a-zA-Z]/g, "").length * 0.7)));
    Sound.mumble(bag.person.voice || 220, syllables);
  }, 480);

  // 봉투 등장
  el.bagBtn.classList.remove("hidden");
  el.bagBtn.style.animation = "none";
  void el.bagBtn.offsetWidth;
  el.bagBtn.style.animation = "";
}

function openBag() {
  if (S.phase !== "bag") return;
  S.phase = "judging";
  Sound.paper();
  el.bagBtn.classList.add("hidden");
  el.speech.classList.add("hidden");

  const bag = currentBag();
  bag.items.forEach((itemId, i) => {
    const item = ITEMS[itemId];
    const card = document.createElement("button");
    card.className = "item-card";
    card.style.animationDelay = `${i * 0.09}s`;
    card.style.transform = `rotate(${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg)`;
    card.innerHTML = `${item.svg}<span class="item-name">${item.name}</span>`;
    card.addEventListener("click", () => showZoom(item));
    el.itemRow.appendChild(card);
  });

  el.verdictSlip.classList.remove("hidden");
  el.slipText.textContent = "검사 전표";
  setTimeout(() => setStamps(true), bag.items.length * 90 + 350);
}

function showZoom(item) {
  Sound.paper();
  el.zoomArt.innerHTML = item.svg;
  el.zoomName.textContent = item.name;
  el.zoom.classList.remove("hidden");
}

function judge(passed) {
  if (S.phase !== "judging") return;
  S.phase = "done";
  setStamps(false);
  Sound.stamp();

  // 도장·잉크 연출
  const stampEl = passed ? el.stampPass : el.stampDeny;
  stampEl.classList.add("slammed");
  setTimeout(() => stampEl.classList.remove("slammed"), 240);
  el.inkMark.className = `ink ${passed ? "pass" : "deny"} slam`;
  el.inkMark.innerHTML = `<span>${passed ? "통과" : "반려"}</span>`;
  el.inkMark.classList.remove("hidden");

  // 채점
  const bag = currentBag();
  const wrongItems = bag.items.filter((id) => ITEMS[id].cat !== S.day.rule);
  const shouldPass = wrongItems.length === 0;
  const correct = passed === shouldPass;

  setTimeout(() => {
    if (correct) {
      S.ok += 1; Sound.good();
      leavePerson();
      setTimeout(() => { S.bagIndex += 1; nextBag(); }, 620);
    } else {
      S.bad += 1; Sound.bad();
      const reason = shouldPass
        ? `이 봉투는 전부 ${CATS[S.day.rule]}였어요. 멀쩡한 봉투를 반려했습니다!`
        : `${wrongItems.map((id) => `${ITEMS[id].name}(${CATS[ITEMS[id].cat]})`).join(", ")}이(가) 섞여 있었는데 통과시켰습니다!`;
      S.citations.push({ bag: S.bagIndex + 1, reason });
      el.citationText.textContent = reason;
      el.citation.classList.remove("hidden");
    }
    updateHud();
  }, 480);
}

function leavePerson() {
  const p = el.personSlot.querySelector(".person");
  if (p) p.classList.add("leave");
}

function closeCitation() {
  el.citation.classList.add("hidden");
  leavePerson();
  setTimeout(() => { S.bagIndex += 1; nextBag(); }, 480);
}

function endDay() {
  clearAiTimers();
  el.workScreen.classList.add("hidden");
  el.endScreen.classList.remove("hidden");
  const total = S.ok + S.bad;
  const acc = total ? Math.round((S.ok / total) * 100) : 0;
  el.endAcc.textContent = `${acc}%`;
  el.endOk.textContent = S.ok;
  el.endBad.textContent = S.bad;

  if (S.mode === "human") {
    if (S.records.humanBest === null || acc > S.records.humanBest) S.records.humanBest = acc;
    el.endGrade.textContent =
      acc === 100 ? "🏆 완벽한 검사관! 이제 신입에게 일을 가르칠 자격이 충분해요."
      : acc >= 80 ? "😎 훌륭해요! 공지판을 잘 확인했네요."
      : acc >= 60 ? "🙂 나쁘지 않아요. 봉투 속을 더 꼼꼼히 살펴보세요."
      : "😅 오늘은 좀 힘들었네요. 물건을 눌러서 자세히 확인해 보세요!";
  } else {
    S.records.aiHistory.push(acc);
    const learned = Object.keys(S.notebook).length;
    el.endGrade.textContent =
      acc === 100 ? `🤖🏆 재활용이가 완벽하게 해냈어요! 수첩에 ${learned}개나 배웠거든요.`
      : acc >= 80 ? `🤖 재활용이가 꽤 잘하네요! 가르쳐준 덕분이에요. (수첩 ${learned}개)`
      : acc >= 50 ? `🤖 재활용이가 아직 서툴러요. 🎲 찍은 게 많았어요. 더 가르쳐 주세요! (수첩 ${learned}개)`
      : `🤖💦 오늘은 엉망이었네요… 수첩이 비어서 그래요. [잠깐!]으로 고쳐주면 배워요. (수첩 ${learned}개)`;
  }
  saveRecords();

  // 비교 통계
  const showStats = S.records.aiHistory.length > 0 || S.mode === "ai";
  el.aiStats.classList.toggle("hidden", !showStats);
  el.statHuman.textContent = S.records.humanBest === null ? "-" : `${S.records.humanBest}%`;
  el.statAi.innerHTML = S.records.aiHistory.length
    ? S.records.aiHistory.map((a, i) =>
        `<span class="ai-acc-chip ${i === S.records.aiHistory.length - 1 ? "latest" : ""}">${i + 1}회차 ${a}%</span>`).join("")
    : `<span class="ai-acc-chip">아직 없음</span>`;

  el.nextBtn.textContent = S.mode === "ai" ? "🤖 다시 맡기기 (더 배웠어요!)" : "🤖 재활용이에게 맡기기";
  const curDay = S.records.day || 1;
  const nextDayCfg = DAYS[curDay + 1];
  if (nextDayCfg) {
    el.nextDayBtn.classList.remove("hidden");
    el.nextDayBtn.textContent = "▶ " + nextDayCfg.label + "로 넘어가기";
    const perfect = S.mode === "ai" && acc === 100;
    el.nextDayBtn.classList.toggle("pulse", perfect);
    if (perfect) el.endGrade.textContent += " 다음 일차에 도전해 보세요!";
  } else {
    el.nextDayBtn.classList.add("hidden");
  }
  el.endCitations.innerHTML = S.citations
    .map((c) => {
      const teachBtns = (c.teach || [])
        .map((id) => S.notebook[id]
          ? `<button class="cite-teach done" disabled>배웠어요 ✔</button>`
          : `<button class="cite-teach" data-item="${id}">📒 ${ITEMS[id].name} 가르치기</button>`)
        .join(" ");
      return `<div class="end-citation-item">👜 ${c.bag}번째 봉투 — ${c.reason} ${teachBtns}</div>`;
    })
    .join("");
  el.endCitations.querySelectorAll(".cite-teach[data-item]").forEach((btn) =>
    btn.addEventListener("click", () => openCatPicker(btn.dataset.item, "citation")));
  if (S.mode === "ai" && S.learnedThisShift > 0) {
    el.endGrade.insertAdjacentHTML("afterend",
      `<div class="learn-count" id="learnCountLine">📒 오늘 재활용이가 새로 배운 것 +${S.learnedThisShift}개</div>`);
    S.learnedThisShift = 0;
  }
  renderStartRecords();
  if (S.mode === "ai") {
    setTimeout(maybeProposeHypothesis, 900);
  }
}

/* ---------- 오늘의 훈련 카드 ---------- */

function renderTrainCard() {
  const total = S.ok + S.bad;
  const acc = total ? Math.round((S.ok / total) * 100) : 0;
  const dayCfg = DAYS[S.day.num || S.records.day || 1] || DAYS[1];
  const isAi = S.mode === "ai";
  const round = S.records.aiHistory.length;

  const taught = [...S.taughtThisShift].filter((id) => ITEMS[id] && S.notebook[id]);
  const taughtHtml = taught.length
    ? taught.map((id) => `<span class="tc-chip">${ITEMS[id].name} → <b>${CATS[S.notebook[id]]}</b></span>`).join("")
    : `<span class="tc-none">오늘은 새로 가르친 게 없어요</span>`;

  const rules = S.records.rules || [];
  const rulesHtml = rules.length
    ? rules.map((r) => {
        const ex = Object.keys(S.notebook)
          .filter((id) => ITEMS[id] && r.feats.every((f) => (ITEMS[id].feat || []).includes(f)) && S.notebook[id] !== r.cat)
          .map((id) => ITEMS[id].name);
        return `<span class="tc-chip">📐 ${r.label} → <b>${CATS[r.cat]}</b>${ex.length ? ` <i class="tc-ex">(⚠ ${ex.join(", ")} 빼고!)</i>` : ""}</span>`;
      }).join("")
    : `<span class="tc-none">아직 없어요</span>`;

  const pol = POLICIES[S.records.policy];
  const history = S.records.aiHistory;
  const histHtml = history.length
    ? history.map((a, i) => `<span class="tc-acc ${i === history.length - 1 ? "latest" : ""}">${a}%</span>`)
        .join(`<span class="tc-arrow">→</span>`)
    : `<span class="tc-none">아직 없어요</span>`;

  el.trainCard.innerHTML = `
    <div class="tc-head">
      <span class="tc-title">📋 오늘의 훈련 카드</span>
      <span class="tc-day">${dayCfg.label}</span>
    </div>
    <div class="tc-sub">${isAi ? `🤖 재활용이 근무 · ${round}회차` : "🧑 내가 검사관"}</div>
    <div class="tc-row"><span class="tc-label">검사 정확도</span>
      <span class="tc-value"><b class="tc-big">${acc}%</b>&nbsp; (✅ ${S.ok} · ❌ ${S.bad})</span></div>
    <div class="tc-row"><span class="tc-label">📈 재활용이 성장</span><span class="tc-value tc-hist">${histHtml}</span></div>
    <div class="tc-row col"><span class="tc-label">📒 오늘 가르친 것 (${taught.length}개)</span>
      <span class="tc-value">${taughtHtml}</span></div>
    <div class="tc-row col"><span class="tc-label">📐 우리가 만든 규칙</span><span class="tc-value">${rulesHtml}</span></div>
    <div class="tc-row"><span class="tc-label">🧭 방침</span>
      <span class="tc-value">${pol ? `${pol.emoji} ${pol.title}` : "아직 안 정했어요"}</span></div>
    <div class="tc-row"><span class="tc-label">📒 수첩 현황</span>
      <span class="tc-value">${Object.keys(S.notebook).length}개 / ${Object.keys(ITEMS).length}개 배움</span></div>
    <div class="tc-note">✏️ 이 카드를 활동지에 옮겨 적어 보세요!</div>`;
}

// 새 근무를 시작할 때 훈련 카드의 "오늘" 범위를 비운다 (오리엔테이션보다 먼저)
function resetShiftLog() { S.taughtThisShift = new Set(); }

/* ---------- 유틸 ---------- */

function setStamps(enabled) {
  el.stampPass.disabled = !enabled;
  el.stampDeny.disabled = !enabled;
}
function updateHud() {
  el.bagCount.textContent = Math.min(S.bagIndex + 1, S.day.bags.length);
  el.scoreOk.textContent = S.ok;
  el.scoreBad.textContent = S.bad;
}

/* ---------- 이벤트 ---------- */

function renderDaySelect() {
  el.daySelect.innerHTML = Object.keys(DAYS).map((n) =>
    `<button class="day-chip ${Number(n) === (S.records.day || 1) ? "active" : ""}" data-day="${n}">${DAYS[n].label}</button>`
  ).join("");
  el.daySelect.querySelectorAll(".day-chip").forEach((btn) =>
    btn.addEventListener("click", () => {
      S.records.day = Number(btn.dataset.day);
      saveRecords();
      Sound.paper();
      renderDaySelect();
    }));
}

function renderStartRecords() {
  const h = S.records.humanBest;
  const a = S.records.aiHistory;
  const parts = [];
  if (h !== null) parts.push(`🧑 내 최고 ${h}%`);
  if (a.length) parts.push(`🤖 재활용이 최근 ${a[a.length - 1]}%`);
  el.startRecords.textContent = parts.join("  ·  ");
}

el.startHumanBtn.addEventListener("click", () => { Sound.ready(); resetShiftLog(); startDay("human"); });
el.startAiBtn.addEventListener("click", () => {
  Sound.ready();
  resetShiftLog();
  if (Object.keys(S.notebook).length === 0) openOrientation();
  else startDay("ai");
});
el.orientStart.addEventListener("click", () => {
  el.orientOverlay.classList.add("hidden");
  startDay("ai");
});
el.resetBtn.addEventListener("click", () => {
  if (!confirm("수첩, 방침, 점수 기록을 모두 지우고 처음부터 시작할까요?")) return;
  localStorage.removeItem(NOTEBOOK_KEY);
  localStorage.removeItem(RECORDS_KEY);
  location.reload();
});
el.notebookHomeBtn.addEventListener("click", () => {
  Sound.ready(); Sound.paper();
  renderNotebook();
  el.notebookOverlay.classList.remove("hidden");
});
renderStartRecords();
renderDaySelect();
el.bagBtn.addEventListener("click", openBag);
el.stampPass.addEventListener("click", () => judge(true));
el.stampDeny.addEventListener("click", () => judge(false));
el.citationOk.addEventListener("click", closeCitation);
el.zoomClose.addEventListener("click", () => el.zoom.classList.add("hidden"));
el.zoom.addEventListener("click", (e) => { if (e.target === el.zoom) el.zoom.classList.add("hidden"); });
function goHome() {
  clearAiTimers();
  el.workScreen.classList.add("hidden");
  el.endScreen.classList.add("hidden");
  el.startScreen.classList.remove("hidden");
  renderDaySelect();
  renderStartRecords();
}
el.homeBtn.addEventListener("click", goHome);
el.nextDayBtn.addEventListener("click", () => {
  const cur = S.records.day || 1;
  if (DAYS[cur + 1]) {
    S.records.day = cur + 1;
    saveRecords();
    Sound.good();
  }
  goHome();
});
el.retryBtn.addEventListener("click", () => { resetShiftLog(); startDay("human"); });
el.nextBtn.addEventListener("click", () => { resetShiftLog(); startDay("ai"); });
el.trainCardBtn.addEventListener("click", () => {
  Sound.paper();
  renderTrainCard();
  el.trainCardOverlay.classList.remove("hidden");
});
el.trainCardClose.addEventListener("click", () => el.trainCardOverlay.classList.add("hidden"));
el.trainCardOverlay.addEventListener("click", (e) => { if (e.target === el.trainCardOverlay) el.trainCardOverlay.classList.add("hidden"); });
el.interveneBtn.addEventListener("click", intervene);
el.reviewDone.addEventListener("click", finishReview);
document.querySelectorAll(".cat-btn").forEach((btn) =>
  btn.addEventListener("click", () => teachCategory(btn.dataset.cat)));
el.catPicker.addEventListener("click", (e) => { if (e.target === el.catPicker) el.catPicker.classList.add("hidden"); });
el.notebookBtn.addEventListener("click", () => { renderNotebook(); el.notebookOverlay.classList.remove("hidden"); });
el.notebookClose.addEventListener("click", () => el.notebookOverlay.classList.add("hidden"));
el.notebookOverlay.addEventListener("click", (e) => { if (e.target === el.notebookOverlay) el.notebookOverlay.classList.add("hidden"); });
