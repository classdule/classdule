import { parseISO } from "date-fns";
import { describe, expect, it } from "vitest";
import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { getRandomUser } from "../../tests/utils/get-random-user";
import { GetAllUsers } from "./get-all-users";

describe('Get users test', ()=> {
  const userRepository = new InMemoryUserRepository();
  userRepository.users = [
    getRandomUser()
  ];
  const getUsers = new GetAllUsers(userRepository);
  it('Should get all users', async ()=> {
    expect(getUsers.do()).resolves.toHaveLength(1);
  });
});