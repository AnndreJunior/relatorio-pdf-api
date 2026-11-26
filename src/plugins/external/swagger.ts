import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export default fp(async (app) => {
  app.register(swagger, {
    openapi: {
      info: {
        title: 'Relatório PDF API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(swaggerUi, {
    routePrefix: '/docs',
  })

  app.log.info(`Access the API documentation on ${app.config.SERVER_URL}/docs`)
})
