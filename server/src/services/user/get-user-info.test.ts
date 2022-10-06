import { parseISO, subDays } from "date-fns";
import { describe, it, expect } from "vitest";
import { User } from "../../entities/user";
import { InMemoryCheckinRepository } from "../../repositories/in-memory/in-memory-checkin-repository";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { GetUserInfo } from "./get-user-info";

describe('Get user info tests', ()=> {
  const userRepository = new InMemoryUserRepository();
  const checkinsRepository = new InMemoryCheckinRepository();
  const getUserInfo = new GetUserInfo(
    userRepository,
    checkinsRepository
  );
  const existingUser = new User({
    birthDay: parseISO('2004-08-20'),
    currentGrade:0,
    currentGraduation: 'branca',
    name: 'John Doe',
    password: 'password',
    email: 'email@email.com',
    graduationDate: subDays(new Date(), 20)
  });
  userRepository.users = [
    existingUser
  ];

  it("Should get all user's info", async ()=> {
    expect(getUserInfo.do({
      userId: existingUser.id
    })).resolves.toBeDefined();
  });
  it("Should not get a single user's info", ()=> {
    expect(getUserInfo.do({
      userId: 'aaaa'
    })).resolves.toBeNull();
  });
})