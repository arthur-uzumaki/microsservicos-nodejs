import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { customers } from './customers.ts'

export const ordersStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'canceled',
])

export const orders = pgTable('orders', {
  id: text().primaryKey(),
  customerId: text()
    .notNull()
    .references(() => customers.id),
  amount: integer().notNull(),
  status: ordersStatusEnum().notNull().default('pending'),
  createdAt: timestamp().defaultNow().notNull(),
})
