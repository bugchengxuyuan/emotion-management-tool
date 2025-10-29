# 情绪管理工具箱

基于CBT（认知行为疗法）、DBT（辩证行为疗法）和ACT（接纳承诺疗法）的综合情绪管理Web应用。

## 功能特性

### 核心功能

- **情绪追踪器** - 记录日常情绪状态、触发因素和身体感觉
- **思维记录** - 七栏思维记录法，识别和挑战负面自动化思维
- **危机工具(TIPP)** - 情绪强度8-10/10时的急救技能
- **DEAR MAN沟通** - DBT人际效能技能，有效表达需求和设定边界
- **进展分析** - 追踪情绪模式和治疗进展
- **使用指南** - 详细的工具使用说明和学习路径

### 技术特点

- ✅ 基于科学心理疗法（CBT、DBT、ACT）
- ✅ 完全本地存储（IndexedDB），保护隐私
- ✅ 响应式设计，支持移动端
- ✅ 无需登录，即开即用
- ✅ 数据可导出/导入

## 技术栈

- **前端框架**: React 18 + TypeScript
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **状态管理**: React Context + useReducer
- **数据持久化**: LocalForage (IndexedDB)
- **构建工具**: Vite

## 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:5173

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 预览生产构建

\`\`\`bash
npm run preview
\`\`\`

## 项目结构

\`\`\`
emotion-management-tool/
├── src/
│   ├── components/         # React组件
│   │   ├── layout/        # 布局组件
│   │   ├── dashboard/     # 仪表板
│   │   ├── emotion-tracker/   # 情绪追踪
│   │   ├── thought-record/    # 思维记录
│   │   ├── crisis-tools/      # 危机工具
│   │   ├── communication/     # DEAR MAN
│   │   ├── progress/          # 进展分析
│   │   ├── guide/            # 使用指南
│   │   └── ui/               # 基础UI组件
│   ├── contexts/          # React Context
│   ├── hooks/            # 自定义Hooks
│   ├── lib/              # 工具函数和服务
│   ├── types/            # TypeScript类型定义
│   ├── data/             # 静态数据
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 入口文件
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── dist/                 # 构建输出
├── tailwind.config.js    # Tailwind配置
├── vite.config.ts        # Vite配置
└── package.json
\`\`\`

## 使用说明

### 情绪追踪器

1. 选择当前主要情绪
2. 使用滑块评估情绪强度（0-10）
3. 记录触发事件和身体感觉
4. 选择使用的应对技能并评估效果
5. 坚持每天记录3次，建立情绪觉察习惯

### 思维记录

1. 描述触发情绪的具体情境
2. 识别情绪并评分（0-100%）
3. 捕捉自动化思维
4. 列出支持和反对证据
5. 建立平衡思维
6. 重新评估情绪强度
7. 观察情绪改善程度

### TIPP危机技能

当情绪强度达到8-10/10时使用：

- **T**emperature（温度）- 冷水洗脸，激活潜水反射
- **I**ntense Exercise（剧烈运动）- 10-15分钟快速运动
- **P**aced Breathing（节奏呼吸）- 4-2-6呼吸法
- **P**aired Muscle（渐进式放松）- 紧张-放松肌肉

### DEAR MAN沟通

重要对话前的准备工具：

- **D**escribe - 客观描述事实
- **E**xpress - 表达感受和想法
- **A**ssert - 清晰主张需求
- **R**einforce - 说明满足需求的好处
- **M**indful - 保持专注，防止话题转移
- **A**ppear - 自信的身体语言
- **N**egotiate - 准备妥协方案

## 数据隐私

- 所有数据存储在浏览器本地（IndexedDB）
- 不会上传到任何服务器
- 数据可以导出为JSON文件备份
- 可以清除浏览器数据来删除所有记录

## 重要提示

⚠️ **本工具仅供个人情绪管理使用，不能替代专业心理咨询或治疗。**

🆘 **如果你有自伤、自杀想法，或情绪问题严重影响生活，请立即寻求专业帮助：**
- 心理危机热线: 400-161-9995（24小时）
- 当地精神卫生中心
- 专业心理咨询师

## 开发计划

未来可能添加的功能：

- [ ] 数据可视化图表（情绪趋势、技能效果）
- [ ] 提醒通知功能
- [ ] 更多心理技能（正念练习、价值观澄清等）
- [ ] 多语言支持
- [ ] PWA支持（离线使用）
- [ ] 数据云同步（可选）

## 许可证

MIT License

## 致谢

本项目基于以下心理疗法的科学研究成果：

- **CBT** (Cognitive Behavioral Therapy) - Aaron Beck, David Burns
- **DBT** (Dialectical Behavior Therapy) - Marsha Linehan
- **ACT** (Acceptance and Commitment Therapy) - Steven Hayes

感谢所有为心理健康事业做出贡献的研究者和临床工作者。

---

**记住：情绪管理是一个过程，不是完美。每一次练习都是进步。**
