import { GraduationRepository } from "../../repositories/graduation-repository";

export class GetAllGraduations {
    constructor(
        public graduationsRepository: GraduationRepository
    ){}

    async do(){
        const queryResult = await this.graduationsRepository.findAll()
        return queryResult
    }
}