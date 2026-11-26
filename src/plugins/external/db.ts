import fp from 'fastify-plugin'

export default fp(
  async (app) => {
    await app.register(import('@fastify/postgres'), {
      connectionString: app.config.DATABASE_URL,
    })
  },
  {
    name: 'postgres',
    dependencies: ['@fastify/env'],
  },
)
