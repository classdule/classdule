import request from 'supertest'
import {createServer} from '../src/app'
describe('Endpoint tests', () => {
    it('Should successfully return a list of belts', async () => {
        const response = await request(createServer())
            .get('/belts')
            .expect(200)
        expect(response.body.length > 0).toBe(true)
    })
})

