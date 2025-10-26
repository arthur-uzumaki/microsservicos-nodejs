import '@opentelemetry/auto-instrumentations-node/register'
import '../broker/subscriber.ts'

import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../env/env.ts'

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

if (env.NODE_ENV === 'development') {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: ' Microsserviços Escaláveis',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
}

app.register(scalar, {
  routePrefix: '/docs',
})

app.get('/health', () => {
  return 'Ok'
})

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('[Invoices] HTTP running server')
})
