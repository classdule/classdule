import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../../repositories/classroom-repository";

type Request = Classroom;

export class CreateClassroom {
    constructor(
        public classroomRepository: ClassroomRepository,
    ){}

    async do(request: Request){
        const createdClassroom = await this.classroomRepository.create(new Classroom({
            educatorId: request.educatorId,
            academyId: request.academyId,
            type: request.type,
            endsAt: request.endsAt,
            startsAt: request.startsAt,
            weekdays: request.weekdays
        }))
        return createdClassroom
    }
}