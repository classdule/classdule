import {describe, it, expect} from 'vitest';
import { Academy } from './academy';

describe('Academy entity tests', ()=> {
    it('Should be able to instantiate a academy', ()=> {
        expect(new Academy({
            educatorsIds: [],
            location: 'Everywhere',
            name: 'Academy 1',
            responsibleEducatorId: 'aaaa'
        })).toBeInstanceOf(Academy)
    })
})