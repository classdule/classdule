import { describe, it, expect } from "vitest";

import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { getRandomUser } from "../../../../test/utils/get-random-user";
import { CreateUser } from "../user/create-user";
import { Signin } from "./sign-in";
import { JwtMockProvider } from "../../../../test/providers/jwt-mock-provider";

describe("Sign-in tests", () => {
  const repository = new InMemoryUserRepository();
  it("Should successfully sign-in", async () => {
    const exampleUser = getRandomUser();
    const createUser = new CreateUser(repository);
    await createUser.do(exampleUser);
    const jwtProvider = new JwtMockProvider();
    const signIn = new Signin(repository, jwtProvider);
    const { user, validPassword } = await signIn.execute(
      exampleUser.email,
      exampleUser.password
    );
    expect(user).toBeInstanceOf(User);
    expect(validPassword).toBeTruthy();
  });
});
