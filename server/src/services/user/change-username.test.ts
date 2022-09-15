import { describe, it, expect } from 'vitest'

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
            name: 'John Doe',
            password: 'Password#123'
        })
        const createdUser = await repository.create(user)

        const updatedUser = await changeUsername.execute(createdUser.id, 'John Doe2')
        
        expect(updatedUser?.name).toBe('John Doe2')
    })
})