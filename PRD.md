# DebateSprint · 小学英文辩论赛速成系统

> 一周内把零基础三年级小朋友"扶上场"——不教理论，只教能立刻用的招式。

---

## 1. 项目背景与约束

### 1.1 用户画像
- **年龄/年级**：3年级（约9岁）
- **语言**：国际学校就读，英语接近母语水平，能听懂对手临场发言
- **辩论经验**：零，刚接触
- **比赛形式**：小学初级辩论赛，几辩位置未定

### 1.2 关键约束
| 维度 | 数值 |
|---|---|
| 备赛时间 | < 7 天 |
| 单次专注时长 | ≤ 20 分钟（小学生注意力上限） |
| 每个模块上手时间 | ≤ 3 分钟 |
| 内容定位 | 能短时间记住、上场立刻用 |

### 1.3 核心设计原则
1. **模板化优先于理论**——给框架不给思辨方法
2. **模式识别优先于即兴发挥**——把对手套路 → 反击预制成"if-then"卡片
3. **背诵 + 选择题驱动**——避免开放式输入（不可控）
4. **英文为主，中文做骨架/解释**——尊重孩子英语能力，但关键时刻用母语降低认知负担
5. **"够用就好"，不追求完美**——一周内交付能跑的东西，比交付不出完美方案重要

### 1.4 不做的事
- ❌ 完整论证理论（toulmin model、framing、weighing 等）
- ❌ 多种辩论流派（BP/WSDC/PF）的差异讲解
- ❌ AI 辩论陪练（一周做不出可靠的）
- ❌ 账号、后端、多用户支持
- ❌ 任何需要长期训练才能见效的能力

---

## 2. 教学内容设计（最重要的一节）

教什么，比怎么做更重要。所有内容围绕 **5 个模块** 展开。

### 模块 1 · 万能结构 PREP

**核心思想**：任何场合卡壳了都能往里套。这是孩子上场的"安全网"。

**主模板（Constructive 立论）**：
```
P  Point     I (strongly) believe that ___.
R  Reason    This is because ___.
E  Example   For example, ___.
P  Point     That's why ___.
```

**变体 A · 反驳（Rebuttal）**：
```
My opponent said ___.
But that's not right, because ___.
For example, ___.
So ___.
```

**变体 B · 总结（Summary）**：
```
In summary, we believe ___ for three reasons.
First, ___.
Second, ___.
Finally, ___.
Thank you.
```

**学习方式**：
- 看模板 → 听一个真人示范音频 → 自己用今天的话题填一遍 → 录音回放
- 提供 3 个练习题目（如 "Should kids have homework?"），让孩子用模板说一遍

---

### 模块 2 · 必背 10 金句

**核心思想**：固定英文表达，张口就来，省去临场组词的认知开销。

| # | 用途 | 句子 | 中文提示 |
|---|---|---|---|
| 1 | 开场 | "Good morning judges. My name is ___, and I'm here to argue that ___." | 自我介绍开场 |
| 2 | 立场 | "I strongly believe that ___." | 强调观点 |
| 3 | 分点 | "There are three reasons why I think this." | 准备分点 |
| 4 | 列举 | "Firstly, ___. Secondly, ___. Finally, ___." | 顺序展开 |
| 5 | 举例 | "Let me give you an example." | 引出例子 |
| 6 | 反驳 | "My opponent said ___, but I disagree because ___." | 标准反驳 |
| 7 | 反例 | "That's not always true. For example, ___." | 用反例打绝对化 |
| 8 | 让步 | "Even if ___ is true, it doesn't mean ___." | 即使你对一半，也推不出你的结论 |
| 9 | 收尾 | "For all these reasons, we strongly believe that ___." | 总结 |
| 10 | 致谢 | "Thank you. We are proud to propose / oppose this motion." | 礼貌结束 |

**学习方式**：
- 闪卡正面（中文场景）→ 反面（英文句子 + 朗读音频）
- 听写小测：放音频 → 让孩子选正确的中文场景（多选题）
- 反向小测：给中文场景 → 选正确的英文（多选题）

---

### 模块 3 · 模式识别 + 反击（最有价值的模块）

**核心思想**：对手讲话时，孩子只要识别"对方在用哪招" → 套用对应反击模板。把听辩理解负担降到最低。

**5 个核心模式**：

| # | 对手套路 | 识别信号词/特征 | 你的反击模板 |
|---|---|---|---|
| 1 | 绝对化 | always / never / everyone / no one / all / every | "That's not always true. For example, ___." |
| 2 | 没给例子 | 讲了一堆道理但没举具体例子 | "Can my opponent give a real example?" |
| 3 | 人身攻击 | "you don't know" / "you're just a kid" | "Let's focus on the topic, not on the person." |
| 4 | 混淆因果 | "X happens, so Y must be the cause" | "That's a result, not a reason." |
| 5 | 偷换话题 | 答非所问、扯到无关的事 | "That's a different topic. Let's go back to ___." |

**学习方式（核心交互）**：
1. **诊断模式**：屏幕显示一段对手发言（英文文本，可点击播放音频），孩子选 A/B/C/D 哪个模式
2. **反击模式**：识别完模式后，从 4 个英文反击中选最合适的那个
3. **进阶**：屏幕只显示对手发言 → 孩子直接录音说出反击 → 自己听回放检查

每个模式准备 3-5 个例子，做成 25 道左右的练习题库。

---

### 模块 4 · 辩题弹药库

**核心思想**：孩子比赛真正要面对的是某个具体辩题。不知道哪个题，就把小学常见辩题的"正反方论点 + 例子"都准备好。

**预制辩题清单（10 个）**：
1. Should kids have homework?
2. Should phones be allowed in school?
3. Should school uniforms be required?
4. Are zoos good or bad for animals?
5. Should kids get pocket money?
6. Is online learning better than classroom learning?
7. Should every family have a pet?
8. Should plastic bags be banned?
9. Should kids watch TV every day?
10. Is it better to live in the city or the countryside?

**每个辩题的内容结构**：
```
Topic: Should kids have homework?

PRO (Yes, kids should have homework)
  1. Practice makes perfect.
     → Example: If you don't practice math at home, you forget it the next day.
  2. It teaches responsibility.
     → Example: Doing homework on time is like keeping a promise.
  3. Parents can see what kids are learning.
     → Example: Mom can help me when I get stuck on a tricky question.

CON (No, kids should NOT have homework)
  1. Kids need time to play and rest.
     → Example: Playing with friends is also learning, like teamwork.
  2. School time is enough.
     → Example: We learn 6 hours a day. That's already a lot!
  3. Homework makes kids stressed.
     → Example: Some kids cry at night because they have too much homework.
```

**Stretch goal**：增加"输入自定义辩题"输入框，调用 Claude API 实时生成正反方论点（如有时间，否则只提供 10 个预制题目）。

**学习方式**：
- 浏览模式：折叠列表，孩子可挑感兴趣的题目展开看
- 训练模式：选一个题，屏幕只显示辩题，孩子尝试自己说 PRO 三点，再展开对答案

---

### 模块 5 · 临场救急包

**核心思想**：上场最大的敌人是脑袋空白。给 4 个最常见的"翻车场景" + 救急话术。

| 翻车场景 | 救急话术 |
|---|---|
| 卡壳，脑袋空白 | 站直，停 3 秒，说 "Let me think about that for a moment." 然后用 PREP 模板套 |
| 没听清对手 | 不说 "sorry"，说 "Could my opponent please repeat that point?" |
| 时间快用完 | 直接跳总结："In conclusion, ___. Thank you." |
| 紧张到发抖 | 深呼吸 3 次 → 看裁判 → 慢慢说第一句金句 #1 |

**学习方式**：一页纸速查卡，可打印。

---

## 3. 系统架构与技术选型

### 3.1 技术栈
| 项 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 14 (App Router) + React** | 快速搭建、内置路由、易部署 |
| 样式 | **TailwindCSS** | 不写 CSS，速度第一 |
| 朗读 | **Web Speech API**（浏览器内建 TTS）兜底；优质句子用预录 mp3 | 免后端、免 API key |
| 录音 | **MediaRecorder API**（浏览器原生） | 仅本地播放回听，不上传 |
| 数据 | 内容写进 `src/content/*.json`，无数据库 | 静态站点 |
| 进度 | **localStorage** | 不需要账号 |
| 构建 | **Next.js static export** (`output: 'export'`) | 输出 `out/` 纯静态文件 |
| 托管/部署 | **GitHub + GitHub Pages** | 用户已配 `szkailorik` SSH，gh CLI 已认证 |

### 3.2 页面结构
```
/                    首页（5 模块入口 + 今日 15 分钟训练计划）
/structure           模块1 PREP 万能结构
/phrases             模块2 金句闪卡
/patterns            模块3 模式识别游戏
/ammo                模块4 弹药库
/ammo/[topicId]      具体辩题展开页
/emergency           模块5 临场救急速查
/timer               独立计时器（任何页面都能弹出）
```

### 3.3 内容数据结构（关键 JSON 文件）
```
src/content/
  phrases.json        // 10 句金句
  patterns.json       // 5 模式 + 25 道练习题
  topics.json         // 10 个辩题正反论点
  emergency.json      // 4 个救急场景
```

---

## 4. 核心交互设计

### 4.1 首页"今日 15 分钟训练计划"
打开就给一个明确的当日清单（按备赛剩余天数变化），降低决策成本：

```
今天剩 5 天 · 今日训练（15 分钟）
  ✅ 5 分钟  PREP 模板（说一次"Should kids have homework?"）
  ⬜ 5 分钟  金句闪卡（10 句过一遍）
  ⬜ 5 分钟  模式识别（5 道题）
[开始今日训练 →]
```

### 4.2 模式识别题目（核心交互示意）
```
┌─────────────────────────────────────────────┐
│  对手刚说了：                                  │
│  "Everyone knows that homework is bad.      │
│   No kid likes doing homework."             │
│  [▶ 播放]                                    │
├─────────────────────────────────────────────┤
│  这是哪种套路？                                 │
│  ◯ A. 没给例子                                │
│  ◉ B. 绝对化（everyone / no kid）             │
│  ◯ C. 人身攻击                                │
│  ◯ D. 偷换话题                                │
│                                             │
│  [下一步：选反击 →]                            │
└─────────────────────────────────────────────┘
```

### 4.3 PREP 模板填空界面
```
P  Point     I strongly believe that [_________________]
R  Reason    This is because           [_________________]
E  Example   For example,              [_________________]
P  Point     That's why                [_________________]

[🎤 录音说一遍] [▶ 听标准示范]
```

---

## 5. 开发计划（5 天冲刺）

| 天 | 工作内容 | 产出物 |
|---|---|---|
| **D1** | 内容定稿 + 项目脚手架 | 4 个 JSON 内容文件、Next.js 工程跑起来 |
| **D2** | 模块 1（PREP） + 模块 2（金句） | 这两个模块可用 |
| **D3** | 模块 3（模式识别游戏） | 游戏化做题流程跑通 |
| **D4** | 模块 4（弹药库） + 模块 5（救急包） + 计时器 | 全部模块上线 |
| **D5** | 首页训练计划 + 部署 + 给孩子试用 | 可访问的 URL，孩子能用 |

> ⚠ 优先保证 D1-D3 高质量，D4-D5 可以做减法。

---

## 6. 内容质量保证

内容是这个项目的命门。以下是内容编写的硬要求：

1. **所有英文必须地道、年龄适配**——不能出现成人辩论比赛的复杂句式
2. **每条金句必须能在 5 秒内说完**——超过这个长度孩子记不住
3. **模式识别题里的"对手发言"必须是 9 岁孩子能听懂的英文**——单词量参考 Oxford Reading Tree Stage 8-10
4. **所有例子必须贴近孩子生活**——homework、cartoon、pizza、pet 这种，不要 economy、policy
5. **避免文化偏差**——不放美国/英国本土文化梗

---

## 7. 验收标准

孩子用完这个系统后，应该达到：
- [ ] 能用 PREP 模板就任意一个预制辩题说出 60 秒发言
- [ ] 能背出 10 句金句中的 8 句
- [ ] 能识别 5 种对手套路中的 4 种，并说出对应反击
- [ ] 知道翻车了用哪句话救场
- [ ] 上场不发抖（这条可能玄学，但目标是要有）

---

## 8. 决策记录（v1 · 2026-05-07）

| 项 | 决策 | 备注 |
|---|---|---|
| 自定义辩题 AI 生成 | ❌ 不做 | 改为预制 10 个经典辩题，质量更可控、孩子更易理解 |
| 录音回放 | ❌ 不做 | 简化交互，避免麦克风权限和孩子排斥 |
| 部署目标 | ✅ **GitHub + GitHub Pages** | szkailorik/debate-sprint, public, GH Actions 自动发布 |
| UI 风格 | ✅ **塞尔达·旷野之息风** | 详见 §9 |

## 9. UI 风格设计 · 塞尔达·旷野之息风

### 9.1 视觉调性
参考《旷野之息 / 王国之泪》的现代奇幻调性——羊皮纸 + 希卡科技 + 海拉鲁自然，**不直接使用任天堂 IP 资产**（不放林克形象、海拉鲁徽章、官方logo），只取氛围与配色。

### 9.2 设计 Token

```
颜色
  --bg-parchment    #F4E8D0   羊皮纸主背景
  --bg-deep         #1A2B1F   深林夜色（卡片对比、模态层）
  --accent-sheikah  #5DD3F0   希卡青蓝（主交互 / hover 发光）
  --accent-gold     #D4A04C   勇气金（标题、奖励、完成态）
  --accent-courage  #2D5016   林克绿（次要按钮、标签）
  --danger-red      #C84B4B   血量红（错误、对手警示）
  --ink             #2B1810   羊皮纸上的墨色（正文）

字体
  标题  Cinzel / Cormorant Garamond  （古典 serif，复古铭文感）
  正文  Inter / Noto Sans            （清晰现代 sans）
  代码/句子  JetBrains Mono           （金句逐词朗读卡片）

纹理
  卡片背景  细纹羊皮纸纹理（CSS noise + sepia gradient）
  卡片边框  1px gold + 四角小三角装饰（CSS::before/::after）
  发光交互  希卡青蓝 box-shadow 0 0 12px，hover 加强
```

### 9.3 游戏化命名（中英双语）

视觉是塞尔达，但**辩论核心术语保留**（PREP、Pattern、Topic），副标题和过渡文案带塞尔达氛围：

| 模块 | 主标题（保留辩论术语） | 副标题（塞尔达风） |
|---|---|---|
| 1 PREP 万能结构 | **PREP Structure** | _The Scroll of Courage · 勇气之卷_ |
| 2 必背金句 | **10 Power Phrases** | _Words of Wisdom · 智慧之言_ |
| 3 模式识别 | **Pattern Recognition** | _See Through the Foe · 识破对手_ |
| 4 辩题弹药库 | **Topic Armory** | _Armory of 10 Motions · 武器库_ |
| 5 临场救急包 | **Emergency Kit** | _Survival Elixir · 应急药水_ |

进度系统：完成模块得"三角形碎片"（Triangle Shard，自绘几何图形，不用 Triforce 名称），集齐 5 块点亮主页中央徽章。

### 9.4 关键页面视觉草图

**首页**：
```
┌──────────────────────────────────────────────────┐
│  ⚜  DebateSprint                   ⚙ 设置        │  ← 金色顶栏
│                                                   │
│        ◢ ◣  Today's Trial · 今日试炼              │
│       ◢ ◣◣                                        │
│      ◢ ★ ◣   剩 5 天 · 已收集 ▲▲△△△              │
│       ◣ ◢                                         │
│        ◥◤                                         │
│                                                   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │ Scroll │ │ Words  │ │  Foe   │ │ Armory │    │
│  │   📜   │ │   ✦    │ │   👁   │ │   ⚔    │    │
│  │ PREP   │ │Phrases │ │Pattern │ │ Topics │    │
│  └────────┘ └────────┘ └────────┘ └────────┘    │
│                                                   │
│             [▶ 开始今日 15 分钟训练]               │  ← 希卡青蓝发光按钮
└──────────────────────────────────────────────────┘
   羊皮纸纹背景 · 四角金色装饰
```

**模式识别题（核心交互）**：
```
┌──────────────────────────────────────────────────┐
│  See Through the Foe · 识破对手           3 / 5  │
│ ─────────────────────────────────────────────── │
│                                                   │
│   👁 The opponent says:                          │
│   ┌─────────────────────────────────────┐        │
│   │ "Everyone knows homework is bad.    │  📜    │
│   │  No kid likes doing homework."      │        │
│   │  [▶ Listen]                          │        │
│   └─────────────────────────────────────┘        │
│                                                   │
│   What's their weakness? · 对手用了哪一招？        │
│                                                   │
│   ◯  No Example (没给例子)                       │
│   ◉  Absolute Words (绝对化：everyone/no kid) ✦  │
│   ◯  Personal Attack (人身攻击)                   │
│   ◯  Off Topic (偷换话题)                        │
│                                                   │
│         [Strike Back · 反击 ⚔ →]                  │  ← 希卡青蓝
└──────────────────────────────────────────────────┘
```

### 9.5 实现要点
- **不引入任何任天堂素材文件**（音乐、立绘、官方字体）
- 用 Google Fonts 的 Cinzel / Cormorant 替代古风字体
- 装饰图形（剑、盾、卷轴、三角碎片）全部用 SVG 自绘 或用 [Lucide](https://lucide.dev/) / [Tabler Icons](https://tabler.io/icons) 中的中性图标重新着色
- 羊皮纸纹理：CSS `radial-gradient` + 微噪点，不用版权图

---

## 10. 部署方案 · GitHub Pages

### 10.1 仓库
- 用户：**szkailorik**（已用 SSH 配置）
- 仓库：**szkailorik/debate-sprint** · public
- 部署 URL：**https://szkailorik.github.io/debate-sprint/**

### 10.2 仓库结构
```
debate-sprint/                  ← 项目根（Git 仓库）
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions: build + deploy to Pages
├── next.config.js              ← output: 'export', basePath: '/debate-sprint'
├── package.json
├── public/
│   └── .nojekyll               ← 防止 GH Pages 用 Jekyll 处理
├── src/
│   ├── app/
│   ├── components/
│   └── content/                ← phrases.json / patterns.json / topics.json / emergency.json
├── PRD.md
└── README.md
```

### 10.3 `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build           # next build → out/
      - run: touch out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 10.4 `next.config.js` 关键配置
```js
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  output: 'export',
  basePath: isProd ? '/debate-sprint' : '',
  trailingSlash: true,
  images: { unoptimized: true },   // 静态导出不支持 next/image 优化
};
```

### 10.5 一次性手动步骤（在 GitHub 网页上）
仓库创建后，**Settings → Pages → Build and deployment → Source: GitHub Actions**（一次配置即可）。
