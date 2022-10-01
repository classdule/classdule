import { Classroom } from "../../entities/classroom";
import { AcademyRepository } from "../../repositories/academy-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";

type Request = Classroom;

export class CreateClassroom {
    constructor(
        public classroomRepository: ClassroomRepository,
        public academyRepository: AcademyRepository,
        public actorId: string,
    ){}

    async do(request: Request){
        const academyEducatorsIds = await this.academyRepository.findEducatorsIds(request.academyId);
        if(!academyEducatorsIds.includes(this.actorId)){
            throw new Error('Cannot create a classroom since you are not authorized to do so');
        }
        if(!academyEducatorsIds.includes(request.educatorId)) {
            throw new Error('Cannot create a classroom if educator does not exists');
        }
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