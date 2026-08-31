/* 조합표 밸런스 자동 검증 (0단계) — node tools/sim-v2.mjs */
import { CATS, FEATURES, ITEMS, DESIGN_RULES, DESIGN_AMBIGUOUS } from "../v2/data.js";

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS" : "FAIL") + "  " + msg); if (!cond) fails++; };
const ids = Object.keys(ITEMS);
const get = (id) => ({ id, name: ITEMS[id][0], cat: ITEMS[id][1], stage: ITEMS[id][2], feats: ITEMS[id][3] });
const all = ids.map(get);

/* 1. 개수 검증 */
ok(Object.keys(FEATURES).length === 21, `특징 21개 (실제 ${Object.keys(FEATURES).length})`);
ok(all.length === 100, `물건 100종 (실제 ${all.length})`);
const catCount = {};
all.forEach((i) => (catCount[i.cat] = (catCount[i.cat] || 0) + 1));
const expectCat = { paper: 22, can: 15, plastic: 25, food: 18, trash: 20 };
for (const c of Object.keys(expectCat))
  ok(catCount[c] === expectCat[c], `${CATS[c]} ${expectCat[c]}종 (실제 ${catCount[c]})`);
const stageAdd = [0, 0, 0, 0, 0];
all.forEach((i) => stageAdd[i.stage]++);
const cum = [stageAdd[1], stageAdd[1] + stageAdd[2], stageAdd[1] + stageAdd[2] + stageAdd[3], all.length];
ok(cum.join("/") === "20/45/72/100", `누계 20/45/72/100 (실제 ${cum.join("/")})`);

/* 2. 속성 개수·유효성 */
for (const i of all) {
  ok(i.feats.length >= 2 && i.feats.length <= 6, `${i.name}: 특징 2~6개 (${i.feats.length})`);
  const bad = i.feats.filter((f) => !FEATURES[f]);
  if (bad.length) ok(false, `${i.name}: 미정의 특징 ${bad}`);
  if (new Set(i.feats).size !== i.feats.length) ok(false, `${i.name}: 특징 중복`);
}
console.log(`(속성 유효성: 전 품목 통과 시 개별 라인 생략)`);

/* 3. 미끼 불변식: 색 3 + 캐릭터가 3개 이상 분류에 걸침 */
for (const decoy of ["red", "blue", "yellow", "chara"]) {
  const cats = new Set(all.filter((i) => i.feats.includes(decoy)).map((i) => i.cat));
  ok(cats.size >= 3, `미끼 [${FEATURES[decoy].name}] ${cats.size}개 분류에 걸침 (${[...cats].map((c) => CATS[c]).join(",")})`);
}

/* 4. 빨강 함정: 1단계에서 빨강 = 콜라캔뿐 */
const redS1 = all.filter((i) => i.stage === 1 && i.feats.includes("red"));
ok(redS1.length === 1 && redS1[0].id === "cola", `1단계 빨강 = 콜라캔뿐 (실제 ${redS1.map((i) => i.name).join(",")})`);

/* 5. 규칙 정답률 궤적 */
const accAt = (rule, maxStage) => {
  const pool = all.filter((i) => i.stage <= maxStage);
  const hit = pool.filter((i) => rule.feats.every((f) => i.feats.includes(f)));
  if (!hit.length) return null;
  return { acc: hit.filter((i) => i.cat === rule.cat).length / hit.length, n: hit.length };
};
console.log("\n규칙 정답률 궤적 (1단계/2단계/3단계/도전):");
for (const r of DESIGN_RULES) {
  const t = [1, 2, 3, 4].map((s) => accAt(r, s));
  const fmt = t.map((x) => (x ? `${Math.round(x.acc * 100)}%(${x.n})` : "—")).join(" → ");
  console.log(`  [${r.label}→${CATS[r.cat]}] ${fmt}  (${r.kind})`);
  const fin = t[3];
  if (r.kind === "gold") ok(fin.acc === 1, `골든 [${r.label}] 최종 100% (실제 ${Math.round(fin.acc * 100)}%)`);
  if (r.kind === "semigold") {
    ok(t[2].acc === 1, `준골든 [${r.label}] 3단계까지 100% (실제 ${Math.round(t[2].acc * 100)}%)`);
    ok(fin.acc < 1 && fin.acc >= 0.85, `준골든 [${r.label}] 도전에서 첫 배신, 85% 이상 (실제 ${Math.round(fin.acc * 100)}%)`);
  }
  if (r.kind === "trap") ok(t[1].acc <= 0.2, `함정 [${r.label}] 2단계에서 붕괴 ≤20% (실제 ${Math.round(t[1].acc * 100)}%)`);
  if (r.kind === "leaky") ok(fin.acc < 1, `누수 [${r.label}] 최종 <100% (실제 ${Math.round(fin.acc * 100)}%)`);
}

/* 6. 애매이: 의도된 규칙 어느 것에도 안 걸림 */
for (const id of DESIGN_AMBIGUOUS) {
  const i = get(id);
  const matched = DESIGN_RULES.filter((r) => r.feats.every((f) => i.feats.includes(f)));
  ok(matched.length === 0, `애매이 ${i.name}: 의도된 규칙 미적중 (걸린 규칙: ${matched.map((r) => r.label).join(",") || "없음"})`);
}

/* 7. 골든 무결점 재확인: 반짝+원통이면서 캔이 아닌 물건 없음 */
const goldBreak = all.filter((i) => i.feats.includes("shiny") && i.feats.includes("cyl") && i.cat !== "can");
ok(goldBreak.length === 0, `[반짝+원통형] 비캔 물건 0 (실제 ${goldBreak.map((i) => i.name).join(",") || "없음"})`);

console.log(fails === 0 ? "\n✅ ALL PASS — 조합표 밸런스 검증 통과" : `\n❌ ${fails}건 실패`);
process.exit(fails ? 1 : 0);
