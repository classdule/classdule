import { User } from '../../entities/user'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import {ChangeUserName} from './change-username'

describe('Create user tests', ()=> {
    const repository = new InMemoryUserRepository()
    const changeUsername = new ChangeUserName(repository)
    it('Should be able to create a user', async ()=> {
        const user = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            id: 'aaaa-bbbb',
            name: 'John Doe',
            password: 'Password#123'
        })
        repository.create(user)
        const updatedUser = await changeUsername.execute(user.id, 'John Doe2')
        
        expect(updatedUser?.name).toBe('John Doe2')
    })
})