import { Entity } from "./entity";

export interface EventProps {
  startsAt: Date;
  endsAt: Date;
  name: string;
  description: string;
  location: string;
}

export class Event extends Entity<EventProps> {
  constructor(props: EventProps, id?: string){
    if(props.startsAt >= props.endsAt){
      throw new Error('A event should not end before start');
    }
    super(props, id);
  }

  get startsAt() {
    return this.props.startsAt;
  }
  get endsAt(){
    return this.props.endsAt;
  }
  get name() {
    return this.props.name;
  }
  get description(){
    return this.props.description;
  }
  get location(){
    return this.props.location;
  }
  set description(description: string){
    this.description = description;
  }
  set name(name: string){
    this.name = name;
  }
  set location(location: string){
    this.location = location;
  }
  set endsAt(endsAt: Date){
    this.endsAt = endsAt;
  }
  set startsAt(startsAt: Date){
    this.startsAt = startsAt;
  }
  get allProps(){
    return this.props;
  }
}