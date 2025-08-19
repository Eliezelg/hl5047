module.exports = {
  apps: [{
    name: 'hl5047-site',
    script: 'npm',
    args: 'start',
    cwd: '/home/hl5047/htdocs/hl5047.co.il',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '800M',
    node_args: '--max-old-space-size=768',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=768',
      REDIS_URL: 'redis://localhost:6379'
    },
    error_file: '/home/hl5047/logs/pm2/error.log',
    out_file: '/home/hl5047/logs/pm2/out.log',
    merge_logs: true,
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    watch: false,
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
};