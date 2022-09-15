import {describe, it, expect} from 'vitest';
import { v4 as uuid } from 'uuid';

import { Classroom } from './classroom';

describe('Classroom tests', ()=> {
    it('Should be able to instantiate a classroom', async ()=> {
        const classroom = new Classroom({
            educatorId: uuid(),
            type: 'Basic',
            schedules: [
                {
                    weekDays: [1, 3, 5],
                    startsAt: new Date(),
                    endsAt: new Date()
                }
            ]
        })
        expect(classroom).toBeInstanceOf(Classroom)
    })
})