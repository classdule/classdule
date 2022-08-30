import request from 'supertest'
import { createServer } from '../src/app'

describe('Endpoint tests', ()=> {
    it('Should return a list of users', async ()=> {
        const response = await request(createServer())
            .get('/users')
            .expect(200)
        expect(response.body.length > 0).toBe(true)
    })
})