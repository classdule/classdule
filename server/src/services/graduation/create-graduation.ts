import { Graduation } from "../../entities/graduation";
import { GraduationRepository } from "../../repositories/graduation-repository";

export class CreateGraduation {
    constructor(
        public graduationRepository: GraduationRepository
    ){}

    async do(graduation: Graduation){
        const createdGraduation = await this.graduationRepository.create(graduation)
        return createdGraduation
    }
}