import { parseISO } from "date-fns";
import { describe, expect, it } from "vitest";
import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { GetAllUsers } from "./get-all-users";

describe('Get users test', ()=> {
  const userRepository = new InMemoryUserRepository();
  userRepository.users = [
    new User({
      birthDay: parseISO('2004-08-20'),
      currentGrade:0,
      currentGraduation: 'branca',
      name: 'John Doe',
      password: 'password'
    })
  ];
  const getUsers = new GetAllUsers(userRepository);
  it('Should get all users', async ()=> {
    expect(getUsers.do()).resolves.toHaveLength(1);
  });
});