import {areIntervalsOverlapping, Day} from 'date-fns'
import {intersection} from 'lodash'

import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../classroom-repository";

export class InMemoryClassroomRepository implements ClassroomRepository {
    classrooms: Classroom[] = [];

    async create(classroom: Classroom) {
        this.classrooms.push(classroom)
        return classroom;
    }
    async delete(classroomId: string){
        const targetClassroom = this.classrooms.find(classroom => classroom.id === classroomId)
        this.classrooms = this.classrooms.filter(classroom => classroom.id !== classroomId)
        return targetClassroom ?? null
    }
    async findOverlappingDateClassroom(start: Date, end:Date, weekdays: Day[], academyId: string){
        const overlappingClassroom = this.classrooms.find(classroom => {
            return areIntervalsOverlapping(
                {
                    end: end,
                    start: start
                },
                {
                    end: classroom.endsAt,
                    start: classroom.startsAt
                }
                
            ) && intersection(weekdays, classroom.weekdays).length > 0 && academyId === classroom.academyId
        })
        return overlappingClassroom ?? null
    }
    async findById (classroomId: string){
        const foundClassroom = this.classrooms.find(classroom => classroom.id === classroomId)
        return foundClassroom ?? null
    }
}