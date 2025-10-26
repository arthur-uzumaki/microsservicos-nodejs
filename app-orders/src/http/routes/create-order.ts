import { randomUUID } from 'node:crypto'
import { trace } from '@opentelemetry/api'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { dispatchOrderCreated } from '../../broker/messages/order-created.ts'
import { db } from '../../db/db.ts'
import { schema } from '../../db/schema/index.ts'

export const createOrderRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/orders',
    {
      schema: {
        tags: ['orders'],
        summary: 'Create order',
        body: z.object({
          amount: z.coerce.number(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { amount } = request.body

      const orderId = randomUUID()

      await db.insert(schema.orders).values({
        id: orderId,
        amount,
        customerId: '52c75143-8f31-4024-8a25-bdbff5cb1c5a',
      })

      trace.getActiveSpan()?.setAttribute('order_id', orderId)

      dispatchOrderCreated({
        orderId,
        amount,
        customer: {
          id: '52c75143-8f31-4024-8a25-bdbff5cb1c5a',
        },
      })
      return reply.status(201).send()
    }
  )
}
