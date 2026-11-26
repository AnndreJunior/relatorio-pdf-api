import fastify from 'fastify'
import { buildApp } from './app.js'

const app = fastify({
  logger: true,
})

async function bootstrap() {
  app.register(buildApp)

  await app.ready()

  try {
    const port = Number(process.env.PORT)
    app.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
