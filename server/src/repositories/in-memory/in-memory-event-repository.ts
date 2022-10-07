import { Event, EventProps } from "../../entities/event";
import { EventRepository } from "../event-repository";

export class InMemoryEventRepository implements EventRepository {
  public events: Event[] = [];
  async findById(id: string){
    const index = this.events.findIndex(event => event.id === id);
    return index;
  }

  async findAll(){
    return this.events;
  }
  async create(event:Event) {
    this.events.push(event);
    return event;
  }
  async delete(id: string) {
    const targetEvent = this.events.find(evt => evt.id === id);
    this.events = this.events.filter(evt => evt.id !== id);
    return targetEvent?? null;
  }
  async changeName (id: string, name: string) {
    const targetIndex = this.events.findIndex(event => event.id === id);
    this.events[targetIndex]
    return this.events[targetIndex] ?? null;
  }
  async changeDescription (id: string, description: string){
    const index = await this.findById(id);
    this.events[index].description = description;
    return this.events[index];
  }
  async changeLocation (id: string, location: string) {
    const index = await this.findById(id);
    this.events[index].location = location
    return this.events[index];
  }
  async changeEndsAt(id: string, endsAt: Date){
    const index = await this.findById(id);
    this.events[index].endsAt = endsAt;
    return this.events[index];
  }
  async changeStartsAt(id: string, startsAt: Date){
    const index = await this.findById(id);
    this.events[index].startsAt = startsAt;
    return this.events[index];
  }

}