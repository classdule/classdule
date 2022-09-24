import {expect, describe, it} from 'vitest'
import {v4 as uuid} from 'uuid'
import {parseISO} from 'date-fns'
import { Classroom } from '../../entities/classroom'
import { InMemoryClassroomRepository } from '../../repositories/in-memory/in-memory-classroom-repository'
import { GetClassroomsByAcademy } from './get-classrooms-by-academy'

describe('Get classrooms by academy tests', ()=> {
    it('Should be able to get all classrooms given an academy id', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository()
        const getClassroomsByAcademy = new GetClassroomsByAcademy(classroomRepository)

        const classroom1 = new Classroom({
            academyId: 'aaaa',
            educatorId:uuid(),
            startsAt: parseISO('1970-01-01 20:30'),
            endsAt: parseISO('1970-01-01 22:00'),
            type: 'basic',
            weekdays: [1, 4]
        })
        const classroom2 = new Classroom({
            academyId: 'aaaa',
            educatorId:uuid(),
            startsAt: parseISO('1970-01-01 20:30'),
            endsAt: parseISO('1970-01-01 22:00'),
            type: 'basic',
            weekdays: [1, 4]
        })
        const classroom3 = new Classroom({
            academyId: 'bbbb',
            educatorId:uuid(),
            startsAt: parseISO('1970-01-01 20:30'),
            endsAt: parseISO('1970-01-01 22:00'),
            type: 'basic',
            weekdays: [1, 4]
        })
        classroomRepository.classrooms = [classroom1, classroom2, classroom3]
        expect(classroomRepository.classrooms.length).toBe(3)

        expect(getClassroomsByAcademy.do({academyId: 'aaaa'})).resolves.toHaveLength(2)
        expect(getClassroomsByAcademy.do({academyId: 'bbbb'})).resolves.toHaveLength(1)
    })
})