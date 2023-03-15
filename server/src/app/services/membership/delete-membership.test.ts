import { describe, it, beforeEach, expect } from "vitest";
import { Group } from "../../entities/group";
import { Membership, MembershipRole } from "../../entities/membership";
import { InMemoryGroupRepository } from "../../../../test/repositories/in-memory-group-repository";
import { InMemoryMembershipRepository } from "../../../../test/repositories/in-memory-membership.repository";
import { DeleteMembership } from "./delete-membership";

describe("Delete membership tests", () => {
  let membershipRepository: InMemoryMembershipRepository;
  let groupRepository: InMemoryGroupRepository;

  beforeEach(async () => {
    membershipRepository = new InMemoryMembershipRepository();
    groupRepository = new InMemoryGroupRepository();

    groupRepository.groups = [
      new Group(
        {
          location: "Somewhere",
          name: "Some group",
          responsibleEducatorId: "aaaa",
        },
        "gggg"
      ),
    ];

    membershipRepository.memberships = [
      new Membership(
        {
          groupId: "gggg",
          userId: "abab",
        },
        "iiii"
      ),
      new Membership(
        {
          groupId: "gggg",
          userId: "ghgh",
          role: MembershipRole.EDUCATOR,
        },
        "bbbb"
      ),
      new Membership(
        {
          groupId: "gggg",
          userId: "alal",
        },
        "cccc"
      ),
    ];
  });

  it("Should be able to delete a membership", async () => {
    const deleteMembership = new DeleteMembership(
      membershipRepository,
      groupRepository
    );

    await expect(
      deleteMembership.do({
        membershipId: "iiii",
        actorId: "aaaa",
      })
    ).resolves.not.toThrow();

    expect(membershipRepository.memberships.length).toBe(2);
  });
  it("Should fail to delete a membership since actor does not have permission to do so", async () => {
    const deleteMembership = new DeleteMembership(
      membershipRepository,
      groupRepository
    );

    await expect(
      deleteMembership.do({
        membershipId: "iiii",
        actorId: "alal",
      })
    ).rejects.toThrow();
  });
});
