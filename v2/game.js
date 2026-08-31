/* ═══════════ 분리수거 검사관 v2 — 3단계: 서사(튜토리얼) + 근무 씬 연출 ═══════════ */

import { CATS, FEATURES, ITEMS, RULE_SLOTS, TEACH_PER_RUN } from "./data.js";
import {
  emptyBrain, addRule, removeRule, runChallenge, itemOf,
  poolTutorial1, makeTutorial2Bags, poolFree, makeBags,
} from "./engine.js";
import { Sound, PEOPLE, AI_SVG, ITEM_PLACEHOLDER } from "./assets.js";
import { ART } from "./art.js";
const art = (id) => ART[id] || ITEM_PLACEHOLDER;

const BRAIN_KEY = "rv2-brain", HIST_KEY = "rv2-hist", PHASE_KEY = "rv2-phase", HB_KEY = "rv2-humanBest";
const $ = (id) => document.getElementById(id);

/* ── 상태 ── */
function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fallback; }
  catch { return fallback; }
}
const brain = Object.assign(emptyBrain(), load(BRAIN_KEY, {}));
let history = load(HIST_KEY, []);
let phase = load(PHASE_KEY, "orient"); // orient | c1 | c2 | free
let humanBest = load(HB_KEY, null);
let teachBudget = TEACH_PER_RUN;
let lastResult = null;
let teaching = null;
let lastMode = "ai";
function setStamps(on) { $("stampPass").disabled = !on; $("stampDeny").disabled = !on; }

function save() {
  localStorage.setItem(BRAIN_KEY, JSON.stringify(brain));
  localStorage.setItem(HIST_KEY, JSON.stringify(history));
  localStorage.setItem(PHASE_KEY, JSON.stringify(phase));
}

/* ── 연출 유틸 ── */
let speed = 1;           // 1 보통, 0.45 빠름
let skipAll = false;
const wait = (ms) => new Promise((r) => setTimeout(r, skipAll ? 0 : ms * speed));
const syl = (text) => Math.max(3, Math.min(11, Math.round(text.replace(/[^가-힣a-zA-Z]/g, "").length * 0.5)));
function aiSay(text) {
  if (skipAll) return;
  $("aiSpeechText").textContent = text;
  $("aiSpeech").classList.remove("hidden");
  Sound.robo(syl(text));
}
function personSay(person) {
  if (skipAll) return;
  const line = person.lines[Math.floor(Math.random() * person.lines.length)];
  $("pSpeechText").textContent = line;
  $("pSpeech").classList.remove("hidden");
  Sound.mumble(person.voice, syl(line));
}

/* ── 도전 실행 (연출 포함) ── */
function prepareRun() {
  if (phase === "c1") {
    const pool = poolTutorial1(brain);
    return { bags: makeBags(pool, "paper", 4), todayCat: "paper" };
  }
  if (phase === "c2") {
    const curated = Object.keys(ITEMS).filter((id) =>
      !brain.reg[id] && itemOf(id).stage <= 2 && itemOf(id).cat !== "paper")
      .sort(() => Math.random() - 0.5).slice(0, 8);
    return { bags: makeTutorial2Bags(brain, curated, 5), todayCat: "paper" };
  }
  const today = ["paper", "can", "food", "plastic"][Math.floor(Math.random() * 4)];
  return { bags: makeBags(poolFree(4), today, 5), todayCat: today };
}

async function playChallenge() {
  Sound.ready();
  const { bags, todayCat } = prepareRun();
  const result = runChallenge(bags, brain, todayCat);
  lastResult = result;
  skipAll = false;

  // 씬 준비
  lastMode = "ai";
  $("home").classList.add("hidden");
  $("report").classList.add("hidden");
  $("work").classList.remove("hidden");
  $("noticeCat").textContent = CATS[todayCat];
  $("bagTotal").textContent = result.bags.length;
  $("scoreChip").classList.add("hidden");
  $("speedBtn").classList.remove("hidden");
  $("skipBtn").classList.remove("hidden");
  document.querySelector(".ai-zone").classList.remove("hidden");
  setStamps(false);
  $("bagBtn").classList.add("hidden");
  $("aiAvatar").innerHTML = AI_SVG;
  aiSay(phase === "c1" ? "첫 출근! 수첩 보면서 열심히 할게요!" : "오늘도 열심히 하겠습니다!");
  await wait(1100);

  for (let b = 0; b < result.bags.length; b += 1) {
    if (skipAll) break;
    const bag = result.bags[b];
    const person = PEOPLE[(history.length + b) % PEOPLE.length];
    $("bagNo").textContent = b + 1;
    $("itemRow").innerHTML = "";
    $("verdict").classList.add("hidden");
    $("aiSpeech").classList.add("hidden");

    // 주민 등장
    $("personSlot").innerHTML = person.svg;
    await wait(560);
    personSay(person);
    await wait(1200);
    $("pSpeech").classList.add("hidden");

    // 봉투 등장 → 재활용이가 촥 연다
    $("bagHint").textContent = "";
    $("bagBtn").classList.remove("hidden");
    await wait(620);
    $("bagBtn").classList.add("hidden");
    Sound.paper();
    const guesses = result.perItem.filter((p) => p.bagIndex === b);
    $("itemRow").innerHTML = guesses.map((g, i) => {
      const it = itemOf(g.id);
      return `<div class="icard" id="card${b}-${i}" style="animation-delay:${i * 0.08}s">
        ${art(g.id)}<span class="iname">${it.name}</span><span class="itag" id="tag${b}-${i}">?</span></div>`;
    }).join("");
    await wait(guesses.length * 90 + 380);

    // 물건별 판정
    $("aiAvatar").classList.add("thinking");
    for (let i = 0; i < guesses.length; i += 1) {
      if (skipAll) break;
      const g = guesses[i];
      const it = itemOf(g.id);
      document.querySelectorAll(".icard").forEach((c) => c.classList.remove("inspecting"));
      const card = $(`card${b}-${i}`);
      if (card) card.classList.add("inspecting");
      const tag = $(`tag${b}-${i}`);
      const catName = g.cat === "reject" ? "반려" : CATS[g.cat];
      if (g.source === "reg") {
        aiSay(`${it.name}! 수첩에 있어요 — ${catName}!`);
        if (tag) tag.className = "itag t-reg", tag.textContent = catName;
      } else if (g.source === "rule") {
        const feats = brain.rules[g.ruleIndex].feats.map((f) => FEATURES[f].name).join("+");
        aiSay(`${it.name}… 규칙이다! ${feats}는 ${catName}!`);
        if (tag) tag.className = "itag t-rule", tag.textContent = `📐 ${catName}`;
      } else if (g.conflict) {
        aiSay(`으악, ${it.name}에서 규칙 두 개가 싸워요! 🤯 방침대로 할게요…`);
        if (tag) tag.className = "itag t-conflict", tag.textContent = `🤯 ${catName}`;
      } else if (g.source === "policy-pass") {
        aiSay(`${it.name}…? 몰라요. 방침대로 일단 통과!`);
        if (tag) tag.className = "itag t-policy", tag.textContent = `🙂 ${catName}`;
      } else if (g.source === "policy-deny") {
        aiSay(`${it.name}…? 모르는 건 방침대로 반려!`);
        if (tag) tag.className = "itag t-policy", tag.textContent = `🛑 반려`;
      } else {
        aiSay(`${it.name}…? 🎲 ${catName} 아닐까요?`);
        Sound.dice();
        if (tag) tag.className = "itag t-policy", tag.textContent = `🎲 ${catName}`;
      }
      await wait(g.source === "reg" ? 850 : 1050);
    }
    $("aiAvatar").classList.remove("thinking");

    // 봉투 판정 도장
    if (!skipAll) {
      aiSay(bag.aiPass ? `전부 ${CATS[todayCat]}! 통과입니다!` : `${CATS[todayCat]} 아닌 게 있어요! 반려!`);
      await wait(700);
      Sound.stamp();
      const stampEl = bag.aiPass ? $("stampPass") : $("stampDeny");
      stampEl.classList.add("slammed");
      setTimeout(() => stampEl.classList.remove("slammed"), 240);
      $("verdict").className = `ink ${bag.aiPass ? "pass" : "deny"} slam`;
      $("verdictText").textContent = bag.aiPass ? "통과" : "반려";
      $("verdict").classList.remove("hidden");
      await wait(750);
      const p = document.querySelector(".person");
      if (p) p.classList.add("leave");
      await wait(420);
    }
  }

  // 정산으로
  $("work").classList.add("hidden");
  teachBudget = TEACH_PER_RUN;
  history.push({
    n: history.length + 1, score: result.score, phase, today: todayCat,
    policy: brain.policy,
    regIds: Object.keys(brain.reg),
    rulesSnap: brain.rules.map((r) => ({ f: [...r.feats], c: r.cat })),
    reg: Object.keys(brain.reg).length, rules: brain.rules.length,
  });
  save();
  renderReport();
  $("report").classList.remove("hidden");
  if (result.score === 100) Sound.good();
}

/* ── 훈련 기록 (튜닝 히스토리) ── */
// 구글폼 연동: 유하님이 폼을 만들면 url과 entry ID만 채우면 됨
const FORM = { url: "", entries: { tries: "", best: "", rules: "", policy: "" } };

const ruleKey = (r) => [...r.f].sort().join("+") + "→" + r.c;
const ruleLabel = (r) => r.f.map((f) => FEATURES[f].icon + FEATURES[f].name).join("+") + "→" + CATS[r.c];

function runDiff(i) {
  const cur = history[i], prev = history[i - 1];
  if (!cur.rulesSnap) return null; // 구버전 기록
  if (!prev || !prev.rulesSnap) {
    return { added: cur.rulesSnap, removed: [], newReg: cur.regIds?.length ?? 0, policyChanged: false, first: true };
  }
  const pk = new Set(prev.rulesSnap.map(ruleKey));
  const ck = new Set(cur.rulesSnap.map(ruleKey));
  return {
    added: cur.rulesSnap.filter((r) => !pk.has(ruleKey(r))),
    removed: prev.rulesSnap.filter((r) => !ck.has(ruleKey(r))),
    newReg: (cur.regIds?.length ?? 0) - (prev.regIds?.length ?? 0),
    policyChanged: prev.policy !== cur.policy,
    first: false,
  };
}

let histSel = -1;
function renderHistory() {
  if (!history.length) {
    $("histChart").innerHTML = `<span class="cnt">아직 재활용이 도전 기록이 없어요.</span>`;
    $("histDetail").innerHTML = "";
    $("reflectCard").innerHTML = "🤖 도전을 하면 여기에 성장 그래프가 그려져요!";
    $("formBtn").classList.add("hidden");
    return;
  }
  // 최고 기록·성찰은 자유 도전(free)만 대상 — 튜토리얼 대본 100점 제외
  const freeIdxs = history.map((h, i) => (h.phase === "free" ? i : -1)).filter((i) => i >= 0);
  const scoreIdxs = freeIdxs.length ? freeIdxs : history.map((_, i) => i);
  const best = Math.max(...scoreIdxs.map((i) => history[i].score));
  const bestIdx = scoreIdxs.find((i) => history[i].score === best);
  if (histSel < 0 || histSel >= history.length) histSel = history.length - 1;
  $("histChart").innerHTML = history.map((h, i) => {
    const tut = h.phase !== "free";
    return `<button class="hist-bar ${!tut && h.score === best ? "best" : ""} ${tut ? "tut" : ""} ${i === histSel ? "sel" : ""}"
       data-h="${i}" style="height:${Math.max(14, h.score)}%">
       ${i === bestIdx ? '<span class="star">⭐</span>' : ""}${h.score}</button>`;
  }).join("");
  document.querySelectorAll("[data-h]").forEach((b) =>
    b.addEventListener("click", () => { histSel = Number(b.dataset.h); renderHistory(); }));
  // 상세 + 변경점
  const h = history[histSel];
  const d = runDiff(histSel);
  let diffHtml = "";
  if (d) {
    const parts = [];
    if (d.first) parts.push(`시작 — 외운 것 ${d.newReg}개로 출발`);
    else {
      if (d.added.length) parts.push(`<span class="diff-add">+ 규칙 ${d.added.map(ruleLabel).join(", ")}</span>`);
      if (d.removed.length) parts.push(`<span class="diff-del">− 규칙 ${d.removed.map(ruleLabel).join(", ")}</span>`);
      if (d.newReg > 0) parts.push(`<span class="diff-add">+ 새로 외움 ${d.newReg}개</span>`);
      if (d.policyChanged) parts.push(`방침 변경 → ${({pass:"일단 통과",deny:"일단 반려",guess:"찍어볼게"})[h.policy]}`);
      if (!parts.length) parts.push("바꾼 것 없이 재도전");
    }
    const prevScore = histSel > 0 ? history[histSel - 1].score : null;
    const delta = prevScore === null ? "" :
      ` <b>(${h.score - prevScore >= 0 ? "+" : ""}${h.score - prevScore}점)</b>`;
    diffHtml = `🔧 이번에 바꾼 것: ${parts.join(" · ")}${delta}`;
  }
  $("histDetail").innerHTML = `
    <b>${h.n}회차 — ${h.score}점</b>${h.phase !== "free" ? ' <span class="cnt">🎓튜토리얼</span>' : ""} <span class="cnt">(${CATS[h.today] || ""} 날 · 방침 ${({pass:"🙂통과",deny:"🛑반려",guess:"🎲찍기"})[h.policy] || "-"})</span><br/>
    📒 외운 것 ${h.reg}개 · 📐 규칙 ${h.rulesSnap ? h.rulesSnap.length : h.rules}개
    ${h.rulesSnap && h.rulesSnap.length ? "<br/>" + h.rulesSnap.map((r) => `<span class="hchip">📐${ruleLabel(r)}</span>`).join(" ") : ""}
    ${diffHtml ? "<br/>" + diffHtml : ""}`;
  // 성찰 카드
  const bh = history[bestIdx];
  const bd = runDiff(bestIdx);
  const bestChange = bd && !bd.first
    ? (bd.added.length ? `규칙 [${bd.added.map(ruleLabel).join(", ")}]을 만들었을 때` :
       bd.newReg > 0 ? `${bd.newReg}개를 새로 가르쳤을 때` :
       bd.policyChanged ? "방침을 바꿨을 때" : "그대로 다시 했을 때")
    : "처음 가르친 것으로";
  $("reflectCard").innerHTML = (freeIdxs.length ? "" : "🎓 아직 튜토리얼 기록뿐이에요 — 자유 도전을 해보세요!<br/>") +
    `✏️ <b>생각해 보기</b> — 최고 기록은 <b>${bestIdx + 1}회차 ${best}점</b>, ${bestChange} 나왔어요.<br/>` +
    `① 점수가 가장 많이 오른 건 몇 회차? 그때 무엇을 바꿨나요?<br/>` +
    `② 점수를 떨어뜨린 규칙이 있었나요? 왜 그랬을까요?<br/>` +
    `→ 활동지에 옮겨 적어 보세요!`;
  // 구글폼
  if (FORM.url) {
    $("formBtn").classList.remove("hidden");
    $("formBtn").onclick = () => {
      const q = new URLSearchParams();
      if (FORM.entries.tries) q.set(FORM.entries.tries, history.length);
      if (FORM.entries.best) q.set(FORM.entries.best, best);
      if (FORM.entries.rules) q.set(FORM.entries.rules, (bh.rulesSnap || []).map(ruleLabel).join(" / "));
      if (FORM.entries.policy) q.set(FORM.entries.policy, bh.policy);
      window.open(`${FORM.url}?usp=pp_url&${q.toString()}`, "_blank");
    };
  } else {
    $("formBtn").classList.add("hidden");
  }
}
function openHistory() {
  histSel = history.length - 1;
  renderHistory();
  $("histOverlay").classList.remove("hidden");
}
$("histBtn").addEventListener("click", () => { Sound.ready(); openHistory(); });
$("reportHist").addEventListener("click", openHistory);
$("histClose").addEventListener("click", () => $("histOverlay").classList.add("hidden"));
$("histOverlay").addEventListener("click", (e) => { if (e.target === $("histOverlay")) $("histOverlay").classList.add("hidden"); });

/* ── 사람 모드: 내가 검사관 (v1 방식 — 봉투 톡, 도장 쾅) ── */
async function runHumanShift() {
  Sound.ready();
  lastMode = "human";
  skipAll = false;
  const todayCat = phase === "free"
    ? ["paper", "can", "food", "plastic"][Math.floor(Math.random() * 4)] : "paper";
  const bags = makeBags(poolFree(phase === "free" ? 4 : 1), todayCat, 5);
  $("home").classList.add("hidden");
  $("report").classList.add("hidden");
  $("work").classList.remove("hidden");
  $("noticeCat").textContent = CATS[todayCat];
  $("bagTotal").textContent = bags.length;
  $("scoreChip").classList.remove("hidden");
  $("speedBtn").classList.add("hidden");
  $("skipBtn").classList.add("hidden");
  document.querySelector(".ai-zone").classList.add("hidden");
  $("aiSpeech").classList.add("hidden");
  let ok = 0, bad = 0;
  $("okCnt").textContent = 0; $("badCnt").textContent = 0;

  for (let b = 0; b < bags.length; b += 1) {
    const bag = bags[b];
    const person = PEOPLE[b % PEOPLE.length];
    $("bagNo").textContent = b + 1;
    $("itemRow").innerHTML = "";
    $("verdict").classList.add("hidden");
    setStamps(false);
    $("personSlot").innerHTML = person.svg;
    await wait(560);
    personSay(person);
    $("bagHint").textContent = "봉투를 눌러 열기";
    $("bagBtn").classList.remove("hidden");
    await new Promise((res) => { $("bagBtn").onclick = res; });
    $("bagBtn").onclick = null;
    $("pSpeech").classList.add("hidden");
    Sound.paper();
    $("bagBtn").classList.add("hidden");
    $("itemRow").innerHTML = bag.map((id, i) =>
      `<div class="icard tapable" data-z="${id}" style="animation-delay:${i * 0.08}s">
        ${art(id)}<span class="iname">${itemOf(id).name}</span></div>`).join("");
    document.querySelectorAll("[data-z]").forEach((c) =>
      c.addEventListener("click", () => openInspect(c.dataset.z)));
    await wait(bag.length * 90 + 300);
    setStamps(true);
    const passed = await new Promise((res) => {
      $("stampPass").onclick = () => res(true);
      $("stampDeny").onclick = () => res(false);
    });
    $("stampPass").onclick = null; $("stampDeny").onclick = null;
    setStamps(false);
    Sound.stamp();
    const stampEl = passed ? $("stampPass") : $("stampDeny");
    stampEl.classList.add("slammed");
    setTimeout(() => stampEl.classList.remove("slammed"), 240);
    $("verdict").className = `ink ${passed ? "pass" : "deny"} slam`;
    $("verdictText").textContent = passed ? "통과" : "반려";
    $("verdict").classList.remove("hidden");
    const wrongItems = bag.filter((id) => itemOf(id).cat !== todayCat);
    const shouldPass = wrongItems.length === 0;
    await wait(430);
    if (passed === shouldPass) {
      ok += 1; Sound.good();
    } else {
      bad += 1; Sound.bad();
      $("citationText").textContent = shouldPass
        ? `이 봉투는 전부 ${CATS[todayCat]}였어요. 멀쩡한 봉투를 반려했어요!`
        : `${wrongItems.map((id) => `${itemOf(id).name}(${CATS[itemOf(id).cat]})`).join(", ")}이(가) 섞여 있었는데 통과시켰어요!`;
      $("citation").classList.remove("hidden");
      await new Promise((res) => { $("citationOk").onclick = res; });
      $("citationOk").onclick = null;
      $("citation").classList.add("hidden");
    }
    $("okCnt").textContent = ok; $("badCnt").textContent = bad;
    const p = document.querySelector(".person");
    if (p) p.classList.add("leave");
    await wait(460);
  }

  $("work").classList.add("hidden");
  const acc = Math.round((ok / bags.length) * 100);
  if (humanBest === null || acc > humanBest) {
    humanBest = acc;
    localStorage.setItem(HB_KEY, JSON.stringify(humanBest));
  }
  renderHumanReport(acc, ok, bad);
  $("report").classList.remove("hidden");
  if (acc === 100) Sound.good();
}

function renderHumanReport(acc, ok, bad) {
  $("score").textContent = `${acc}점`;
  $("scoreSub").textContent = `🧑 내가 검사관 · 봉투 ${ok + bad}개 (✅${ok} ❌${bad})`;
  $("srcStats").classList.add("hidden");
  $("teachZone").classList.add("hidden");
  $("reportNotebook").classList.add("hidden");
  const banner = $("aiBanner");
  banner.textContent =
    acc === 100 ? "🏆 완벽한 검사관! 이제 재활용이를 가르칠 자격이 충분해요."
    : acc >= 80 ? "😎 훌륭해요! 공지판을 잘 확인했네요."
    : acc >= 60 ? "🙂 나쁘지 않아요. 물건을 눌러 속성을 확인해 보세요."
    : "😅 오늘은 좀 힘들었네요. 봉투 속을 꼼꼼히 살펴보세요!";
  banner.classList.remove("hidden");
  $("reportNext").textContent = phase === "orient" ? "🤖 이제 재활용이 만나기!" : "🚛 재활용이에게 맡기기";
}

/* ── 정산 ── */
function renderReport() {
  const r = lastResult;
  $("teachZone").classList.remove("hidden");
  $("srcStats").classList.remove("hidden");
  $("reportNotebook").classList.remove("hidden");
  $("score").textContent = `${r.score}점`;
  $("scoreSub").textContent = `물건 ${r.perItem.length}개 · 봉투 정확도 ${Math.round(r.bagAcc * 100)}% · ${history.length}회차`;
  const ruleHits = r.ruleStats.reduce((a, s) => a + s.hits, 0);
  const ruleMiss = r.ruleStats.reduce((a, s) => a + s.misses, 0);
  $("srcStats").innerHTML =
    `📒 외운 물건으로 맞힘 <b>${r.regHits}</b> · 📐 규칙으로 맞힘 <b>${ruleHits}</b> (틀리게 함 ${ruleMiss})` +
    (r.conflictCount ? ` · <span class="conflict">🤯 규칙 싸움 ${r.conflictCount}회</span>` : "");
  // 재활용이 한마디
  const banner = $("aiBanner");
  if (phase === "c1") {
    banner.textContent = r.score === 100
      ? "🤖 수첩에 적힌 애들이라 다 알아봤어요! 저 잘하죠? 😊"
      : "🤖 어라…? 수첩에 적힌 대로 했는데 틀렸대요… 혹시 수첩이 잘못 적힌 걸까요? 😅 (아래에서 고쳐 주세요!)";
    banner.classList.remove("hidden");
  } else if (phase === "c2") {
    banner.textContent = "🤖 어어… 처음 보는 게 너무 많았어요… 😵";
    banner.classList.remove("hidden");
  } else if (r.score === 100) {
    banner.textContent = "🤖 완벽했어요! 수첩이 최고예요! ✨";
    banner.classList.remove("hidden");
  } else banner.classList.add("hidden");
  renderWrongList();
  $("ruleReport").innerHTML = brain.rules.length
    ? "📐 규칙 성적: " + brain.rules.map((rule, i) => {
        const s = r.ruleStats[i];
        return `<span>[${rule.feats.map((f) => FEATURES[f].icon).join("")}→${CATS[rule.cat]}] ` +
          `${s.hits}맞힘${s.misses ? `·<span class="bad">${s.misses}틀림</span>` : ""}</span>`;
      }).join(" &nbsp; ")
    : (phase === "free" ? `<span class="cnt">아직 규칙이 없어요 — 수첩의 [📐 규칙] 탭에서 만들 수 있어요</span>` : "");
  // 단계별 버튼
  $("reportNext").textContent = phase === "c1" ? "좋아, 계속!" : phase === "c2" ? "어떡하지…" : "🚛 다시 도전!";
}

function renderWrongList() {
  const wrong = [...new Map(lastResult.perItem.filter((p) => !p.correct).map((p) => [p.id, p])).values()];
  $("teachBudget").textContent = `가르치기 ${TEACH_PER_RUN - teachBudget}/${TEACH_PER_RUN}`;
  $("wrongList").innerHTML = wrong.length
    ? wrong.map((p) => {
        const it = itemOf(p.id);
        const done = !!brain.reg[p.id] && p.source !== "reg";
        const said = p.cat === "reject" ? "반려" : CATS[p.cat] || "?";
        return `<button class="wrong-item ${done ? "taught" : ""}" data-t="${p.id}" ${done ? "disabled" : ""}>
          ${it.name} <small>(${said}라고 함)</small>${done ? " ✔" : ""}</button>`;
      }).join("")
    : `<span class="cnt">✨ 틀린 게 없어요! 완벽!</span>`;
  document.querySelectorAll("[data-t]").forEach((b) =>
    b.addEventListener("click", () => {
      if (teachBudget <= 0) {
        aiAlert(`한 번에 ${TEACH_PER_RUN}개밖에 못 외워요! 다시 도전한 뒤 가르쳐 주세요.`);
        return;
      }
      openTeach(b.dataset.t);
    }));
}

function aiAlert(msg) { alert(`🤖 ${msg}`); }

/* ── 속성 팝업 ── */
function attrChips(itemId) {
  return itemOf(itemId).feats.map((f) =>
    `<span class="chip">${FEATURES[f].icon} ${FEATURES[f].name}</span>`).join("");
}
function openInspect(itemId) {
  $("inspectName").textContent = itemOf(itemId).name;
  $("inspectCat").textContent = brain.reg[itemId]
    ? `수첩에 "${CATS[brain.reg[itemId]]}"로 적혀 있어요` : "아직 수첩에 없는 물건이에요";
  $("inspectAttrs").innerHTML = attrChips(itemId);
  $("inspect").classList.remove("hidden");
}
$("inspectClose").addEventListener("click", () => $("inspect").classList.add("hidden"));
$("inspect").addEventListener("click", (e) => { if (e.target === $("inspect")) $("inspect").classList.add("hidden"); });

/* ── 가르치기 (분류 한 탭) ── */
let teachContext = "report"; // report | orient
function openTeach(itemId, context = "report") {
  teaching = { itemId };
  teachContext = context;
  $("teachName").textContent = itemOf(itemId).name;
  $("teachAttrs").classList.add("hidden");
  $("teachAttrs").innerHTML = attrChips(itemId);
  $("teach").classList.remove("hidden");
}
$("teachInspect").addEventListener("click", () => $("teachAttrs").classList.toggle("hidden"));
document.querySelectorAll(".cat-btn").forEach((b) =>
  b.addEventListener("click", () => {
    if (!teaching) return;
    brain.reg[teaching.itemId] = b.dataset.cat;
    Sound.learn();
    save();
    $("teach").classList.add("hidden");
    if (teachContext === "orient") orientAfterTeach(teaching.itemId);
    else { teachBudget -= 1; if (lastResult) renderWrongList(); }
    teaching = null;
  }));
$("teachCancel").addEventListener("click", () => { teaching = null; $("teach").classList.add("hidden"); });

/* ── 오리엔테이션 ── */
let orientTaught = 0;
function orientPolicyStep() {
  $("orientTeach").classList.add("hidden");
  $("orientPolicy").classList.remove("hidden");
  renderPolicyRow($("orientPolicyRow"), () => { $("orientGo").disabled = !brain.policy; });
  $("orientGo").disabled = !brain.policy;
  Sound.robo(5);
}
function openOrient() {
  Sound.ready();
  orientTaught = 0;
  $("orientAvatar").innerHTML = AI_SVG;
  // 이전 버전 데이터로 이미 3개 이상 외운 상태면 가르치기를 건너뛰고 방침으로
  if (Object.keys(brain.reg).length >= 3) {
    $("orient").classList.remove("hidden");
    orientPolicyStep();
    return;
  }
  const candidates = Object.keys(ITEMS)
    .filter((id) => itemOf(id).stage === 1 && !brain.reg[id])
    .sort(() => Math.random() - 0.5).slice(0, 6);
  $("orientGrid").innerHTML = candidates.map((id) =>
    `<button class="orient-item" data-o="${id}">${art(id)}${itemOf(id).name}</button>`).join("");
  document.querySelectorAll("[data-o]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (brain.reg[btn.dataset.o] || orientTaught >= 3) return;
      openTeach(btn.dataset.o, "orient");
    }));
  $("orient").classList.remove("hidden");
  Sound.robo(6);
}
function orientAfterTeach(itemId) {
  orientTaught += 1;
  const cnt = orientTaught;
  $("orientCnt").textContent = cnt;
  const btn = document.querySelector(`[data-o="${itemId}"]`);
  if (btn) { btn.classList.add("taught"); btn.disabled = true; }
  if (cnt >= 3) {
    document.querySelectorAll("[data-o]").forEach((b) => (b.disabled = true));
    setTimeout(orientPolicyStep, 550);
  }
}
$("orientGo").addEventListener("click", () => {
  $("orient").classList.add("hidden");
  phase = "c1"; save();
  playChallenge();
});

/* ── 튜토리얼 대사 시퀀스 ── */
const C2_LINES = [
  "아는 애들은 자신 있었는데요… 처음 보는 게 너무 많았어요. 😵",
  "저 한 번에 3개밖에 못 외우잖아요. 저 많은 걸 언제 다 배워요… 이제 방법이 없어요…",
  "…잠깐만요. 콜라캔이랑 사이다캔이랑 통조림… 다 반짝이고 통 모양이네요?",
  "하나씩 말고, 닮은 점으로 배우면 안 될까요?! 수첩에 [📐 규칙] 페이지를 만들었어요! ✨",
];
function playDialogue(lines, done) {
  let i = 0;
  $("dlgAvatar").innerHTML = AI_SVG;
  const show = () => { $("dlgText").textContent = lines[i]; Sound.robo(syl(lines[i])); };
  $("dlg").classList.remove("hidden");
  show();
  const card = $("dlg");
  const handler = () => {
    i += 1;
    if (i < lines.length) show();
    else { card.removeEventListener("click", handler); $("dlg").classList.add("hidden"); done(); }
  };
  card.addEventListener("click", handler);
}

/* ── 수첩 ── */
function renderItemsPane() {
  $("itemCols").innerHTML = Object.keys(CATS).map((cat) => {
    const chips = Object.keys(brain.reg)
      .filter((id) => brain.reg[id] === cat && ITEMS[id])
      .map((id) => `<div class="ichip" data-insp="${id}">${itemOf(id).name}</div>`)
      .join("") || `<div class="none">아직 없음</div>`;
    return `<div class="icol"><span class="icol-title c-${cat}">${CATS[cat]}</span>${chips}</div>`;
  }).join("");
  document.querySelectorAll("[data-insp]").forEach((c) =>
    c.addEventListener("click", () => openInspect(c.dataset.insp)));
  const unknown = Object.keys(ITEMS).filter((id) => !brain.reg[id]).length;
  $("mysteryRow").innerHTML = unknown
    ? Array.from({ length: unknown }, () => `<span class="mq">?</span>`).join("")
    : `<b>모든 물건을 다 외웠어요! 🎉</b>`;
}

let selFeats = [];
function renderFeatsPane() {
  $("ruleChips").innerHTML = Object.keys(FEATURES).map((f) =>
    `<span class="chip ${selFeats.includes(f) ? "sel" : ""}" data-rf="${f}">${FEATURES[f].icon} ${FEATURES[f].name}</span>`).join("");
  document.querySelectorAll("[data-rf]").forEach((ch) =>
    ch.addEventListener("click", () => {
      const f = ch.dataset.rf;
      selFeats = selFeats.includes(f) ? selFeats.filter((x) => x !== f)
        : selFeats.length < 3 ? [...selFeats, f] : selFeats;
      renderFeatsPane();
    }));
  if (selFeats.length) {
    const known = Object.keys(brain.reg).filter((id) =>
      ITEMS[id] && selFeats.every((f) => itemOf(id).feats.includes(f)));
    const cats = [...new Set(known.map((id) => brain.reg[id]))];
    $("rulePreview").innerHTML = known.length
      ? `🔎 외운 물건 중: ${known.map((id) => `${itemOf(id).name}(${CATS[brain.reg[id]]})`).join(", ")}` +
        (cats.length > 1 ? ` <span class="warn">⚠ 여러 분류에 걸쳐요!</span>` : "")
      : `<span class="cnt">🔎 외운 물건 중엔 이 특징 조합이 아직 없어요 — 그래도 규칙은 만들 수 있어요!</span>`;
  } else {
    $("rulePreview").innerHTML = `<span class="cnt">특징을 1~3개 골라 보세요.</span>`;
  }
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
    aiAlert(res.reason === "slots"
      ? `제 머리에는 규칙이 ${RULE_SLOTS}개까지만 들어가요! 덜 쓰는 규칙을 지워 주세요.`
      : "이미 같은 특징 조합의 규칙이 있어요!");
    return;
  }
  Sound.learn();
  selFeats = []; save(); renderFeatsPane();
});

/* ── 방침 ── */
const POLICIES = { pass: "🙂 일단 통과", deny: "🛑 일단 반려", guess: "🎲 찍어볼게" };
function renderPolicyRow(container, onPick) {
  container.innerHTML = Object.keys(POLICIES).map((k) =>
    `<span class="chip pol ${brain.policy === k ? "sel" : ""}" data-pol="${k}">${POLICIES[k]}</span>`).join("");
  container.querySelectorAll("[data-pol]").forEach((ch) =>
    ch.addEventListener("click", () => {
      brain.policy = ch.dataset.pol; save();
      renderPolicyRow(container, onPick);
      if (onPick) onPick();
    }));
}

/* ── 수첩 열기 (규칙 탭은 free부터) ── */
function openNotebook() {
  renderItemsPane();
  const locked = phase !== "free";
  $("tabFeats").classList.toggle("locked", locked);
  $("tabFeats").textContent = locked ? "🔒 규칙" : "📐 규칙";
  if (!locked) renderFeatsPane();
  renderPolicyRow($("policyRow"));
  switchTab(true);
  $("nbOverlay").classList.remove("hidden");
}
$("tabItems").addEventListener("click", () => switchTab(true));
$("tabFeats").addEventListener("click", () => {
  if (phase !== "free") { aiAlert("규칙이요…? 아직은 낱개로 외우는 것밖에 못 해요…"); return; }
  switchTab(false);
});
function switchTab(items) {
  $("tabItems").classList.toggle("active", items);
  $("tabFeats").classList.toggle("active", !items && phase === "free");
  $("paneItems").classList.toggle("hidden", !items);
  $("paneFeats").classList.toggle("hidden", items || phase !== "free");
}
$("nbClose").addEventListener("click", () => { $("nbOverlay").classList.add("hidden"); renderHome(); });
$("nbOverlay").addEventListener("click", (e) => { if (e.target === $("nbOverlay")) { $("nbOverlay").classList.add("hidden"); renderHome(); } });

/* ── 홈 ── */
function renderHome() {
  const tag = {
    orient: "먼저 🧑 검사관을 해보고, 신입 AI 재활용이를 가르쳐 보세요!",
    c1: "재활용이의 첫 근무! 수첩에 적어준 것만 나올 거예요",
    c2: "이번엔 새로운 주민들이 온다는 소문이…",
    free: "수첩을 튜닝하고, 도전으로 실력을 확인하세요",
  }[phase];
  $("homeTag").textContent = tag;
  $("challengeBtn").textContent =
    phase === "orient" ? "🤖 재활용이 만나기" :
    phase === "c1" ? "🚛 첫 도전!" :
    phase === "c2" ? "🚛 도전 2" : "🚛 도전 시작!";
  const best = history.length ? Math.max(...history.map((h) => h.score)) : null;
  const last = history[history.length - 1];
  $("homeStats").innerHTML = [
    humanBest !== null ? `🧑 내 최고 ${humanBest}점` : "",
    `📒 외운 물건 ${Object.keys(brain.reg).length}개` + (phase === "free" ? ` · 📐 규칙 ${brain.rules.length}/${RULE_SLOTS}` : ""),
    history.length ? `🚛 재활용이 도전 ${history.length}회 · 최고 <b style="color:var(--green-deep)">${best}점</b> · 최근 ${last.score}점` : "",
  ].filter(Boolean).join("<br/>");
}

/* ── 정산 버튼: 단계 전환 ── */
$("reportNext").addEventListener("click", () => {
  if (lastMode === "human") {
    $("report").classList.add("hidden");
    if (phase === "orient") openOrient();
    else playChallenge();
    return;
  }
  if (phase === "c1") {
    phase = "c2"; save();
    $("report").classList.add("hidden");
    $("home").classList.remove("hidden");
    renderHome();
  } else if (phase === "c2") {
    playDialogue(C2_LINES, () => {
      phase = "free"; save();
      Sound.learn();
      $("report").classList.add("hidden");
      openNotebook();
      switchTab(false); // 규칙 탭 바로 보여주기
    });
  } else {
    $("report").classList.add("hidden");
    playChallenge();
  }
});
$("reportHome").addEventListener("click", () => {
  $("report").classList.add("hidden");
  $("home").classList.remove("hidden");
  renderHome();
});
$("reportNotebook").addEventListener("click", openNotebook);

/* ── 근무 씬 컨트롤 ── */
$("speedBtn").addEventListener("click", () => {
  speed = speed === 1 ? 0.45 : 1;
  $("speedBtn").textContent = speed === 1 ? "⏩ 보통" : "⏩⏩ 빠름";
});
$("skipBtn").addEventListener("click", () => { skipAll = true; });

/* ── 배선 ── */
$("ruleCat").innerHTML = Object.keys(CATS).map((c) => `<option value="${c}">${CATS[c]}</option>`).join("");
$("challengeBtn").addEventListener("click", () => {
  if (phase === "orient") openOrient();
  else playChallenge();
});
$("humanBtn").addEventListener("click", runHumanShift);
$("notebookBtn").addEventListener("click", () => { Sound.ready(); openNotebook(); });
$("resetBtn").addEventListener("click", () => {
  if (!confirm("외운 물건, 규칙, 방침, 도전 기록을 모두 지우고 처음부터 시작할까요?")) return;
  [BRAIN_KEY, HIST_KEY, PHASE_KEY, HB_KEY, "rv2-meta"].forEach((k) => localStorage.removeItem(k));
  location.reload();
});
if (new URLSearchParams(location.search).get("reset")) {
  [BRAIN_KEY, HIST_KEY, PHASE_KEY, HB_KEY, "rv2-meta"].forEach((k) => localStorage.removeItem(k));
  humanBest = null;
  history = []; phase = "orient";
  Object.keys(brain.reg).forEach((k) => delete brain.reg[k]);
  brain.rules.length = 0; brain.policy = null;
  window.history.replaceState(null, "", location.pathname);
}
renderHome();
