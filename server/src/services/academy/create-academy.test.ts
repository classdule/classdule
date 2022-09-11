import { Academy } from "../../entities/academy"
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
            responsibleEducator: 'John Doe'
        })
        await createAcademy.execute(exampleAcademy)
        expect(repository.academies.length).toBeGreaterThan(0)

    })
})