import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().startsWith('postgresql://'),
  BROKER_URL: z.url(),
  PORT: z.coerce.number().positive().default(3333),
  HOSTNAME: z.string(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  OTEL_TRACES_EXPORTER: z.string(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string(),
  OTEL_SERVICE_NAME: z.string(),
  OTEL_NODE_ENABLED_INSTRUMENTATIONS: z.string(),
})

export const env = envSchema.parse(process.env)
