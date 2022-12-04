import {describe, it, expect} from 'vitest';
import { Group } from './group';

describe('Academy entity tests', ()=> {
    it('Should be able to instantiate a group', ()=> {
        expect(new Group({
            educatorsIds: [],
            location: 'Everywhere',
            name: 'Academy 1',
            responsibleEducatorId: 'aaaa'
        })).toBeInstanceOf(Group)
    })
})