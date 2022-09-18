import {Day} from 'date-fns'

import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../../repositories/classroom-repository";

// interface Request extends Classroom {
//     educatorId: string;
//     type: string;
//     academyId: string;
//     endsAt: Date;
//     startsAt: Date;
//     weekdays: Day[];
// }

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