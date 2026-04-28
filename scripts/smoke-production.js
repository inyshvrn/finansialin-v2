const { spawn } = require('child_process');
const http = require('http');

function run(cmd, args, opts) {
    return spawn(cmd, args, Object.assign({ stdio: 'inherit', shell: true }, opts));
}

function probe() {
    return new Promise((resolve, reject) => {
        const req = http.get({ host: '127.0.0.1', port: 3000, path: '/' }, (res) => {
            res.resume();
            resolve(res.statusCode >= 200 && res.statusCode < 400);
        });
        req.on('error', reject);
        req.setTimeout(2000, () => req.destroy(new Error('timeout')));
    });
}

(async () => {
    try {
        console.log('Building production...');
        const build = run('npm', ['run', 'build']);
        await new Promise((res, rej) => build.on('exit', (code) => (code === 0 ? res() : rej(new Error('build failed ' + code)))));

        console.log('Starting production server...');
        const server = run('npm', ['run', 'start']);

        const maxAttempts = 20;
        const delay = 1000;
        for (let i = 0; i < maxAttempts; i++) {
            await new Promise((r) => setTimeout(r, delay));
            try {
                const ok = await probe();
                if (ok) {
                    console.log('Server is responding (production).');
                    server.kill();
                    process.exit(0);
                }
            } catch (e) {
                // continue polling
            }
        }

        console.error('Server did not respond in time.');
        server.kill();
        process.exit(2);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
