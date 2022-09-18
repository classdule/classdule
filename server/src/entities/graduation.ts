import { Entity } from "./entity";

interface Props {
    name: string;
    value: number;
}

export class Graduation extends Entity<Props> {
    constructor(props:Props, id?:string){
        if(props.value < 0){
            throw new Error('Graduation value is invalid')
        }
        super(props, id);
    }

    get name(){
        return this.props.name
    }
    get value(){
        return this.props.value
    }
}