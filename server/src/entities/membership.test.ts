import { describe, it, expect } from "vitest";
import { Membership, MembershipRole } from "./membership";

describe("Membership entity tests", () => {
  it("Should be able to instantiate a membership", () => {
    expect(
      new Membership({
        groupId: "aaaa",
        role: MembershipRole.MEMBER,
        userId: "bbbb",
      })
    ).toBeInstanceOf(Membership);
  });
});
