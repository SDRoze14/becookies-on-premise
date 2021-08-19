module.exports = {
  apps: [
    {
      name: 'beCOOKIES',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}