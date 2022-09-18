import { describe, expect, it } from "vitest";
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
            schedules: [],
            type: 'basic'
        })

        expect(createClassroom.do(classroomToCreate)).resolves

    })
})