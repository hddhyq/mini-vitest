# Mini Vitest 实现原理

一个轻量级的测试框架实现，帮助理解现代测试框架的核心原理。

## 项目结构

```
mini-vitest/
├── src/
│ ├── core/ # 核心实现
│ │ ├── state.ts # 状态管理
│ │ ├── runner.ts # 测试运行器
│ │ ├── types.ts # 类型定义
│ │ ├── watcher.ts # 文件监视器
│ │ └── hooks.ts # 生命周期钩子
│ ├── expect/ # 断言系统
│ │ └── index.ts
│ └── cli/ # 命令行工具
│ └── watch.ts # 监视模式入口
├── examples/ # 测试示例
└── docs/ # 文档
```

## 核心概念

### 1. 状态管理
- 使用函数式方式管理全局状态
- 支持测试套件的嵌套和隔离
- 通过闭包维护测试上下文

### 2. 测试结构
- `TestCase`: 单个测试用例的定义和执行
- `TestSuite`: 测试套件，组织和管理测试用例
- `TestResult`: 测试执行结果
- `SuiteResult`: 测试套件执行结果

### 3. 核心功能
- 测试运行器：执行测试并收集结果
- 断言系统：提供测试断言能力
- 生命周期：管理测试前后的设置和清理
- 监视系统：支持文件变更和热重载

## 使用示例

### 基础测试

```typescript
import { describe, test, expect } from 'mini-vitest';

describe('Calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});
```

### 异步测试

```typescript
test('async test', async () => {
  const result = await Promise.resolve(42);
  expect(result).toBe(42);
});
```

### 生命周期钩子

```typescript
describe('Suite', () => {
beforeEach(() => {
// 每个测试前执行
});
afterEach(() => {
// 每个测试后执行
});
});
```

## 特性列表

### 已实现功能
- [x] 基础测试 API (describe, test)
- [x] 异步测试支持
- [x] 生命周期钩子 (beforeEach, afterEach)
- [x] 基础断言系统
- [x] 测试结果统计
- [x] 监视模式（热重载）

### 断言方法
- `toBe`: 严格相等比较
- `toEqual`: 深度对象比较
- `toBeDefined`: 已定义检查
- `toBeNull`: null 检查

## 运行测试

```bash
# 安装依赖
pnpm install

# 运行单次测试
pnpm run test

# 运行监视模式
pnpm run test:watch
```

## 监视模式特性

- 自动检测文件变化
- 增量更新：只重新运行变更的测试
- 智能缓存：自动清理 require 缓存
- 实时反馈：即时显示测试结果

## 实现原理

### 1. 函数式设计
- 使用闭包管理状态
- 函数组合实现功能
- 避免类继承的复杂性

### 2. 异步处理
- Promise 基础异步支持
- async/await 语法支持
- 异步生命周期钩子

### 3. 文件监视
- 使用 chokidar 实现文件监视
- 支持热重载
- 智能缓存管理

## 扩展计划
1. 测试覆盖率统计
2. 并行测试执行
3. 测试过滤和标记
4. 快照测试支持
5. 测试报告生成
6. 测试超时配置
7. 更多断言方法

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT

## 测试隔离和并行执行

### 并行执行
你可以通过设置 `parallel` 选项来让测试并行执行：