import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";
import { InMemoryAcademyRepository } from "../../repositories/in-memory/in-memory-academy-repository";
import { Academy } from "../../entities/academy";

describe('Create classroom tests', ()=> {
    const classroomRepository = new InMemoryClassroomRepository();
    const academyRepository = new InMemoryAcademyRepository();
    academyRepository.academies = [
        new Academy({
            educatorsIds: ['aaaa', 'cccc'],
            location: 'Any location',
            name: 'Any name',
            responsibleEducatorId: 'aaaa'
        }, 'aaaa')
    ];
    it('Should be able to create an classroom', async ()=> {
        const createClassroom = new CreateClassroom(
            classroomRepository,
            academyRepository,
            'aaaa'
        );
        
        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            content: [
                '3 Koshi waza'
            ]
        });

        expect(await createClassroom.do(classroomToCreate)).toBeInstanceOf(Classroom);
        expect(classroomRepository.classrooms.length).toBeGreaterThan(0);

    });
    it('Should not be able to create a classroom since educator is not associated with academy', async () => {
        const createClassroom = new CreateClassroom(
            classroomRepository,
            academyRepository,
            'aaaa'
        );

        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'bbbb',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            content: [
                '3 Koshi waza'
            ]
        });
        expect(createClassroom.do(classroomToCreate)).rejects.toThrow();
    });
    it('Should not be able to create a classroom since actor is not associated with academy', async () => {
        const createClassroom = new CreateClassroom(
            classroomRepository,
            academyRepository,
            'abab'
        );

        const classroomToCreate = new Classroom({
            academyId: 'aaaa',
            educatorId: 'aaaa',
            weekdays: [2, 4],
            type: 'basic',
            endsAt: parseISO('1970-01-01 21:00'),
            startsAt: parseISO('1970-01-01 19:00'),
            content: [
                '3 Ashi waza'
            ]
        });
        expect(createClassroom.do(classroomToCreate)).rejects.toThrow();
    });
});