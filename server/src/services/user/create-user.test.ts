import { describe, it, expect } from 'vitest';

import { User } from '../../entities/user';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { getRandomUser } from '../../tests/utils/get-random-user';
import {CreateUser} from './create-user';

describe('Create user tests', ()=> {
    const repository = new InMemoryUserRepository();
    const createUser = new CreateUser(repository)
    it('Should be able to create a user', async ()=> {
        const user = getRandomUser();
        const createdUser = await createUser.execute(user);
        
        expect(createdUser).toBeInstanceOf(User);
    })
    
    it('Should not be able to create another user since email is already taken', async ()=> {
        const user1 = getRandomUser();
        await expect(createUser.execute(user1)).rejects.toThrow();
    });
});