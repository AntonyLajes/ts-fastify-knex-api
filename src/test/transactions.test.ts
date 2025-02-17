import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import supertest from "supertest"
import { app } from "../app"
import { execSync } from "node:child_process"

describe('transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback')
        execSync('npm run knex -- migrate:latest')
    })
    
    it('should be able to create a new transaction', async () => {
        await supertest(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })

    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await supertest(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await supertest(app.server)
            .get('/transactions')
            .set('Cookie', cookies!)

        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
            })
        ])
    })
})