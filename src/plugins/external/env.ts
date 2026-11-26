import env, { FastifyEnvOptions } from '@fastify/env'
import ajvFormats from 'ajv-formats'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number
      SERVER_URL: string
    }
  }
}

const schema = {
  type: 'object',
  required: ['SERVER_URL'],
  properties: {
    SERVER_URL: {
      type: 'string',
      format: 'uri',
    },
  },
} as const

export const autoConfig: FastifyEnvOptions = {
  schema,
  dotenv: true,
  data: process.env,
  ajv: {
    customOptions(ajvInstance) {
      ajvFormats.default(ajvInstance)
      return ajvInstance
    },
  },
}

export default env
