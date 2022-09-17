import { Classroom } from "../../entities/classroom";
import { ClassroomSchedule } from "../../entities/classroom-schedule";
import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
    educatorId: string;
    type: string;
    academyId: string;
    schedules: ClassroomSchedule[];
}

export class CreateClassroom {
    constructor(
        public classroomRepository: ClassroomRepository
    ){}

    async do(request: Request){
        await this.classroomRepository.create(new Classroom({
            educatorId: request.educatorId,
            academyId: request.academyId,
            schedules: request.schedules,
            type: request.type
        }))
    }
}