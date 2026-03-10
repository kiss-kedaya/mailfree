---
name: emoji-to-icon-migration
overview: 将临时邮箱项目中的所有emoji表情替换为SVG/Icon图标，并采用Vercel设计风格，实现现代化、专业化的UI界面
design:
  architecture:
    framework: html
  styleKeywords:
    - Minimalism
    - Vercel Style
    - Monochrome
    - Geometric
  fontSystem:
    fontFamily: Inter
    heading:
      size: 24px
      weight: 700
    subheading:
      size: 16px
      weight: 600
    body:
      size: 14px
      weight: 400
  colorSystem:
    primary:
      - "#000000"
      - "#00e4f5"
    background:
      - "#FFFFFF"
      - "#FAFAFA"
      - "#000000"
    text:
      - "#000000"
      - "#666666"
      - "#999999"
    functional:
      - "#0070f3"
      - "#00A67E"
      - "#EE4444"
todos:
  - id: explore-js-emoji
    content: Use [subagent:code-explorer] to find all emoji usage in JavaScript files
    status: completed
  - id: create-icon-system
    content: Create Lucide Icons integration in HTML head and CSS icon styles
    status: completed
    dependencies:
      - explore-js-emoji
  - id: replace-css-theme
    content: Rewrite app.css with Vercel-style color system and simplified effects
    status: completed
    dependencies:
      - create-icon-system
  - id: replace-html-icons
    content: Replace all emojis in HTML files with Lucide icons
    status: completed
    dependencies:
      - create-icon-system
  - id: replace-js-icons
    content: Update JavaScript files to use Lucide icons instead of emojis
    status: completed
    dependencies:
      - explore-js-emoji
  - id: update-templates
    content: Update template files (loading, footer, toast) with new style
    status: completed
    dependencies:
      - create-icon-system
---

## 产品概述

将临时邮箱应用的前端界面从当前的玻璃态+渐变+emoji风格改造为极简的Vercel风格，同时将所有emoji图标替换为SVG图标。

## 核心功能

- 移除所有emoji图标，改用Lucide/Heroicons风格的SVG图标
- 将整体视觉风格改为Vercel风格：黑白灰配色、细线边框、适度圆角、简洁阴影
- 保持现有功能不变，仅改变视觉呈现
- 确保暗色模式的兼容性

## 技术栈选择

- **图标方案**: Lucide Icons（通过CDN引入，与Vercel风格一致）
- **CSS架构**: 保持现有文件结构，逐步替换CSS变量和样式
- **字体**: 使用Vercel风格字体栈 `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`

## 实施方案

### 图标替换策略

1. 引入Lucide Icons CDN
2. 创建图标映射表，将emoji映射到对应的Lucide图标名称
3. 修改HTML中的emoji为`<i data-lucide="icon-name"></i>`格式
4. 页面加载后通过lucide.createIcons()渲染图标

### CSS改造策略

1. 重写CSS变量：从渐变色改为纯色黑白灰系统
2. 简化圆角：从16-32px减小到4-12px
3. 移除玻璃态效果：backdrop-filter、复杂渐变
4. 简化阴影：使用更轻的阴影
5. 按钮风格：黑底白字/白底黑字为主

### 文件修改范围

- **HTML文件**(6个): index.html, login.html, app.html, mailbox.html, mailboxes.html, admin.html
- **CSS文件**(2个): app.css, login.css
- **模板文件**(3个): loading.html, footer.html, toast.html
- **JS文件**(若干): 动态生成emoji的模块

## 实施注意事项

- 保持暗色模式的`prefers-color-scheme: dark`支持
- 保留所有交互功能（hover、focus状态）
- 动画效果适度简化但保留基本过渡
- 图标尺寸统一使用16px/20px/24px标准尺寸

## 设计风格

采用Vercel极简设计风格，强调功能性和可读性。

### 视觉特点

- **配色**: 黑白灰主色调，蓝色(#0070f3)作为强调色
- **边框**: 1px细线，颜色#eaeaea(亮)/#333(暗)
- **圆角**: 统一使用4-8px适度圆角
- **阴影**: 微妙的阴影效果
- **背景**: 纯色背景，白色(#fff)或近黑(#000/#111)

### 图标风格

- 使用Lucide Icons线性图标
- 1.5px描边宽度
- 与文字对齐，视觉统一

### 页面结构

- 顶部导航栏：简洁细线分隔
- 卡片：白色背景+细边框+微阴影
- 按钮：黑色实心(主要) / 白色边框(次要)
- 表单：细边框输入框，focus时显示蓝色边框

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 探索JavaScript文件中的动态emoji生成代码，确保完整替换
- Expected outcome: 定位所有动态生成emoji的JS代码位置，确保不遗漏