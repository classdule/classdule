import {Day, differenceInHours} from 'date-fns'

import { Entity } from "./entity";


interface Props {
    weekDay: Day;
    startsAt: Date;
    endsAt: Date;
}

export class ClassroomSchedule extends Entity<Props> {
    constructor(props:Props, id?: string){
        if(props.endsAt <= props.startsAt){
            throw new Error('Cannot create an schedule that ends before starts')
        }
        const classroomDuration = Math.abs(differenceInHours(props.startsAt, props.endsAt))
        if(classroomDuration>=18){
            throw new Error('Cannot create an classroom that last longer than 18 hours')
        }
        super(props, id);
    }

    get weekDays(){
        return this.props.weekDay
    }

    get startsAt(){
        return this.props.startsAt
    }

    get endsAt(){
        return this.props.endsAt
    }
}