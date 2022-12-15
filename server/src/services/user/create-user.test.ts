import { describe, it, expect } from "vitest";

import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { getRandomUser } from "../../tests/utils/get-random-user";
import { CreateUser } from "./create-user";

describe("Create user tests", () => {
  const usersRepository = new InMemoryUserRepository();
  const createUser = new CreateUser(usersRepository);
  it("Should be able to create a user", async () => {
    const user = getRandomUser();
    await expect(createUser.execute(user)).resolves.not.toThrow();

    expect(usersRepository.users).toHaveLength(1);
  });

  it("Should not be able to create another user since email is already taken", async () => {
    const user1 = getRandomUser();
    await expect(createUser.execute(user1)).rejects.toThrow();
  });
});
