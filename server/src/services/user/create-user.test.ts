import { describe, it, expect } from 'vitest'

import { User } from '../../entities/user'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository'
import {CreateUser} from './create-user' 

describe('Create user tests', ()=> {
    const repository = new InMemoryUserRepository()
    const createUser = new CreateUser(repository)
    it('Should be able to create a user', async ()=> {
        const user = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'John Doe',
            password: 'Password#123'
        })
        const createdUser = await createUser.execute(user)
        
        expect(createdUser).toBeInstanceOf(User)
    })
    
    it('Should not be able to create another user since username is already taken', async ()=> {
        const user1 = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'John Doe#1',
            password: 'Password#123'
        })
        const user2 = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'John Doe#1',
            password: 'Password#123'
        })
        await createUser.execute(user1)
        await expect(createUser.execute(user2)).rejects.toThrow('Username already in use')

    })
})