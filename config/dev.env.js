module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://'+(process.env.BACKEND_HOST || 'zuul')+':'+(process.env.BACKEND_PORT || '5555')+'"'
}
