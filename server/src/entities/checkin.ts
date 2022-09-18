import { Entity } from "./entity";

type Props = {
    userId: string;
    classroomId: string;
    createdAt?: Date;
    verified?: boolean;
}

export class Checkin extends Entity<Props> {
    constructor({
        userId, 
        createdAt= new Date(), 
        verified=false,
        classroomId
    }:Props, id?:string){
        super({userId, createdAt, verified, classroomId}, id);
    }

    get userId(){
        return this.props.userId;
    }
    get createdAt(){
        return this.props.createdAt;
    }
    get verified(){
        return this.props.verified as boolean
    }
    get classroomId(){
        return this.props.classroomId
    }

    set verified(verified: boolean){
        this.props.verified = verified
    }

}