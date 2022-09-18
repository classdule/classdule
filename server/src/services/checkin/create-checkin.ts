import {isSameDay} from 'date-fns'

import { Checkin } from "../../entities/checkin";
import { CheckinRepository } from "../../repositories/checkin-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";

type Request = {
    checkin: Checkin;
}

export class CreateCheckin {
    constructor(
        private classroomRepository: ClassroomRepository,
        private checkinRepository: CheckinRepository
    ){}
    
    async do(request:Request){
        const targetClassroom = await this.classroomRepository.findById(request.checkin.classroomId) || null
        if(!targetClassroom){
            throw new Error(`Classroom not found with id ${request.checkin.classroomId}`)
        }
        if(!isSameDay(targetClassroom.startsAt, request.checkin.createdAt as Date)){
            throw new Error('Check-ins can just be assined in the same day as the classroom')
        }
        const createdCheckin = await this.checkinRepository.create(
            request.checkin
        )
        return createdCheckin
    }
}