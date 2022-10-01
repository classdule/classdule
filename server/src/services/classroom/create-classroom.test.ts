import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";
import { InMemoryAcademyRepository } from "../../repositories/in-memory/in-memory-academy-repository";
import { Academy } from "../../entities/academy";

describe('Create classroom tests', ()=> {
    it('Should be able to create an classroom', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository();
        const academyRepository = new InMemoryAcademyRepository();
        academyRepository.academies = [
            new Academy({
                educatorsIds: ['aaaa'],
                location: 'Any location',
                name: 'Any name',
                responsibleEducatorId: 'aaaa'
            }, 'aaaa')
        ];
        const createClassroom = new CreateClassroom(
            classroomRepository,
            academyRepository,
        );
        
        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00')
        });

        expect(await createClassroom.do(classroomToCreate)).toBeInstanceOf(Classroom);
        expect(classroomRepository.classrooms.length).toBeGreaterThan(0);

    });
});