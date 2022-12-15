import { describe, it, expect } from "vitest";

import { DeleteUser } from "./delete-user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { getRandomUser } from "../../tests/utils/get-random-user";

describe("Delete user test", () => {
  const repository = new InMemoryUserRepository();
  const deleteUser = new DeleteUser(repository);
  it("Should successfully delete a user", async () => {
    const user = getRandomUser();

    await repository.create(user);
    await deleteUser.execute(user.id);
    expect(repository.users.length).toBe(0);
  });
});
