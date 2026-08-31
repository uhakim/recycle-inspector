/* ═══════════ 분리수거 검사관 v2 — 2단계: 수첩 두 탭 + 간이 튜닝 루프 ═══════════
   (도전·정산은 간이 계산판 — 3단계에서 창구 연출·튜토리얼로 교체) */

import { CATS, FEATURES, ITEMS, RULE_SLOTS, TEACH_PER_RUN } from "./data.js";
import {
  emptyBrain, addRule, removeRule, runChallenge, itemOf, poolFree, makeBags,
} from "./engine.js";

const BRAIN_KEY = "rv2-brain", META_KEY = "rv2-meta", HIST_KEY = "rv2-hist";
const $ = (id) => document.getElementById(id);

/* ── 상태 ── */
function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fallback; }
  catch { return fallback; }
}
const brain = Object.assign(emptyBrain(), load(BRAIN_KEY, {}));
if (!brain.policy) brain.policy = "guess";
const meta = load(META_KEY, {});      // itemId → 가르칠 때 고른 특징들
let history = load(HIST_KEY, []);     // [{n, score, reg, rules, policy}]
let teachBudget = TEACH_PER_RUN;      // 도전 1회당 가르치기 예산
let lastResult = null;
let teaching = null;                   // { itemId, cat }

function save() {
  localStorage.setItem(BRAIN_KEY, JSON.stringify(brain));
  localStorage.setItem(META_KEY, JSON.stringify(meta));
  localStorage.setItem(HIST_KEY, JSON.stringify(history));
}

/* ── 홈 ── */
function renderHome() {
  const best = history.length ? Math.max(...history.map((h) => h.score)) : null;
  const last = history[history.length - 1];
  $("homeStats").innerHTML = [
    `📒 외운 물건 ${Object.keys(brain.reg).length}개 · 📐 규칙 ${brain.rules.length}/${RULE_SLOTS}`,
    history.length ? `🚛 도전 ${history.length}회 · 최고 <b style="color:var(--green-deep)">${best}점</b> · 최근 ${last.score}점` : "아직 도전 기록이 없어요",
  ].join("<br/>");
}

/* ── 도전 (간이) ── */
function runNow() {
  const maxStage = Number($("stageSel").value);
  const todayCat = $("todaySel").value;
  const bags = makeBags(poolFree(maxStage), todayCat, 8);
  lastResult = runChallenge(bags, brain, todayCat);
  teachBudget = TEACH_PER_RUN;
  history.push({
    n: history.length + 1, score: lastResult.score,
    reg: Object.keys(brain.reg).length, rules: brain.rules.length, policy: brain.policy,
  });
  save();
  renderReport(todayCat);
  $("home").classList.add("hidden");
  $("report").classList.remove("hidden");
}

function renderReport(todayCat) {
  const r = lastResult;
  $("score").textContent = `${r.score}점`;
  $("scoreSub").textContent = `물건 ${r.perItem.length}개 · 봉투 정확도 ${Math.round(r.bagAcc * 100)}% · ${history.length}회차`;
  const ruleHits = r.ruleStats.reduce((a, s) => a + s.hits, 0);
  const ruleMiss = r.ruleStats.reduce((a, s) => a + s.misses, 0);
  $("srcStats").innerHTML =
    `📒 외운 물건으로 맞힘 <b>${r.regHits}</b> · 📐 규칙으로 맞힘 <b>${ruleHits}</b> (틀리게 함 ${ruleMiss})` +
    (r.conflictCount ? ` · <span class="conflict">🤯 규칙 싸움 ${r.conflictCount}회</span>` : "");
  renderWrongList();
  // 규칙별 성적
  $("ruleReport").innerHTML = brain.rules.length
    ? "📐 규칙 성적: " + brain.rules.map((rule, i) => {
        const s = r.ruleStats[i];
        return `<span>[${rule.feats.map((f) => FEATURES[f].icon).join("")}→${CATS[rule.cat]}] ` +
          `${s.hits}맞힘${s.misses ? `·<span class="bad">${s.misses}틀림</span>` : ""}</span>`;
      }).join(" &nbsp; ")
    : `<span class="cnt">아직 규칙이 없어요 — 수첩의 [🧠 특징] 탭에서 만들 수 있어요</span>`;
}

function renderWrongList() {
  const wrong = [...new Map(lastResult.perItem.filter((p) => !p.correct).map((p) => [p.id, p])).values()];
  $("teachBudget").textContent = `가르치기 ${TEACH_PER_RUN - teachBudget}/${TEACH_PER_RUN}`;
  $("wrongList").innerHTML = wrong.length
    ? wrong.map((p) => {
        const it = itemOf(p.id);
        const taught = !!brain.reg[p.id];
        const said = p.cat === "reject" ? "반려" : CATS[p.cat] || "?";
        return `<button class="wrong-item ${taught ? "taught" : ""}" data-t="${p.id}" ${taught ? "disabled" : ""}>
          ${it.name} <small>(${said}라고 함)</small>${taught ? " ✔" : ""}</button>`;
      }).join("")
    : `<span class="cnt">✨ 틀린 게 없어요! 완벽!</span>`;
  document.querySelectorAll("[data-t]").forEach((b) =>
    b.addEventListener("click", () => {
      if (teachBudget <= 0) { alert(`재활용이는 한 번에 ${TEACH_PER_RUN}개밖에 못 외워요! 다시 도전한 뒤 가르쳐 주세요.`); return; }
      openTeach(b.dataset.t);
    }));
}

/* ── 가르치기: 분류 → 특징 근거 ── */
function openTeach(itemId) {
  teaching = { itemId, cat: null, feats: [] };
  const it = itemOf(itemId);
  $("teachName").textContent = it.name;
  $("teachStep1").classList.remove("hidden");
  $("teachStep2").classList.add("hidden");
  $("teach").classList.remove("hidden");
}
document.querySelectorAll(".cat-btn").forEach((b) =>
  b.addEventListener("click", () => {
    if (!teaching) return;
    teaching.cat = b.dataset.cat;
    // 2단계: 그 물건이 실제 가진 특징만 제시
    const it = itemOf(teaching.itemId);
    $("teachFeats").innerHTML = it.feats.map((f) =>
      `<span class="chip" data-tf="${f}">${FEATURES[f].icon} ${FEATURES[f].name}</span>`).join("");
    document.querySelectorAll("[data-tf]").forEach((ch) =>
      ch.addEventListener("click", () => {
        const f = ch.dataset.tf;
        if (teaching.feats.includes(f)) teaching.feats = teaching.feats.filter((x) => x !== f);
        else if (teaching.feats.length < 2) teaching.feats.push(f);
        document.querySelectorAll("[data-tf]").forEach((c) =>
          c.classList.toggle("sel", teaching.feats.includes(c.dataset.tf)));
        $("teachDone").disabled = teaching.feats.length === 0;
      }));
    $("teachStep1").classList.add("hidden");
    $("teachStep2").classList.remove("hidden");
    $("teachDone").disabled = true;
  }));
$("teachDone").addEventListener("click", () => {
  brain.reg[teaching.itemId] = teaching.cat;
  meta[teaching.itemId] = teaching.feats;
  teachBudget -= 1;
  save();
  $("teach").classList.add("hidden");
  if (lastResult) renderWrongList();
  teaching = null;
});
$("teachCancel").addEventListener("click", () => { teaching = null; $("teach").classList.add("hidden"); });

/* ── 수첩: 물건 탭 ── */
function renderItemsPane() {
  $("itemCols").innerHTML = Object.keys(CATS).map((cat) => {
    const chips = Object.keys(brain.reg)
      .filter((id) => brain.reg[id] === cat && ITEMS[id])
      .map((id) => {
        const icons = (meta[id] || []).map((f) => FEATURES[f].icon).join("");
        return `<div class="ichip">${itemOf(id).name} <span class="fi">${icons}</span></div>`;
      }).join("") || `<div class="none">아직 없음</div>`;
    return `<div class="icol"><span class="icol-title c-${cat}">${CATS[cat]}</span>${chips}</div>`;
  }).join("");
  const unknown = Object.keys(ITEMS).filter((id) => !brain.reg[id]).length;
  $("mysteryRow").innerHTML = unknown
    ? Array.from({ length: unknown }, () => `<span class="mq">?</span>`).join("")
    : `<b>모든 물건을 다 외웠어요! 🎉</b>`;
}

/* ── 수첩: 특징 탭 ── */
let selFeats = [];
function renderFeatsPane() {
  // 도감 (감각기관별)
  const groups = { eye: "👀 눈", hand: "✋ 손", nose: "👃 코" };
  $("featDex").innerHTML = Object.keys(groups).map((g) =>
    `<div class="dex-sense">${groups[g]}</div>` +
    Object.keys(FEATURES).filter((f) => FEATURES[f].sense === g)
      .map((f) => `<span class="dex-chip">${FEATURES[f].icon} ${FEATURES[f].name}</span>`).join("")
  ).join("");
  // 관찰 노트: 가르칠 때 고른 특징 → 분류 집계
  const agg = {};
  for (const id of Object.keys(meta)) {
    if (!brain.reg[id]) continue;
    for (const f of meta[id]) {
      agg[f] = agg[f] || {};
      agg[f][brain.reg[id]] = (agg[f][brain.reg[id]] || 0) + 1;
    }
  }
  const aggKeys = Object.keys(agg);
  $("featAgg").innerHTML = aggKeys.length
    ? aggKeys.map((f) => {
        const cats = Object.keys(agg[f]);
        const parts = cats.map((c) => `${CATS[c]} ${agg[f][c]}개`).join(", ");
        return `${FEATURES[f].icon} <b>${FEATURES[f].name}</b>를 고른 물건 → ${parts}` +
          (cats.length > 1 ? ` <span class="warn">⚠ 여러 분류에 걸쳐요!</span>` : "");
      }).join("<br/>")
    : `<span class="cnt">아직 없어요. 가르칠 때 특징을 고르면 여기에 쌓여요.</span>`;
  // 규칙 조립기
  $("ruleChips").innerHTML = Object.keys(FEATURES).map((f) =>
    `<span class="chip ${selFeats.includes(f) ? "sel" : ""}" data-rf="${f}">${FEATURES[f].icon} ${FEATURES[f].name}</span>`).join("");
  document.querySelectorAll("[data-rf]").forEach((ch) =>
    ch.addEventListener("click", () => {
      const f = ch.dataset.rf;
      selFeats = selFeats.includes(f) ? selFeats.filter((x) => x !== f)
        : selFeats.length < 3 ? [...selFeats, f] : selFeats;
      renderFeatsPane();
    }));
  renderRuleCards();
}

function renderRuleCards() {
  $("slotGauge").textContent = `머리 용량 ${brain.rules.length}/${RULE_SLOTS}`;
  $("ruleCards").innerHTML = brain.rules.map((r, i) => {
    const st = lastResult?.ruleStats?.[i];
    const stat = st ? ` <small>최근: <span class="stat-good">${st.hits}맞힘</span>${st.misses ? ` · <span class="stat-bad">${st.misses}틀림</span>` : ""}</small>` : "";
    return `<div class="rule-card"><span>📐 ${r.feats.map((f) => FEATURES[f].icon + FEATURES[f].name).join(" + ")}
      → <b>${CATS[r.cat]}</b>${stat}</span><button class="rule-del" data-rd="${i}">×</button></div>`;
  }).join("") || `<div class="cnt" style="margin-top:6px">아직 규칙이 없어요. 위에서 특징을 골라 만들어 보세요!</div>`;
  document.querySelectorAll("[data-rd]").forEach((b) =>
    b.addEventListener("click", () => { removeRule(brain, Number(b.dataset.rd)); save(); renderFeatsPane(); }));
}

$("ruleAdd").addEventListener("click", () => {
  if (!selFeats.length) return;
  const res = addRule(brain, selFeats, $("ruleCat").value);
  if (!res.ok) {
    alert(res.reason === "slots"
      ? `재활용이 머리에는 규칙이 ${RULE_SLOTS}개까지만 들어가요! 덜 쓰는 규칙을 지워 주세요.`
      : "이미 같은 특징 조합의 규칙이 있어요!");
    return;
  }
  selFeats = []; save(); renderFeatsPane();
});

/* ── 방침 ── */
const POLICIES = { pass: "🙂 일단 통과", deny: "🛑 일단 반려", guess: "🎲 찍어볼게" };
function renderPolicy() {
  $("policyRow").innerHTML = Object.keys(POLICIES).map((k) =>
    `<span class="chip pol ${brain.policy === k ? "sel" : ""}" data-pol="${k}">${POLICIES[k]}</span>`).join("");
  document.querySelectorAll("[data-pol]").forEach((ch) =>
    ch.addEventListener("click", () => { brain.policy = ch.dataset.pol; save(); renderPolicy(); }));
}

/* ── 수첩 열기/탭 ── */
function openNotebook() {
  renderItemsPane(); renderFeatsPane(); renderPolicy();
  $("nbOverlay").classList.remove("hidden");
}
$("tabItems").addEventListener("click", () => switchTab(true));
$("tabFeats").addEventListener("click", () => switchTab(false));
function switchTab(items) {
  $("tabItems").classList.toggle("active", items);
  $("tabFeats").classList.toggle("active", !items);
  $("paneItems").classList.toggle("hidden", !items);
  $("paneFeats").classList.toggle("hidden", items);
}
$("nbClose").addEventListener("click", () => { $("nbOverlay").classList.add("hidden"); renderHome(); });
$("nbOverlay").addEventListener("click", (e) => { if (e.target === $("nbOverlay")) { $("nbOverlay").classList.add("hidden"); renderHome(); } });

/* ── 배선 ── */
$("todaySel").innerHTML = Object.keys(CATS).filter((c) => c !== "trash")
  .map((c) => `<option value="${c}">오늘: ${CATS[c]}</option>`).join("");
$("ruleCat").innerHTML = Object.keys(CATS).map((c) => `<option value="${c}">${CATS[c]}</option>`).join("");
$("challengeBtn").addEventListener("click", runNow);
$("notebookBtn").addEventListener("click", openNotebook);
$("reportNotebook").addEventListener("click", openNotebook);
$("reportRetry").addEventListener("click", runNow);
$("reportHome").addEventListener("click", () => { $("report").classList.add("hidden"); $("home").classList.remove("hidden"); renderHome(); });
$("resetBtn").addEventListener("click", () => {
  if (!confirm("외운 물건, 규칙, 방침, 도전 기록을 모두 지울까요?")) return;
  localStorage.removeItem(BRAIN_KEY); localStorage.removeItem(META_KEY); localStorage.removeItem(HIST_KEY);
  location.reload();
});
renderHome();
