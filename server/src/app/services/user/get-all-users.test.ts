import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { getRandomUser } from "../../../../test/utils/get-random-user";
import { GetAllUsers } from "./get-all-users";

describe("Get users test", () => {
  const userRepository = new InMemoryUserRepository();
  userRepository.users = [getRandomUser()];
  const getUsers = new GetAllUsers(userRepository);
  it("Should get all users", async () => {
    expect(getUsers.do()).resolves.toHaveLength(1);
  });
});
