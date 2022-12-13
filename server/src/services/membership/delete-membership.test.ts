import { describe, it, beforeEach, expect } from "vitest";
import { Group } from "../../entities/group";
import { Membership } from "../../entities/membership";
import { InMemoryGroupRepository } from "../../repositories/in-memory/in-memory-group-repository";
import { InMemoryMembershipRepository } from "../../repositories/in-memory/in-memory-membership.repository";
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
          membershipsIds: ["iiii", "bbbb", "cccc"],
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
        "oooo"
      ),
      new Membership(
        {
          groupId: "gggg",
          userId: "ghgh",
        },
        "pppp"
      ),
      new Membership(
        {
          groupId: "gggg",
          userId: "alal",
        },
        "qqqq"
      ),
    ];
  });

  it("Should be able to delete a membership", async () => {
    const deleteMembership = new DeleteMembership(
      membershipRepository,
      groupRepository,
      "aaaa"
    );

    await deleteMembership.do({
      membershipId: "oooo",
    });

    expect(membershipRepository.memberships.length).toBe(2);
  });
  it.todo(
    "Should fail to delete a membership since actor does not have permission to do so"
  );
});
