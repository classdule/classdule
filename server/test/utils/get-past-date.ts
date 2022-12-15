import lodash from 'lodash';
import {subYears} from 'date-fns';

export function getPastDate(){
    return subYears(new Date(), lodash.random(10, 60));
}