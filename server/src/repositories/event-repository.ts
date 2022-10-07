import { Event } from "../entities/event";

export interface EventRepository {
  findAll: () => Promise<Event[]>;
  create: (event:Event) => Promise<Event | null>;
  delete: (id: string) => Promise<Event | null>;
  changeName: (id: string, name: string) => Promise<Event | null>;
  changeDescription: (id: string, description: string) => Promise<Event | null>;
  changeLocation: (id: string, description: string) => Promise<Event | null>;
  changeStartsAt: (id: string, startsAt: Date) => Promise<Event | null>;
  changeEndsAt: (id: string, endsAt: Date) => Promise<Event | null>;
}