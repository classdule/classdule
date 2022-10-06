import {subYears} from 'date-fns';

export function getPastDate(){
    return subYears(new Date(), 8);
}