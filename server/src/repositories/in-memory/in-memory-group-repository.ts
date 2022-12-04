import {v4 as uuid} from 'uuid'

import { Group } from "../../entities/group";
import { GroupRepository } from "../group-repository";

export class InMemoryGroupRepository implements GroupRepository {
    academies: Group[] = [];
    async create (academy: Group) {
        const createAcademy = new Group({
            educatorsIds: [],
            location: academy.location,
            name: academy.name,
            responsibleEducatorId: uuid()
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

    async findAll () {
        return this.academies
    }
    async findEducatorsIds(academyId: string){
        const targetAcademy = this.academies.find(academy => academyId === academy.id);
        if(!targetAcademy){
            return [];
        }
        return targetAcademy.educatorsIds;
    }
}