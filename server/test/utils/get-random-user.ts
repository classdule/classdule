import { User } from "../../src/entities/user";
import { getPastDate } from "./get-past-date";

export function getRandomUser(): User {
  return new User({
    birthDay: getPastDate(),
    name: "John Doe",
    password: "password",
    email: "email@email.com",
  });
}
