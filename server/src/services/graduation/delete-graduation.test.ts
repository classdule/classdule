import {describe, it, expect} from 'vitest'
import { Graduation } from '../../entities/graduation';
import { InMemoryGraduationRepository } from '../../repositories/in-memory/in-memory-graduation-repository'
import { DeleteGraduation } from './delete-graduation';

describe('Delete graduation tests', ()=> {
    it('Should be able to delete a graduation', async () => {
        const graduationRepository = new InMemoryGraduationRepository();
        const deleteGraduation = new DeleteGraduation(graduationRepository)

        const createdGraduation = new Graduation({
            name: 'white',
            value:0
        })
        graduationRepository.graduations = [createdGraduation]
        expect(graduationRepository.graduations).toHaveLength(1)
        
        await deleteGraduation.do({
            graduationId: createdGraduation.id
        })
        expect(graduationRepository.graduations).toHaveLength(0)
    })
})