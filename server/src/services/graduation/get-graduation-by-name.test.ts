import {describe, it, expect} from 'vitest';
import { Graduation } from '../../entities/graduation';
import { InMemoryGraduationRepository } from '../../repositories/in-memory/in-memory-graduation-repository';
import { GetGraduationByName } from './get-graduation-by-name';

describe('Get graduation by name tests', ()=> {
    it('Should be able to find an graduation by its name', async ()=> {
        const graduationRepository = new InMemoryGraduationRepository()
        const getGraduationByName = new GetGraduationByName(graduationRepository)

        const createdGraduation = new Graduation({
            name: 'white',
            value:0
        })
        expect(graduationRepository.graduations).toHaveLength(0)
        graduationRepository.graduations = [createdGraduation]
        expect(getGraduationByName.do({name:'white'})).resolves.not.toBeNull()
        expect(getGraduationByName.do({name:'white2'})).resolves.toBeNull()
    })
})