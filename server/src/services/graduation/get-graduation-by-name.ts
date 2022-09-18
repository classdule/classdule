import { GraduationRepository } from "../../repositories/graduation-repository";

interface Request {
    name: string;
}

export class GetGraduationByName {
    constructor(
        public graduationsRepository: GraduationRepository
    ){}

    async do({name}: Request){
        const queryResult = await this.graduationsRepository.findByName(name)
        return queryResult
    }
}