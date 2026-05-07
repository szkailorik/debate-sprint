# DebateSprint

> 一周内把零基础三年级小朋友"扶上场"的英文辩论速成网页系统。

**Live:** https://szkailorik.github.io/debate-sprint/

## What's inside

5 个模块，按教学价值排序：

1. **PREP Structure** — 万能结构模板（立论/反驳/总结三个变体）
2. **10 Power Phrases** — 必背英文金句
3. **Pattern Recognition** — 5 种对手套路 + 反击模板，25 题练习游戏
4. **Topic Armory** — 10 个常见辩题的正反方论点 + 例子
5. **Emergency Kit** — 4 个临场救急话术

详细设计见 [PRD.md](./PRD.md)。

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 部署

推到 `main` 分支，GitHub Actions 自动构建并发布到 GitHub Pages。

## 技术栈

- Next.js 16 (static export)
- React 19
- TailwindCSS 4
- TypeScript
- 部署：GitHub Pages
- UI 风格：塞尔达·旷野之息（自绘 SVG，未使用任天堂 IP 资产）
