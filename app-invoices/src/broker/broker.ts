import amqp from 'amqplib'
import { env } from '../env/env.ts'

export const broker = await amqp.connect(env.BROKER_URL)
