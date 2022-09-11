import { Academy } from "../../entities/academy";
import { User } from "../../entities/user";
import { getRandomUser } from "../../tests/utils/get-random-user";
import { AcademyRepositoryBase, CreateAcademyArgs } from "../academy-repository";

export class InMemoryAcademyRepository implements AcademyRepositoryBase {
    academies: Academy[] = [];
    async create (academy: CreateAcademyArgs) {
        const createAcademy = new Academy({
            educators: [],
            id: `${Math.random()}`,
            location: academy.location,
            name: academy.name,
            responsibleEducator: getRandomUser()
        })
        this.academies.push(createAcademy)
        
        return createAcademy
    }
    async delete (academyId: string) {
        const deleteAcademy = this.academies.find(academy => academy.id === academyId) || null
        this.academies = this.academies.filter(academy => academy.id !== deleteAcademy?.id)
        return deleteAcademy
    }
    async findAcademyByName (academyName: string) {
        const foundAcademy = this.academies.find(academy => academy.name === academyName) || null
        return foundAcademy
    }
    async queryAcademiesByName (subName: string) {
        const matchingAcademies = this.academies.filter(academy => academy.name.includes(subName))
        return matchingAcademies
    }
}