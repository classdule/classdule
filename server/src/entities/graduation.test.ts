import { describe, it, expect } from "vitest";
import { Graduation } from "./graduation";

describe('Graduation entity tests', ()=> {
    it('Should be able to instantiate a graduation', ()=> {
        expect(new Graduation({
            name: 'white',
            value:0
        })).toBeInstanceOf(Graduation)
    })

    it('Should not be able to instantiate a graduation since value is invalid', ()=> {
        expect(() => new Graduation({
            name: 'white',
            value: -2
        })).toThrow()
    })
})