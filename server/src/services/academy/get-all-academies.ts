import { AcademyRepositoryBase } from "../../repositories/academy-repository";

export class GetAllAcademies {
    constructor(
        public academiesRepository: AcademyRepositoryBase
    ){}

    async do(){
        const queryResult = this.academiesRepository.findAll()
        return queryResult
    }
}