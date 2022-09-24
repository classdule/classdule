import { describe, it, expect } from "vitest";

import {addHours, subHours, subDays, parseISO} from 'date-fns'

import { Checkin } from "../../entities/checkin";
import { Classroom } from "../../entities/classroom";
import { InMemoryCheckinRepository } from "../../repositories/in-memory/in-memory-checkin-repository";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateCheckin } from "./create-checkin";

describe('Create check-in tests', ()=> {
    it('Should be able to create a check-in', async ()=> {
        const checkinRepository = new InMemoryCheckinRepository();
        const classroomRepository = new InMemoryClassroomRepository();

        const existingClassroom = await classroomRepository.create(new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            type: 'basic',
            startsAt: parseISO('1970-01-01 20:30'),
            endsAt: parseISO('1970-01-01 22:00'),
            weekdays: [1, 3]
        }))

        const createCheckin = new CreateCheckin(
            classroomRepository,
            checkinRepository
        );

        const exampleCheckin = new Checkin({
            classroomId: existingClassroom.id,
            userId: 'aaaa'
        })

        expect(createCheckin.do({
            checkin: exampleCheckin
        })).resolves
    });
    it('Should not be able to create a check-in since checkin cannot be created a day before the classroom', async ()=> {
        const checkinRepository = new InMemoryCheckinRepository();
        const classroomRepository = new InMemoryClassroomRepository();

        const existingClassroom = await classroomRepository.create(new Classroom({
            academyId: 'aaaa',
            educatorId: 'bbbb',
            type: 'basic',
            startsAt: parseISO('1970-01-01 20:30'),
            endsAt: parseISO('1970-01-01 22:00'),
            weekdays: [1, 3]
        }))

        const createCheckin = new CreateCheckin(
            classroomRepository,
            checkinRepository
        );

        const exampleCheckin = new Checkin({
            classroomId: existingClassroom.id,
            userId: 'bbbb',
            createdAt: subDays(new Date(), 1),
        })

        expect(createCheckin.do({
            checkin: exampleCheckin
        })).rejects.toThrow()
    });
});