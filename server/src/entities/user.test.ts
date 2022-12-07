import { expect, describe, it } from "vitest"
import {v4 as uuid} from 'uuid';

import {subDays, addYears} from 'date-fns';
import { getPastDate } from "../tests/utils/get-past-date"

import { User } from "./user"

describe('User tests', ()=> {
    it('Should be able to instantiate a user', ()=> {
        const user = new User({
            birthDay: getPastDate(),
            name: 'John Doe',
            password: 'password#123',
            email: 'email@email.com',
            academyIds: [uuid()]
        })
        expect(user).toBeInstanceOf(User)
        expect(user.id).toBeDefined()
    })

    it('Should not be able to instantiate a user since birthday is invalid', ()=> {
        expect(()=> new User({
            birthDay: new Date(),
            name: 'Joe Doe Junior',
            password: 'areallybadpassword',
            email: 'email@email.com',
            academyIds: [uuid()]
        })).toThrow();
        expect(()=> new User({
            birthDay: addYears(new Date(), 8),
            name: 'Joe Doe Junior',
            password: 'areallybadpassword',
            email: 'email@email.com',
            academyIds: [uuid()]
        })).toThrow();

    })
})