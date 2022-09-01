let environment

if (typeof window === 'undefined') {
  const { server } = require('./server')
  server.listen()
  environment = 'server'
} else {
  const { worker } = require('./browser')
  worker.start()
  environment = 'browser'
}

export { environment }
