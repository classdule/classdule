import { describe, expect, it } from "vitest";

import { addHours } from "date-fns";

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
            endsAt: addHours(new Date(), 2),
            startsAt: new Date()
        })

        expect(createClassroom.do(classroomToCreate)).resolves

    })
    it('Should not create classroom whose dates overlaps each other', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository();
        const createClassroom = new CreateClassroom(classroomRepository);

        const classroom1 = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            endsAt: addHours(new Date(), 2),
            startsAt: new Date(),
            type: 'basic',
            weekdays: [1]
        })
        const classroom2 = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            endsAt: addHours(new Date(), 2),
            startsAt: new Date(),
            type: 'basic',
            weekdays: [1]
        })

        await createClassroom.do(classroom1)
        expect(()=> createClassroom.do(classroom2)).rejects.toThrow()
        
        const classroom3 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: addHours(new Date(), 2),
            startsAt: new Date(),
            type: 'basic',
            weekdays: [1]
        })
        expect(createClassroom.do(classroom3)).resolves
        const classroom4 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: addHours(new Date(), 2),
            startsAt: new Date(),
            type: 'basic',
            weekdays: [2]
        })
        expect(createClassroom.do(classroom4)).resolves
        const classroom5 = new Classroom({
            academyId: 'bbbb',
            educatorId: 'aaaa',
            endsAt: addHours(new Date(), 4),
            startsAt: addHours(new Date(), 2),
            type: 'basic',
            weekdays: [2]
        })
        expect(createClassroom.do(classroom5)).resolves
    })
})