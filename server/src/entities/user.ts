import { Entity } from "./entity";

interface Props {
    name: string;
    birthDay:Date;
    currentGraduation: string;
    currentGrade: number;
    password:string;
}

export class User extends Entity<Props> {
    constructor(props:Props, id?: string){
        super(props, id)
    }

    get id(){
        return this._id
    }

    get name(){
        return this.props.name
    }
    get birthDay(){
        return this.props.birthDay
    }
    get currentGraduation(){
        return this.props.currentGraduation
    }
    get currentGrade(){
        return this.props.currentGrade
    }
    get password(){
        return this.props.password
    }
}