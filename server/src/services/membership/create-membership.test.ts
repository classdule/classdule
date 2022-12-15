import { describe, it, expect } from "vitest";
import { MembershipRole } from "../../entities/membership";
import { InMemoryMembershipRepository } from "../../../test/repositories/in-memory-membership.repository";

import { CreateMembership } from "./create-membership";

describe("Create membership tests", () => {
  it("Should be able to create a membership", async () => {
    const membershipRepository = new InMemoryMembershipRepository();
    const createMembership = new CreateMembership(membershipRepository);

    expect(
      createMembership.do({
        groupId: "aaaa",
        userId: "bbbb",
      })
    ).resolves.not.toThrow();

    expect(membershipRepository.memberships[0].role).toBe(
      MembershipRole.PENDING
    );
  });
});
