import { DeleteUser } from "./delete-user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { User } from "../../entities/user";

describe('Delete user test', () => {
    const repository = new InMemoryUserRepository();
    const deleteUser = new DeleteUser(repository)
    it('Should successfully delete a user', async ()=> {
        const user = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            id: 'aaaa',
            name: 'John Doe',
            password: 'password123'
        })

        await repository.create(user)
        await deleteUser.execute('aaaa')
        expect(repository.users.length).toBe(0)
    })
})