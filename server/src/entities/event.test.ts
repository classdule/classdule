import { describe, expect, it } from "vitest";
import {addDays} from 'date-fns';

import { Event } from "./event";

describe('Event entity tests', ()=> {
  it('Should be able to instantiate a event', ()=> {
    expect(new Event({
      description: 'Some description',
      endsAt: addDays(new Date(), 1),
      startsAt: new Date(),
      location: 'Somewhere',
      name: 'A event'
    })).toBeInstanceOf(Event);
  });
  it('Should not be able to instantiate a event since date is invalid', ()=> {
    expect(() => new Event({
      description: 'Some description',
      endsAt: new Date(),
      startsAt: new Date(),
      location: 'Somewhere',
      name: 'A event'
    })).toThrow();
  });

});