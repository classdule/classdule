import request from 'supertest'
import { createServer } from '../src/app'

const invalidAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('Endpoint tests', ()=> {
    it('Should not give access since user is not authenticated', async () => {
        await request(createServer()).post('/user/changeUsername').expect(401)
    })
    it('Should not give access since user authentication is invalid', async () => {
        await request(createServer())
            .post('/user/changeUsername')
            .set('Cookie', [`access_token=${invalidAccessToken}`])
            .expect(403)
    })
})