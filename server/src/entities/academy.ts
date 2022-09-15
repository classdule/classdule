import { Entity } from "./entity";
import { User } from "./user";

interface Props {
    name: string;
    location: string;
    responsibleEducator: User;
    educators: User[];
}

export class Academy extends Entity<Props> {
    constructor(props:Props, id?: string){
        super(props, id);
    }

    get id(){
        return this._id
    }
    get name(){
        return this.props.name
    }
    get location(){
        return this.props.location
    }
    get responsibleEducator(){
        return this.props.responsibleEducator
    }
    get educators(){
        return this.props.educators
    }
}