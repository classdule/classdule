import {describe, it, expect} from 'vitest'

import {v4 as uuid} from 'uuid'

import { Checkin } from '../../entities/checkin';
import { InMemoryCheckinRepository } from '../../repositories/in-memory/in-memory-checkin-repository'
import { VerifyCheckin } from './verify-checkin';

describe('Verify check-in tests', ()=> {
    it('Should be able to verify an check-in', async ()=> {
        const checkinRepository = new InMemoryCheckinRepository();
        const verifyCheckin = new VerifyCheckin(checkinRepository);

        const createdCheckin = new Checkin({
            classroomId: uuid(),
            userId: uuid()
        })

        checkinRepository.checkins = [createdCheckin]

        await verifyCheckin.do({
            checkinId: createdCheckin.id,
            verify: true
        })

        const modifiedCheckin = checkinRepository.checkins.find(checkin => checkin.id === createdCheckin.id)
        expect(modifiedCheckin?.verified).toBeTruthy()

    })
})