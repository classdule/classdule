import {Day, isSameDay, getHours} from 'date-fns';

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
        if(props.weekdays.some(val => val>6 || val<0)){
            throw new Error('Invalid weekday')
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