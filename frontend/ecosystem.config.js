module.exports = [{
  script: 'server.js',
  name: 'izing-frontend',
  exec_mode: 'cluster',
  cron_restart: '00 00 * * *',
  instances: 1,
  watch: false
}]
