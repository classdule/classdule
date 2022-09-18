import { describe, it, expect } from "vitest";
import { Graduation } from "../../entities/graduation";
import { InMemoryGraduationRepository } from "../../repositories/in-memory/in-memory-graduation-repository";
import { CreateGraduation } from "./create-graduation";

describe('Create graduation tests', ()=> {
    it('Should be able to create a graduation', async ()=> {
        const graduationRepository = new InMemoryGraduationRepository()
        const createGraduation = new CreateGraduation(graduationRepository)

        const exampleGraduation = new Graduation({
            name: 'white',
            value: 0
        })

        expect(createGraduation.do(exampleGraduation)).resolves.toBeInstanceOf(Graduation)
    })
})