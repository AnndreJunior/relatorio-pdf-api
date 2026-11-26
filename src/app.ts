import { FastifyError, FastifyInstance } from 'fastify'
import autoload from '@fastify/autoload'
import path from 'node:path'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export async function buildApp(app: FastifyInstance) {
  app
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)

  await app.register(autoload, {
    dir: path.join(import.meta.dirname, 'plugins/external'),
  })

  app.register(autoload, {
    dir: path.join(import.meta.dirname, 'routes'),
  })

  app.setErrorHandler((err: FastifyError, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(err)) {
      const errors = err.validation.reduce<Record<string, string[]>>(
        (acc, { instancePath, message }) => {
          const field = instancePath.replace('/', '')
          acc[field] = acc[field] || []
          acc[field].push(message ?? 'Campo inválido')
          return acc
        },
        {},
      )

      reply.code(400)
      return {
        message: 'Ocorreu um ou mais erros de validação.',
        errors,
      }
    }

    reply.code(err.statusCode ?? 500)
    let message = 'Internal server error'
    if (err.statusCode && err.statusCode < 500) {
      message = err.message
    }

    return { message }
  })
}
