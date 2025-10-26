import type { OrderCreatedMessage } from '../../../../contracts/messages/order-created-message.ts'
import { channels } from '../channels/index.ts'

export function dispatchOrderCreated({
  orderId,
  amount,
  customer,
}: OrderCreatedMessage) {
  channels.orders.sendToQueue(
    'orders',
    Buffer.from(JSON.stringify({ orderId, amount, customer }))
  )
}
