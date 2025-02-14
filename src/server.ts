import fastify from 'fastify'
import { env } from './env'
import { transactions } from './routes/transactionsRoutes'

const app = fastify()

app.register(transactions, {
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("HTTP server running!"))
