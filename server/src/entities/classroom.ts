import {Day, isSameDay} from 'date-fns'

import { Entity } from "./entity";

interface Props {
    type: string;
    educatorId: string;
    academyId: string;
    weekdays: Day[];
    startsAt: Date;
    endsAt: Date;
}

export class Classroom extends Entity<Props> {
    constructor(props:Props, id?:string){
        if(props.startsAt>= props.endsAt){
            throw new Error('Classroom should not end before start')
        }
        if(!isSameDay(props.startsAt, props.endsAt)){
            throw new Error('Classroom should start and end in the same day')
        }
        super(props, id);
    }

    get type(){
        return this.props.type
    }
    get educatorId(){
        return this.props.educatorId
    }
    get startsAt(){
        return this.props.startsAt
    }
    get endsAt(){
        return this.props.endsAt
    }
    get weekdays(){
        return this.props.weekdays
    }
    get academyId(){
        return this.props.academyId
    }

}