/* 판정 엔진 v2 단위 테스트 + 설계 곡선 시뮬 — node tools/test-engine-v2.mjs */
import { ITEMS, RULE_SLOTS, TEACH_PER_RUN } from "../v2/data.js?v=24";
import {
  emptyBrain, addRule, classifyItem, runChallenge,
  poolTutorial1, makeTutorial2Bags, poolFree, makeBags, itemOf,
} from "../v2/engine.js?v=24";

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS" : "FAIL") + "  " + msg); if (!cond) fails++; };
// 결정적 rng (mulberry32)
const seeded = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ── 1. 우선순위: 물품 등록 > 규칙 ── */
{
  const b = emptyBrain();
  b.policy = "guess";
  addRule(b, ["shiny", "cyl"], "can");
  b.reg.cola = "paper"; // 일부러 잘못 등록 (garbage in)
  const r = classifyItem("cola", b);
  ok(r.cat === "paper" && r.source === "reg", `등록이 규칙보다 우선 (콜라캔→종이 오답 유지: ${r.cat}/${r.source})`);
}

/* ── 2. 구체성 우선: 2특징 규칙이 1특징 규칙을 이김 ── */
{
  const b = emptyBrain();
  b.policy = "deny";
  addRule(b, ["red"], "can");            // 함정 규칙
  addRule(b, ["red", "cyl"], "plastic"); // 더 구체적
  const r = classifyItem("ketchup", b); // 케첩통: red+cyl+...
  ok(r.cat === "plastic" && r.source === "rule", `구체성 우선 (케첩통: ${r.cat})`);
}

/* ── 3. 동점 불일치 = 혼란 → 방침 처리 + 충돌 기록 ── */
{
  const b = emptyBrain();
  b.policy = "deny";
  addRule(b, ["blue", "hard"], "plastic");
  addRule(b, ["shiny", "cyl"], "can");
  const r = classifyItem("cider", b); // 사이다캔: blue,cyl,shiny,cold,hard → 2:2 동점
  ok(!!r.conflict && r.cat === "unknown", `동점 혼란 → 모름 + 충돌 기록 (${JSON.stringify(r.conflict?.cats)})`);
}

/* ── 4. 모름 → 무조건 통과 (봉투 단위) ── */
{
  const b = emptyBrain();
  ok(classifyItem("basin", b).cat === "unknown", "모르는 물건 → unknown (분류를 지어내지 않음)");
  const { bagVerdict } = await import("../v2/engine.js?v=24");
  ok(bagVerdict([{ cat: "unknown" }], "can").pass === true, "모르는 봉투 → 무조건 통과");
  ok(bagVerdict([{ cat: "can" }, { cat: "unknown" }], "can").pass === true, "아는 것 다 맞고 + 모름 → 통과");
  ok(bagVerdict([{ cat: "paper" }, { cat: "unknown" }], "can").pass === false, "아는 것이 오늘 것 아니면 확실 반려");
  ok(bagVerdict([{ cat: "can" }, { cat: "can" }], "can").reason === "all-known", "전부 알고 맞음 → all-known 통과");
}

/* ── 5. 규칙 슬롯 8 제한·중복 방지 ── */
{
  const b = emptyBrain();
  for (let i = 0; i < RULE_SLOTS; i++) ok0(addRule(b, ["red", ["cyl","flat","box","shiny","clear","hard","light","wet"][i]], "can").ok);
  function ok0(v) { if (!v) { ok(false, "슬롯 채우기 중 실패"); } }
  ok(addRule(b, ["blue"], "can").reason === "slots", `9번째 규칙 거부 (슬롯 ${RULE_SLOTS})`);
  const b2 = emptyBrain();
  addRule(b2, ["shiny", "cyl"], "can");
  ok(addRule(b2, ["cyl", "shiny"], "plastic").reason === "dup", "순서 무관 중복 조합 거부");
}

/* ── 6. 설계 곡선 시뮬: 튜토리얼 → 튜닝 루프 ── */
{
  const rng = seeded(42);
  const b = emptyBrain();
  b.policy = "guess";
  // 오리엔테이션: 3개 등록 (1단계 물건)
  b.reg.cola = "can"; b.reg.newspaper = "paper"; b.reg.pet = "plastic";
  ok(Object.keys(b.reg).length === TEACH_PER_RUN, "오리엔테이션 등록 3개");

  // 도전 1: 완전 대본 — 가르친 것만
  const c1 = runChallenge(makeBags(poolTutorial1(b), "can", 5, rng), b, "can", rng);
  ok(c1.score === 100 && c1.bagAcc === 1, `도전 1 = 100점 보장 (실제 ${c1.score}점, 봉투 ${Math.round(c1.bagAcc * 100)}%)`);

  // 도전 2: 반대본 — 봉투마다 가르친 2 + 지정 신규 2 (신규는 오늘 배출일이 아닌 것 위주)
  const curated = ["magazine", "waterbottle", "banana", "cider"];
  let sum = 0, runs = 40;
  for (let k = 0; k < runs; k++) {
    const r = seeded(100 + k);
    sum += runChallenge(makeTutorial2Bags(b, curated, 5, "can", r), b, "can", r).itemAcc;
  }
  const c2avg = sum / runs;
  ok(c2avg > 0.15 && c2avg < 0.6, `도전 2 = 좌절 구간 15~60% (평균 ${Math.round(c2avg * 100)}%) — 모름=오답 채점`);

  // 특징 개방 후: 골든 규칙 3개 등록 → 무한 풀에서 성능 상승
  addRule(b, ["shiny", "cyl"], "can");
  addRule(b, ["fsmell"], "food");
  addRule(b, ["stain"], "trash");
  let sum3 = 0;
  for (let k = 0; k < runs; k++) {
    const r = seeded(200 + k);
    sum3 += runChallenge(makeBags(poolFree(4), "can", 8, r), b, "can", r).itemAcc;
  }
  const freeAcc1 = sum3 / runs;

  // 튜닝 심화: 좋은 규칙만 추가, 방침 유지 (방침을 반려로 바꾸면 오늘 배출일 위주 봉투에서
  // 억울한 반려가 급증해 오히려 하락 — v1의 방침 트레이드오프가 시뮬로 재현됨, 설계 의도)
  addRule(b, ["crumple", "text"], "paper");
  addRule(b, ["clear", "cyl"], "plastic");
  let sum4 = 0;
  for (let k = 0; k < runs; k++) {
    const r = seeded(300 + k);
    sum4 += runChallenge(makeBags(poolFree(4), "can", 8, r), b, "can", r).itemAcc;
  }
  const freeAcc2 = sum4 / runs;
  console.log(`  튜닝 곡선: 골든 3규칙 ${Math.round(freeAcc1 * 100)}% → 좋은 규칙 2개 추가 ${Math.round(freeAcc2 * 100)}%`);
  ok(freeAcc2 > freeAcc1, "튜닝할수록 성능 상승");
  ok(freeAcc2 > 0.6, `규칙 5개로 60%+ 도달 (실제 ${Math.round(freeAcc2 * 100)}%) — 나머지는 낱개 등록으로 채움`);

  // 과잉 개별화 방해: 미끼 좁은 규칙 추가 → 성능 하락
  const b3 = JSON.parse(JSON.stringify(b));
  addRule(b3, ["blue", "hard"], "plastic"); // 세숫대야용 좁은 규칙 — 사이다캔·햄통조림 등과 충돌
  addRule(b3, ["red"], "can");              // 빨강 함정 규칙
  let sum5 = 0;
  for (let k = 0; k < runs; k++) {
    const r = seeded(300 + k); // 동일 시드로 공정 비교
    sum5 += runChallenge(makeBags(poolFree(4), "can", 8, r), b3, "can", r).itemAcc;
  }
  const overfitAcc = sum5 / runs;
  console.log(`  과잉 개별화: ${Math.round(freeAcc2 * 100)}% → 좁은 규칙 2개 추가 후 ${Math.round(overfitAcc * 100)}%`);
  ok(overfitAcc < freeAcc2, "좁은 미끼 규칙이 전체 성능을 깎음 (방해 메커니즘 작동)");
}

/* ── 7. 규칙 성적표 통계 ── */
{
  const rng = seeded(7);
  const b = emptyBrain();
  b.policy = "deny";
  addRule(b, ["fsmell"], "food");
  const res = runChallenge(makeBags(poolFree(4), "food", 8, rng), b, "food", rng);
  const st = res.ruleStats[0];
  ok(st.hits > 0, `규칙 성적표 집계 (음식냄새 규칙: ${st.hits}맞힘/${st.misses}틀림)`);
}

console.log(fails === 0 ? "\n✅ ALL PASS — 엔진 v2 검증 통과" : `\n❌ ${fails}건 실패`);
process.exit(fails ? 1 : 0);
