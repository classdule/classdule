import {describe, it, expect} from 'vitest';
import { v4 as uuid } from 'uuid';

import { addHours } from 'date-fns';

import { Classroom } from './classroom';

describe('Classroom tests', ()=> {
    it('Should be able to instantiate a classroom', async ()=> {
        const classroom = new Classroom({
            educatorId: uuid(),
            type: 'Basic',
            startsAt: new Date(),
            endsAt: addHours(new Date(), 2),
            weekdays: [1],
            academyId: uuid()
        })
        expect(classroom).toBeInstanceOf(Classroom)
    })

    it('Should not be able to instantiate a classroom since dates are invalid', async ()=> {
        expect(()=> new Classroom({
            educatorId: uuid(),
            type: 'basic',
            academyId: uuid(),
            endsAt: new Date(),
            startsAt: new Date(),
            weekdays: [1, 3]
        })).toThrow()
    })
})