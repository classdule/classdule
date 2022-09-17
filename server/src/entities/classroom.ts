import { ClassroomSchedule } from "./classroom-schedule";
import { Entity } from "./entity";

interface Props {
    type: string;
    educatorId: string;
    schedules: ClassroomSchedule[];
    academyId: string;
}

export class Classroom extends Entity<Props> {
    constructor(props:Props, id?:string){
        super(props, id);
    }

    get type(){
        return this.props.type
    }
    get educatorId(){
        return this.props.educatorId
    }
    get schedules(){
        return this.props.schedules
    }
    get academyId(){
        return this.props.academyId
    }

}