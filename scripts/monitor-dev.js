const { spawn } = require('child_process');
const pidusage = require('pidusage');
const os = require('os');

const totalMem = os.totalmem();
const MEM_THRESHOLD = Math.floor(totalMem * 0.9); // 90% of total memory
const CPU_THRESHOLD = 90; // percent

const child = spawn('npm', ['run', 'dev'], { shell: true, stdio: 'inherit' });

console.log('Started dev server, pid=', child.pid);

let highStart = null;

const monitor = setInterval(async () => {
  try {
    const stats = await pidusage(child.pid);
    const mem = stats.memory; // bytes
    const cpu = stats.cpu; // percent
    console.log(`monitor: pid=${child.pid} cpu=${cpu.toFixed(1)}% mem=${(mem / 1024 / 1024).toFixed(1)}MB`);
    if (mem > MEM_THRESHOLD || cpu > CPU_THRESHOLD) {
      if (!highStart) highStart = Date.now();
      else if (Date.now() - highStart > 10000) {
        console.error('Resource threshold exceeded >10s — killing dev server');
        child.kill();
        clearInterval(monitor);
        process.exit(2);
      }
    } else {
      highStart = null;
    }
  } catch (err) {
    // monitoring may fail if process ended
  }
}, 1000);

child.on('exit', (code, signal) => {
  console.log('Dev server exited', code, signal);
  clearInterval(monitor);
  process.exit(code || 0);
});
