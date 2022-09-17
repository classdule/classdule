import { describe, it, expect } from "vitest";

import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { getRandomUser } from "../../tests/utils/get-random-user";
import { CreateUser } from "../user/create-user";
import { Signin } from "./sign-in";

describe('Sign-in tests', () => {
    const repository = new InMemoryUserRepository()
    it('Should successfully sign-in', async () => {
        const exampleUser = getRandomUser()
        const createUser = new CreateUser(repository)
        await createUser.execute(exampleUser)
        const signIn = new Signin(repository)
        const {user, validPassword} = await signIn.execute(exampleUser.name, exampleUser.password)
        expect(user).toBeInstanceOf(User)
        expect(validPassword).toBeTruthy()
    })
})