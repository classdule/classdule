import { Academy } from "../../entities/academy";
import { AcademyRepositoryBase } from "../academy-repository";

export class InMemoryAcademyRepository implements AcademyRepositoryBase {
    academies: Academy[] = [];
    async create (academy: Academy) {
        this.academies.push(academy)
        return academy
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