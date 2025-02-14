import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function transactions(app: FastifyInstance){
    app.post('/', async (request, reply) => {
        const createTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionsBodySchema.parse(request.body)

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        return reply.status(201).send()
    })
}