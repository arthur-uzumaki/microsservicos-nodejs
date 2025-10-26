import { channels } from './channels/index.ts'

channels.orders.consume(
  'orders',
  async message => {
    if (!message) {
      return null
    }
    console.log(message?.content.toString())

    channels.orders.ack(message)
  },
  {
    noAck: false,
  }
)

// acknowledge => reconhecer
