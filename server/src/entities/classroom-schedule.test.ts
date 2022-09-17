import { describe, expect, it } from "vitest";
import { ClassroomSchedule } from "./classroom-schedule";

import {addHours} from 'date-fns'

describe('Classroom tests', ()=> {
    it('Should be able to create a classroom schedule', ()=> {
        const schedule = new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: addHours(new Date(), 2),
            weekDays: [1, 3, 5]
        })
        expect(schedule.weekDays).toHaveLength(3)
    })

    it('Should fail to create a schedule since the dates entry is invalid', ()=> {
        expect(() => new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: new Date(),
            weekDays: [2, 4]
        })).toThrow()
    })

    it('Should fail to create a schedule since a classroom cannot last longer than 18 hours', ()=> {
        expect(() => new ClassroomSchedule({
            startsAt: new Date(),
            endsAt: addHours(new Date(), 24),
            weekDays: [2, 4]
        })).toThrow()
    })
})