import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const autoPrefix = '/healthz'

const plugin: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/',
    {
      schema: {
        tags: ['Health Check'],
        response: {
          200: z.string(),
        },
      },
    },
    async (_, reply) => reply.status(200).send('Healthy'),
  )
}

export default plugin
