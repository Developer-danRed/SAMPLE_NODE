module.exports = {
    apps: [{
        name: "sample",
        script: "./app.js",
        log: './logs/combined.outerr.log',
        output: 'logs/pm2/out.log',
        error: 'logs/pm2/error.log',
        watch: true,
        ignore_watch: ["logs/*", "public/upload/*", "public/*"],
        env: {
            NODE_ENV: "devel",
        },
        env_production: {
            NODE_ENV: "prod",
        }
    }]
}