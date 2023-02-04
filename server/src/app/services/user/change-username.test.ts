import { describe, it, expect } from "vitest";

import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { getRandomUser } from "../../../../test/utils/get-random-user";
import { ChangeUserName } from "./change-username";

describe("Change username tests", () => {
  const usersRepository = new InMemoryUserRepository();
  const changeUsername = new ChangeUserName(usersRepository);
  it("Should be able to change username", async () => {
    const user = getRandomUser();
    await usersRepository.create(user);

    await changeUsername.execute(user.id, "John Doe2");

    expect(usersRepository.users[0].name).toBe("John Doe2");
  });
});
