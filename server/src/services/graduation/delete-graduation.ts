import { GraduationRepository } from "../../repositories/graduation-repository";

interface Request {
    graduationId: string;
}

export class DeleteGraduation {
    constructor(
        public graduationRepository: GraduationRepository
    ){}

    async do({graduationId}:Request){
        const queryResult = await this.graduationRepository.delete(graduationId)
        return queryResult
    }
}