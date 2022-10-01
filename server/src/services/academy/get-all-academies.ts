import { AcademyRepository } from "../../repositories/academy-repository";

export class GetAllAcademies {
    constructor(
        public academiesRepository: AcademyRepository
    ){}

    async do(){
        const queryResult = this.academiesRepository.findAll()
        return queryResult
    }
}