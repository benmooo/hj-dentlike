# hj-dentlike

澳洲牙科下单平台重构

### Tech stack

- 前端框架: Vue 3
- 构建工具: Vite
- UI 框架: Element Plus (支持暗黑模式)
- 状态管理: Pinia
- 路由: Vue Router
- HTTP 请求: Axios
- 样式: Tailwind CSS
- 表单校验: Zod
- Vue 组合式实用工具库: VueUse
- 函数式编程库: fp-ts

### 功能模块梳理 (Functional Modules)

#### M1: 基础架构与UI (Infrastructure & UI Foundation)

负责项目初始化、技术选型落地、全局样式（特别是暗黑主题）和可复用组件的搭建。

#### M2: 用户认证 (User Authentication)

负责用户的登录、注册流程。

#### M3: 核心下单流程 (Core Ordering Workflow)

这是项目的核心，包含从创建订单到最终提交的所有步骤。

#### M4: 订单管理 (Order Management)

医生查看和管理历史订单的功能。

#### M5: 沟通与通知 (Communication & Notifications)

工厂与医生之间的在线沟通，以及关键的邮件/小程序通知功能。

### 开发周期与任务拆解 (Cycles & Issues)

我们将整个项目拆分为 4 个开发周期 (Cycles)，每个周期大约 2-3 周。

Cycle 1: 基础奠基与用户核心路径 (Foundation & User Core Path)
目标: 搭建好项目骨架，完成全局UI配置和用户认证流程，让用户可以成功登录和注册。

Cycle 2: 核心下单流程 (Part 1)
目标: 完成下单流程的前半部分，包括患者信息、牙位选择和项目/材料选择。

Cycle 3: 核心下单流程 (Part 2) & 提交
目标: 完成下单流程的后半部分，特别是复杂的种植相关选项，并完成订单提交。

Cycle 4: 订单管理与沟通通知
目标: 完成订单的闭环管理，跨平台消息通知。

### 声明

以上工作量预估基于j并且假设后端 API 能够及时提供且接口定义清晰。

AUS-17 是风险点，小程序和邮件服务的实现细节未知，可能需要更多时间。

所有 "等客户提供" 的内容 都可能成为延期风险，需要在项目开始时尽快明确。

未包含完整的测试、部署和项目管理时间。总工作量上要增加 20%-30% 的缓冲期。

### 项目规划

详见 time-budget.xlsx
