import { test, expect } from "vitest"

import { User } from "./user"

test('Entity user test', ()=> {
    const user = new User({
        birthDay: new Date(),
        currentGrade: 0,
        currentGraduation: 'branca',
        name: 'John Doe',
        password: 'password#123'
    })
    expect(user).toBeInstanceOf(User)
    expect(user.id).toBeDefined()
})