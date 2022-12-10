import { describe, it, expect } from "vitest";
import { Membership } from "../../entities/membership";
import { InMemoryMembershipRepository } from "../../repositories/in-memory/in-memory-membership.repository";

import { CreateMembership } from "./create-membership";

describe("Create membership tests", () => {
  it("Should be able to create a membership", async () => {
    const membershipRepository = new InMemoryMembershipRepository();
    const createMembership = new CreateMembership(membershipRepository);

    const exampleMembership = new Membership({
      groupId: "aaaa",
      userId: "bbbb",
    });

    expect(
      createMembership.do({
        membership: exampleMembership,
      })
    ).resolves;
  });
});
