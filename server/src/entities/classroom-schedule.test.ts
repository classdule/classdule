import { describe, expect, it } from "vitest";
import { ClassroomSchedule } from "./classroom-schedule";

import {addHours} from 'date-fns'

describe('Classroom schedule tests', ()=> {
    it('Should be able to create a classroom schedule', ()=> {
        expect(() => new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: addHours(new Date(), 2),
            weekDay: 1,
        })).toBeDefined()
    })

    it('Should fail to create a schedule since the dates entry is invalid', ()=> {
        expect(() => new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: new Date(),
            weekDay: 2,
        })).toThrow()
    })

    it('Should fail to create a schedule since a classroom cannot last longer than 18 hours', ()=> {
        expect(() => new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: addHours(new Date(), 24),
            weekDay: 4,
        })).toThrow()
    })
})