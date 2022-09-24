import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";

describe('Create classroom tests', ()=> {
    it('Should be able to create an classroom', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository()
        const createClassroom = new CreateClassroom(classroomRepository);
        
        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00')
        })

        expect(createClassroom.do(classroomToCreate)).resolves

    })
    it('Should not create classroom whose dates overlaps each other', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository();
        const createClassroom = new CreateClassroom(classroomRepository);

        const classroom1 = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            type: 'basic',
            weekdays: [1]
        })
        const classroom2 = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            type: 'basic',
            weekdays: [1]
        })

        await createClassroom.do(classroom1)
        expect(()=> createClassroom.do(classroom2)).rejects.toThrow()
        
        const classroom3 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            type: 'basic',
            weekdays: [1]
        })
        expect(createClassroom.do(classroom3)).resolves
        const classroom4 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            type: 'basic',
            weekdays: [2]
        })
        expect(createClassroom.do(classroom4)).resolves
        const classroom5 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: parseISO('1970-01-01 23:00'),
            startsAt: parseISO('1970-01-01 21:00'),
            type: 'basic',
            weekdays: [2]
        })
        expect(createClassroom.do(classroom5)).resolves
    })
})