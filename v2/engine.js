/* ═══════════ 분리수거 검사관 v2 — 판정 엔진 ═══════════
   우선순위: 물품 등록(정확 지식) > 특징 규칙(구체성 우선, 동점 불일치=혼란→방침) > 방침
   brain = { reg: {itemId: cat}, rules: [{feats:[...], cat}], policy: "pass"|"deny"|"guess" } */

import { ITEMS, CATS, RULE_SLOTS } from "./data.js";

export const GUESS_CATS = ["paper", "can", "food", "plastic"];

export function itemOf(id) {
  const [name, cat, stage, feats] = ITEMS[id];
  return { id, name, cat, stage, feats };
}

export function emptyBrain() {
  return { reg: {}, rules: [], policy: null };
}

// 규칙 추가 — 슬롯 초과·중복 조합 방지. 성공 시 true
export function addRule(brain, feats, cat) {
  if (brain.rules.length >= RULE_SLOTS) return { ok: false, reason: "slots" };
  if (!feats.length || feats.length > 3) return { ok: false, reason: "size" };
  const key = [...feats].sort().join("+");
  if (brain.rules.some((r) => [...r.feats].sort().join("+") === key))
    return { ok: false, reason: "dup" };
  brain.rules.push({ feats: [...feats], cat });
  return { ok: true };
}

export function removeRule(brain, index) {
  if (index >= 0 && index < brain.rules.length) brain.rules.splice(index, 1);
}

function policyGuess(policy, todayCat, rng) {
  if (policy === "pass") return { cat: todayCat, source: "policy-pass" };
  if (policy === "deny") return { cat: "reject", source: "policy-deny" };
  // guess: 오늘 배출일 60% 편향 (v1 검증된 밸런스)
  const cat = rng() < 0.6 ? todayCat : GUESS_CATS[Math.floor(rng() * GUESS_CATS.length)];
  return { cat, source: "policy-guess" };
}

/* 물건 하나 분류.
   반환: { cat, source, ruleIndex?, conflict?: {indices, cats} } — cat이 "reject"면 몰라서 반려 */
export function classifyItem(itemId, brain, todayCat, rng = Math.random) {
  const item = itemOf(itemId);
  // 1. 물품 등록 (정확 지식 — 잘못 가르쳤어도 그대로: garbage in)
  if (brain.reg[itemId]) return { cat: brain.reg[itemId], source: "reg" };
  // 2. 특징 규칙 — 물건이 규칙의 특징을 전부 가지면 매치. 구체성(특징 수) 우선
  const matches = brain.rules
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => r.feats.every((f) => item.feats.includes(f)));
  if (matches.length) {
    const top = Math.max(...matches.map(({ r }) => r.feats.length));
    const tops = matches.filter(({ r }) => r.feats.length === top);
    const cats = [...new Set(tops.map(({ r }) => r.cat))];
    if (cats.length === 1) return { cat: cats[0], source: "rule", ruleIndex: tops[0].i };
    // 동점 불일치 → 혼란: 방침으로 처리하되 충돌 정보를 남김 (연출·성적표용)
    const fallback = policyGuess(brain.policy || "guess", todayCat, rng);
    return { ...fallback, conflict: { indices: tops.map(({ i }) => i), cats } };
  }
  // 3. 방침
  return policyGuess(brain.policy || "guess", todayCat, rng);
}

/* 봉투 판정: 모든 물건의 분류가 오늘 배출일과 일치해야 통과. "reject"는 반려 표 */
export function bagVerdict(guesses, todayCat) {
  return guesses.every((g) => g.cat === todayCat);
}

/* 도전 1회 실행.
   bags: [[itemId,...], ...], 반환: 정산 통계 전체 */
export function runChallenge(bags, brain, todayCat, rng = Math.random) {
  const perItem = [];
  let okBags = 0;
  const ruleStats = brain.rules.map(() => ({ hits: 0, misses: 0 }));
  let regHits = 0, regMisses = 0, conflictCount = 0;

  for (const bag of bags) {
    const guesses = bag.map((id) => ({ id, ...classifyItem(id, brain, todayCat, rng) }));
    const aiPass = bagVerdict(guesses, todayCat);
    const shouldPass = bag.every((id) => itemOf(id).cat === todayCat);
    if (aiPass === shouldPass) okBags += 1;
    for (const g of guesses) {
      const truth = itemOf(g.id).cat;
      // 물건 단위 정오: "reject"는 truth가 오늘 배출일이 아니면 사실상 옳은 처리로 본다
      const correct = g.cat === "reject" ? truth !== todayCat : g.cat === truth;
      perItem.push({ ...g, truth, correct });
      if (g.source === "rule") ruleStats[g.ruleIndex][correct ? "hits" : "misses"] += 1;
      if (g.source === "reg") (correct ? regHits++ : regMisses++);
      if (g.conflict) conflictCount += 1;
    }
  }
  const itemAcc = perItem.filter((p) => p.correct).length / perItem.length;
  return {
    bagAcc: okBags / bags.length,
    itemAcc,
    score: Math.round(itemAcc * 100),
    perItem, ruleStats, regHits, regMisses, conflictCount,
  };
}

/* ── 출제 3단계 ── */

// 도전 1: 완전 대본 — 가르친 물건만으로 구성 (100점 보장)
export function poolTutorial1(brain) {
  return Object.keys(brain.reg);
}

// 도전 2: 반대본 — 봉투마다 가르친 것 2 + 지정 신규 2 고정 혼합.
// 신규는 오늘 배출일이 아닌 것 위주로 지정해야 찍기 편향에 안 맞아서 좌절 점수(50~60%)가 나온다.
export function makeTutorial2Bags(brain, curatedNewIds, bagCount, rng = Math.random) {
  const taught = Object.keys(brain.reg);
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const bags = [];
  for (let b = 0; b < bagCount; b += 1) {
    const set = new Set();
    let guard = 0;
    while (set.size < 2 && guard++ < 50) set.add(pick(taught));
    while (set.size < 4 && guard++ < 50) set.add(pick(curatedNewIds));
    bags.push([...set].sort(() => rng() - 0.5));
  }
  return bags;
}

// 무한 학습: 전체 풀 랜덤 (stage ≤ maxStage)
export function poolFree(maxStage = 4) {
  return Object.keys(ITEMS).filter((id) => itemOf(id).stage <= maxStage);
}

/* 풀에서 봉투 구성: 오늘 배출일 물건 위주 + 오염 섞기 (v1 로직 계승) */
export function makeBags(pool, todayCat, bagCount, rng = Math.random) {
  const ruleItems = pool.filter((id) => itemOf(id).cat === todayCat);
  const otherItems = pool.filter((id) => itemOf(id).cat !== todayCat);
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const bags = [];
  for (let b = 0; b < bagCount; b += 1) {
    const contaminate = otherItems.length > 0 && rng() < 0.55;
    const n = 3 + (rng() < 0.4 ? 1 : 0);
    const set = new Set();
    let guard = 0;
    while (set.size < (contaminate ? n - 1 : n) && guard++ < 200)
      set.add(pick(ruleItems.length ? ruleItems : pool));
    if (contaminate) set.add(pick(otherItems));
    bags.push([...set].sort(() => rng() - 0.5));
  }
  return bags;
}
