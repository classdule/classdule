import { User } from "../../entities/user";

export function getRandomUser(): User{
    return new User({
        birthDay: new Date(),
        currentGrade: 0,
        currentGraduation: 'branca',
        id: `${Math.random()}`,
        name: 'John Doe',
        password: 'password'
    })
}