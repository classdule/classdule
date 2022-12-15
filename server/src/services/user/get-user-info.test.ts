import { parseISO, subDays } from "date-fns";
import { describe, it, expect } from "vitest";
import { User } from "../../entities/user";
import { InMemoryCheckinRepository } from "../../../test/repositories/in-memory-checkin-repository";
import { InMemoryUserRepository } from "../../../test/repositories/in-memory-user-repository";
import { GetUserInfo } from "./get-user-info";
import { getRandomUser } from "../../../test/utils/get-random-user";

describe("Get user info tests", () => {
  const userRepository = new InMemoryUserRepository();
  const checkinsRepository = new InMemoryCheckinRepository();
  const getUserInfo = new GetUserInfo(userRepository, checkinsRepository);
  const existingUser = getRandomUser();
  userRepository.users = [existingUser];

  it("Should get all user's info", async () => {
    expect(
      getUserInfo.do({
        userId: existingUser.id,
      })
    ).resolves.toBeDefined();
  });
  it("Should not get a single user's info", () => {
    expect(
      getUserInfo.do({
        userId: "aaaa",
      })
    ).resolves.toBeNull();
  });
});
