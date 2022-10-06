import { expect, describe, it } from "vitest"

import {subDays} from 'date-fns';

import { getPastDate } from "../tests/utils/get-past-date"

import { User } from "./user"

describe('User tests', ()=> {
    it('Should be able to instantiate a user', ()=> {
        const user = new User({
            birthDay: getPastDate(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'John Doe',
            password: 'password#123',
            graduationDate: subDays(new Date(), 20),
            email: 'email@email.com'
        })
        expect(user).toBeInstanceOf(User)
        expect(user.id).toBeDefined()
    })

    it('Should not be able to instantiate a user since birthday is invalid', ()=> {
        expect(()=> new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'Joe Doe Junior',
            password: 'areallybadpassword',
            graduationDate: subDays(new Date(), 20),
            email: 'email@email.com'
        })).toThrow()
    })
})