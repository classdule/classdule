import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
    classroomId: string;
}

export class DeleteClassroom {
    constructor(
        public classroomsRepository: ClassroomRepository
    ){}
    async do({classroomId}: Request){
        const queryResult = await this.classroomsRepository.delete(classroomId)
        return queryResult
    }
}