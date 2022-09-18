import { Graduation } from "../../entities/graduation";
import { GraduationRepository } from "../graduation-repository";

export class InMemoryGraduationRepository implements GraduationRepository {
    graduations: Graduation[] = []
    async create(graduation: Graduation) {
        this.graduations.push(graduation)
        return graduation
    }
    async delete(graduationId: string) {
        const targetGraduation = this.graduations.find(graduation => graduation.id === graduationId)
        this.graduations = this.graduations.filter(graduation => graduation.id !== graduationId)
        return targetGraduation || null
    }
    async findAll(){
        return this.graduations
    }
    async findByName(name: string) {
        const targetGraduation = this.graduations.find(graduation => graduation.name === name)
        return targetGraduation || null
    }

}