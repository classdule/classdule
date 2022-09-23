import {describe, it, expect} from 'vitest';
import { Graduation } from '../../entities/graduation';
import { InMemoryGraduationRepository } from '../../repositories/in-memory/in-memory-graduation-repository';
import { GetAllGraduations } from './get-all-graduations';

describe('Get graduation by name tests', ()=> {
    it('Should be able to find an graduation by its name', async ()=> {
        const graduationRepository = new InMemoryGraduationRepository()
        const getAllGraduations = new GetAllGraduations(graduationRepository)

        const createdGraduation = new Graduation({
            name: 'white',
            value:0
        })
        graduationRepository.graduations = [createdGraduation]

        expect(getAllGraduations.do()).resolves.toHaveLength(1)
        
    })
})