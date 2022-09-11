import { Academy } from "../../entities/academy"
import { User } from "../../entities/user"
import { InMemoryAcademyRepository } from "../../repositories/in-memory/in-memory-academy-repository"
import { CreateAcademy } from "./create-academy"

describe('Create academy tests', ()=> {
    it('Should be able to create an academy', async () => {
        const repository = new InMemoryAcademyRepository()
        const createAcademy = new CreateAcademy(repository)

        const exampleAcademy = new Academy({
            educators: [],
            id: 'aaaa',
            location: 'Nowhere',
            name: 'Academy 1',
            responsibleEducator: new User({
                birthDay: new Date(),
                currentGrade: 0,
                currentGraduation: 'branca',
                id: 'aaaa',
                name: 'John Doe',
                password: 'password#123'
            })
        })
        await createAcademy.execute({
            location: exampleAcademy.location,
            name: exampleAcademy.name,
            responsibleEducatorId: exampleAcademy.responsibleEducator.id
        })
        expect(repository.academies.length).toBeGreaterThan(0)

    })
})