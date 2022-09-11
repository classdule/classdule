import { User } from "./user";

interface Props {
    id: string;
    name: string;
    location: string;
    responsibleEducator: User;
    educators: User[];
}

export class Academy {
    private props: Props;

    constructor(props:Props){
        this.props = props
    }

    get id(){
        return this.props.id
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