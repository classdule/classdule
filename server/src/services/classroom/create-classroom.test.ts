import { describe, expect, it } from "vitest";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";

describe('Create classroom tests', ()=> {
    it('Should be able to create an classroom', ()=> {
        const classroomRepository = new InMemoryClassroomRepository()
        const createClassroom = new CreateClassroom(classroomRepository);

    })
})