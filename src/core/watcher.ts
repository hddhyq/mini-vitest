import * as chokidar from 'chokidar';
import * as path from 'path';
import * as fs from 'fs';
import { createRunner } from './runner';
import { state } from './state';

const findTestFiles = (dir: string): string[] => {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findTestFiles(fullPath));
    } else if (/\.test\.(ts|js)$/.test(item)) {
      files.push(fullPath);
    }
  }

  return files;
};

export const createWatcher = (testDir: string) => {
  const runner = createRunner();

  const runTests = async (filePath?: string) => {
    // 清除之前的测试状态
    state.suites = [];

    if (filePath) {
      // 只运行变更的测试文件
      console.log(`\n🔄 File changed: ${path.relative(process.cwd(), filePath)}`);
      // 清除 require 缓存
      delete require.cache[require.resolve(filePath)];
      await import(filePath);
    } else {
      // 首次运行所有测试
      const testFiles = findTestFiles(testDir);
      for (const file of testFiles) {
        await import(file);
      }
    }

    // 运行收集到的测试套件
    for (const suite of state.suites) {
      await runner.runSuite(suite);
    }
  };

  const watcher = chokidar.watch([
    path.join(testDir, '**/*.test.ts'),
    path.join(testDir, '**/*.test.js')
  ], {
    ignored: /node_modules/,
    persistent: true
  });

  watcher
    .on('ready', () => {
      console.log('\n👀 Watching for file changes...');
      runTests();
    })
    .on('change', (filePath) => {
      runTests(filePath);
    });

  return {
    close: () => watcher.close(),
    runTests
  };
};