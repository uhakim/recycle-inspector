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

/* 물건 하나 분류.
   반환: { cat, source, ruleIndex?, conflict? } — 모르면 cat "unknown" (분류를 지어내지 않는다) */
export function classifyItem(itemId, brain) {
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
    // 동점 불일치 → 혼란: 결론을 못 내림 = 모름 취급
    return { cat: "unknown", source: "conflict", conflict: { indices: tops.map(({ i }) => i), cats } };
  }
  // 3. 모름 — 물음표 유지
  return { cat: "unknown", source: "unknown" };
}

/* 봉투 판정 (방침은 여기서, 봉투 단위로 작동):
   ① 아는 것 중 오늘 배출일이 아닌 게 있으면 → 확실히 반려
   ② 전부 알고 전부 오늘 것 → 통과
   ③ 모르는 게 섞여 있으면 → 방침: pass=통과 쪽 / deny=반려 쪽 / guess=동전 던지기 */
export function bagVerdict(guesses, todayCat, policy = "guess", rng = Math.random) {
  const knownWrong = guesses.some((g) => g.cat !== "unknown" && g.cat !== todayCat);
  if (knownWrong) return { pass: false, reason: "known-wrong" };
  const hasUnknown = guesses.some((g) => g.cat === "unknown");
  if (!hasUnknown) return { pass: true, reason: "all-known" };
  if (policy === "pass") return { pass: true, reason: "policy-pass" };
  if (policy === "deny") return { pass: false, reason: "policy-deny" };
  return { pass: rng() < 0.5, reason: "policy-coin" };
}

/* 도전 1회 실행.
   bags: [[itemId,...], ...], 반환: 정산 통계 전체 */
export function runChallenge(bags, brain, todayCat, rng = Math.random) {
  const perItem = [];
  const bagsOut = [];
  let okBags = 0;
  const ruleStats = brain.rules.map(() => ({ hits: 0, misses: 0 }));
  let regHits = 0, regMisses = 0, conflictCount = 0;

  for (const [bagIndex, bag] of bags.entries()) {
    const guesses = bag.map((id) => ({ id, ...classifyItem(id, brain) }));
    const verdict = bagVerdict(guesses, todayCat, brain.policy || "guess", rng);
    const aiPass = verdict.pass;
    const shouldPass = bag.every((id) => itemOf(id).cat === todayCat);
    if (aiPass === shouldPass) okBags += 1;
    bagsOut.push({ items: [...bag], aiPass, shouldPass, correct: aiPass === shouldPass, reason: verdict.reason });
    for (const g of guesses) {
      g.bagIndex = bagIndex;
      const truth = itemOf(g.id).cat;
      // 모르는 물건은 봉투 판정이 그 물건에 대해 옳았는지로 채점 (통과=오늘 것 취급, 반려=아님 취급)
      const correct = g.cat === "unknown" ? aiPass === (truth === todayCat) : g.cat === truth;
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
    bags: bagsOut, todayCat,
  };
}

/* ── 출제 3단계 ── */

// 도전 1: 완전 대본 — 가르친 물건만으로 구성 (100점 보장)
export function poolTutorial1(brain) {
  return Object.keys(brain.reg);
}

// 도전 2: 반대본 — 봉투마다 "오늘 것으로 아는 물건 1개 + 모르는 신규 2개".
// 아는 것은 전부 오늘 것이라 확실한 반려가 없고, 모르는 것들 때문에 방침(동전)이 승부를 가른다.
export function makeTutorial2Bags(brain, curatedNewIds, bagCount, todayCat, rng = Math.random) {
  const taught = Object.keys(brain.reg);
  const matching = taught.filter((id) => brain.reg[id] === todayCat);
  const anchor = matching.length ? matching : taught;
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const bags = [];
  for (let b = 0; b < bagCount; b += 1) {
    const set = new Set([pick(anchor)]);
    let guard = 0;
    while (set.size < 3 && guard++ < 50) set.add(pick(curatedNewIds));
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
