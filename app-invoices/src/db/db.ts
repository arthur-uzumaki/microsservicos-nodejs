import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '../env/env.ts'

export const db = drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
})
