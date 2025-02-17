import fastify from "fastify"
import cookies from "@fastify/cookie"
import { transactions } from './routes/transactionsRoutes'

export const app = fastify()

app.register(cookies)

app.register(transactions, {
  prefix: 'transactions'
})
