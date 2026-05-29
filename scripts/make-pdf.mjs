// Generates a print-ready bilingual study booklet (HTML) from the content JSON.
// Then Chrome headless converts it to a paginated PDF for offline iPad reading.
//
//   node scripts/make-pdf.mjs            -> writes /tmp/debate-booklet.html
//   (Chrome --headless --print-to-pdf converts it; see the shell step)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const read = (p) => JSON.parse(readFileSync(join(root, "src/content", p), "utf8"));

const predictions = read("predictions.json");
const topics = read("topics.json");
const phrases = read("phrases.json");
const patterns = read("patterns.json");
const emergency = read("emergency.json");

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// ---------- Cover ----------
const cover = `
<section class="cover">
  <div class="crest">⚜</div>
  <h1 class="cover-title">DebateSprint</h1>
  <p class="cover-sub">押题手册 · Study Booklet</p>
  <p class="cover-line">小学英文辩论速成 · Junior English Debate</p>
  <div class="cover-rule"></div>
  <p class="cover-meta">
    押题 60（AI 类最多）+ 速记卡 + 武器库 13 题<br/>
    60 Predicted Motions + Cheat Sheet + 13 Armory Topics
  </p>
  <p class="cover-foot">离线翻页阅读 · Flip page-by-page offline on iPad</p>
</section>`;

// ---------- Cheat sheet ----------
const prepBlock = `
<div class="card">
  <h3 class="card-h">PREP · 万能结构</h3>
  <p class="mini">任何发言都能套：观点 → 原因 → 例子 → 重申观点</p>
  <table class="kv">
    <tr><td class="k">P</td><td>I (strongly) believe that ___. · 我坚信……</td></tr>
    <tr><td class="k">R</td><td>This is because ___. · 因为……</td></tr>
    <tr><td class="k">E</td><td>For example, ___. · 比如……</td></tr>
    <tr><td class="k">P</td><td>That's why ___. · 所以……</td></tr>
  </table>
</div>`;

const phrasesBlock = `
<div class="card">
  <h3 class="card-h">10 Power Phrases · 必背金句</h3>
  <ol class="phrases">
    ${phrases.phrases
      .map(
        (p) => `<li>
          <span class="ph-en">${esc(p.english)}</span>
          <span class="ph-zh">${esc(p.purpose_zh)} · ${esc(p.chinese)}</span>
        </li>`
      )
      .join("")}
  </ol>
</div>`;

const patternsBlock = `
<div class="card">
  <h3 class="card-h">5 Patterns · 识破对手 + 反击</h3>
  <table class="patterns">
    <tr><th>对手套路 Pattern</th><th>你的反击 Counter</th></tr>
    ${patterns.patterns
      .map(
        (p) => `<tr>
          <td><b>${esc(p.name_en)}</b><br/><span class="mini">${esc(p.name_zh)} — ${esc(p.description_zh)}</span></td>
          <td>${esc(p.counter_en)}<br/><span class="mini">${esc(p.counter_zh)}</span></td>
        </tr>`
      )
      .join("")}
  </table>
</div>`;

const emergencyBlock = `
<div class="card">
  <h3 class="card-h">Emergency Kit · 临场救急</h3>
  <table class="patterns">
    ${emergency.scenarios
      .map(
        (s) => `<tr>
          <td><b>${esc(s.situation_zh)}</b><br/><span class="mini">${esc(s.situation_en)}</span></td>
          <td>${esc(s.save_en)}<br/><span class="mini">${esc(s.save_zh)}</span></td>
        </tr>`
      )
      .join("")}
  </table>
</div>`;

const cheatSheet = `
<section class="section break-before">
  <h2 class="sec-title">速记卡 · Cheat Sheet</h2>
  <p class="sec-note">上场前先过一遍这几页 · Run through these pages before you speak.</p>
  ${prepBlock}
  ${phrasesBlock}
  ${patternsBlock}
  ${emergencyBlock}
</section>`;

// ---------- Predictions (the star): grouped by category ----------
const catName = (id) => predictions.categories.find((c) => c.id === id);

const topicCard = (t) => `
<div class="topic">
  <div class="topic-title">${esc(t.title_en)}<span class="topic-zh"> · ${esc(t.title_zh)}</span></div>
  <div class="cols">
    <div class="col pro">
      <div class="col-h">PRO · 正方</div>
      <ol>${t.pro.map((p) => `<li><span class="en">${esc(p.en)}</span><span class="zh">${esc(p.zh)}</span></li>`).join("")}</ol>
    </div>
    <div class="col con">
      <div class="col-h">CON · 反方</div>
      <ol>${t.con.map((p) => `<li><span class="en">${esc(p.en)}</span><span class="zh">${esc(p.zh)}</span></li>`).join("")}</ol>
    </div>
  </div>
</div>`;

const predictionSections = predictions.categories
  .map((cat) => {
    const list = predictions.topics.filter((t) => t.category === cat.id);
    if (!list.length) return "";
    return `
<section class="section break-before">
  <h2 class="sec-title">${cat.emoji} ${esc(cat.name_zh)}</h2>
  <p class="sec-note">${esc(cat.name_en)} · ${list.length} 题</p>
  ${list.map(topicCard).join("")}
</section>`;
  })
  .join("");

const predictionsCover = `
<section class="section break-before band">
  <h2 class="band-title">押题 60</h2>
  <p class="band-sub">Top 60 Predicted Motions</p>
  <p class="band-note">${esc(predictions.meta.note_zh)}</p>
</section>`;

// ---------- Armory 13 (with examples) ----------
const armoryCard = (t) => `
<div class="topic">
  <div class="topic-title">${esc(t.title_en)}<span class="topic-zh"> · ${esc(t.title_zh)}</span></div>
  <div class="cols">
    <div class="col pro">
      <div class="col-h">PRO · 正方</div>
      ${t.pro
        .map(
          (p) => `<div class="arg">
            <div class="en"><b>${esc(p.claim_en)}</b> · ${esc(p.claim_zh)}</div>
            <div class="eg">e.g. ${esc(p.example_en)}<br/><span class="zh">例：${esc(p.example_zh)}</span></div>
          </div>`
        )
        .join("")}
    </div>
    <div class="col con">
      <div class="col-h">CON · 反方</div>
      ${t.con
        .map(
          (p) => `<div class="arg">
            <div class="en"><b>${esc(p.claim_en)}</b> · ${esc(p.claim_zh)}</div>
            <div class="eg">e.g. ${esc(p.example_en)}<br/><span class="zh">例：${esc(p.example_zh)}</span></div>
          </div>`
        )
        .join("")}
    </div>
  </div>
</div>`;

const armorySection = `
<section class="section break-before band">
  <h2 class="band-title">武器库 13 题</h2>
  <p class="band-sub">Armory · with full examples 带完整例子</p>
  <p class="band-note">这 13 题有更详细的例子，适合深度准备。</p>
</section>
<section class="section">
  ${topics.topics.map(armoryCard).join("")}
</section>`;

// ---------- Assemble ----------
const html = `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8"/>
<title>DebateSprint 押题手册</title>
<style>
  /* Page sized to the iPad screen ratio (3:4) so each page fills the
     screen edge-to-edge in Books/Files — no wide black bars, big text. */
  @page { size: 7.5in 10in; margin: 11mm 11mm 12mm 11mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "PingFang SC", "Heiti SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
    color: #2b1810;
    background: #fdfaf2;
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
  }
  h1,h2,h3 { font-family: Georgia, "Songti SC", serif; }
  .break-before { break-before: page; }
  .topic, .card { break-inside: avoid; }

  /* Cover */
  .cover {
    height: 214mm; display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; break-after: page;
  }
  .crest { font-size: 56px; color:#b8862f; }
  .cover-title { font-size: 58px; margin: 8px 0 0; letter-spacing: 5px; color:#2b1810; }
  .cover-sub { font-size: 28px; color:#b8862f; margin: 6px 0 0; }
  .cover-line { font-size: 18px; color:#5a3e2b; margin-top: 6px; }
  .cover-rule { width: 64%; height:2px; background: linear-gradient(to right,transparent,#b8862f,transparent); margin: 28px 0; }
  .cover-meta { font-size: 18px; color:#2b1810; line-height:2; }
  .cover-foot { font-size: 15px; color:#5a3e2b; margin-top: 34px; }

  /* Section headers */
  .sec-title { font-size: 30px; color:#2b1810; border-bottom: 2.5px solid #b8862f; padding-bottom: 8px; margin: 0 0 6px; }
  .sec-note { font-size: 15px; color:#5a3e2b; margin: 0 0 18px; }

  /* Full-page band (divider pages) */
  .band { height: 214mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
  .band-title { font-size: 52px; color:#b8862f; margin:0; }
  .band-sub { font-size: 24px; color:#2b1810; margin: 8px 0 0; }
  .band-note { font-size: 16px; color:#5a3e2b; max-width: 150mm; margin: 20px auto 0; line-height:1.9; }

  /* Cheat cards */
  .card { border:1.5px solid #e0c98a; border-radius:10px; padding:16px 18px; margin-bottom:16px; background:#fffdf7; }
  .card-h { font-size: 20px; margin:0 0 10px; color:#2b1810; }
  .mini { font-size: 13px; color:#7a5a3a; }
  table.kv { width:100%; border-collapse:collapse; }
  table.kv .k { font-weight:bold; color:#b8862f; width:30px; font-size:20px; font-family:Georgia,serif; vertical-align:top; }
  table.kv td { padding:6px 6px; border-bottom:1px dotted #e8d9b5; font-size:15px; }
  ol.phrases { margin:0; padding-left:22px; }
  ol.phrases li { margin-bottom:10px; }
  .ph-en { display:block; font-size:15.5px; }
  .ph-zh { display:block; font-size:13px; color:#7a5a3a; margin-top:1px; }
  table.patterns { width:100%; border-collapse:collapse; }
  table.patterns th { text-align:left; font-size:12px; color:#b8862f; text-transform:uppercase; border-bottom:1.5px solid #e0c98a; padding:6px; }
  table.patterns td { padding:8px 6px; border-bottom:1px solid #f0e6cc; vertical-align:top; width:50%; font-size:14.5px; }

  /* Topic card */
  .topic { border:1.5px solid #e0c98a; border-radius:10px; padding:14px 16px; margin-bottom:14px; background:#fffdf7; }
  .topic-title { font-weight:bold; font-size:18px; color:#2b1810; margin-bottom:10px; line-height:1.4; }
  .topic-zh { font-weight:normal; color:#5a3e2b; font-size:15.5px; }
  .cols { display:flex; gap:18px; }
  .col { flex:1; }
  .col-h { font-family:Georgia,serif; font-size:14px; letter-spacing:1px; margin-bottom:6px; font-weight:bold; }
  .pro .col-h { color:#2d5016; }
  .con .col-h { color:#c0392b; }
  .col ol { margin:0; padding-left:20px; }
  .col li { margin-bottom:8px; }
  .col .en { display:block; font-size:14.5px; }
  .col .zh { display:block; font-size:12.5px; color:#7a5a3a; margin-top:1px; }
  .arg { margin-bottom:10px; }
  .arg .en { font-size:14px; }
  .arg .eg { font-size:12.5px; color:#6a4a2a; padding-left:8px; border-left:2.5px solid #e0c98a; margin-top:3px; line-height:1.5; }
</style>
</head>
<body>
  ${cover}
  ${cheatSheet}
  ${predictionsCover}
  ${predictionSections}
  ${armorySection}
</body>
</html>`;

const out = "/tmp/debate-booklet.html";
writeFileSync(out, html, "utf8");
console.log("HTML written:", out, `(${(html.length / 1024).toFixed(0)} KB)`);
console.log("topics: predictions", predictions.topics.length, "| armory", topics.topics.length);
