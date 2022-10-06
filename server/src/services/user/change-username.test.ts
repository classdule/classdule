import { describe, it, expect } from 'vitest';

import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { getRandomUser } from '../../tests/utils/get-random-user';
import {ChangeUserName} from './change-username';

describe('Change username tests', ()=> {
    const repository = new InMemoryUserRepository();
    const changeUsername = new ChangeUserName(repository);
    it('Should be able to change username', async ()=> {
        const user = getRandomUser();
        const createdUser = await repository.create(user);

        const updatedUser = await changeUsername.execute(createdUser.id, 'John Doe2');
        
        expect(updatedUser?.name).toBe('John Doe2');
    });
});