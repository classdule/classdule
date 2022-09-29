import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";

describe('Create classroom tests', ()=> {
    it('Should be able to create an classroom', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository();
        const createClassroom = new CreateClassroom(classroomRepository);
        
        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00')
        });

        expect(createClassroom.do(classroomToCreate)).resolves;
        expect(classroomRepository.classrooms.length).toBeGreaterThan(0)
        console.log(classroomRepository.classrooms);

    });
});