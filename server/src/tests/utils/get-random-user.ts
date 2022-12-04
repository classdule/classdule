import { subDays } from "date-fns";
import {v4 as uuid} from 'uuid';
import { User } from "../../entities/user";
import { getPastDate } from "./get-past-date";

export function getRandomUser(): User{
    return new User({
        birthDay: getPastDate(),
        name: 'John Doe',
        academyIds: [uuid(), uuid()],
        password: 'password',
        email: 'email@email.com',
    });
}