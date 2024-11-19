import { createWatcher } from '../core/watcher';
import * as path from 'path';

const testDir = path.join(process.cwd(), 'examples');
const watcher = createWatcher(testDir);

// 处理进程退出
process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});