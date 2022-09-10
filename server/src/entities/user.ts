interface Props {
    id: string;
    name: string;
    birthDay:Date;
    currentGraduation: string;
    currentGrade: number;
    password:string;
}

export class User {
    props:Props;

    constructor(props:Props){
        this.props = props
    }

    get id(){
        return this.props.id
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