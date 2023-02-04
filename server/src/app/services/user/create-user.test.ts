import { describe, it, expect } from "vitest";

import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { getRandomUser } from "../../../../test/utils/get-random-user";
import { CreateUser } from "./create-user";

describe("Create user tests", () => {
  const usersRepository = new InMemoryUserRepository();
  const createUser = new CreateUser(usersRepository);
  it("Should be able to create a user", async () => {
    const user = getRandomUser();
    await expect(createUser.do(user)).resolves.not.toThrow();

    expect(usersRepository.users).toHaveLength(1);
  });

  it("Should not be able to create another user since email is already taken", async () => {
    const user1 = getRandomUser();
    await expect(createUser.do(user1)).rejects.toThrow();
  });
});
