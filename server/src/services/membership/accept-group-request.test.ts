import { describe, it, expect, beforeEach } from "vitest";
import { Group } from "../../entities/group";
import { Membership, MembershipRole } from "../../entities/membership";
import { GroupRepository } from "../../repositories/group-repository";
import { InMemoryGroupRepository } from "../../../test/repositories/in-memory-group-repository";
import { InMemoryMembershipRepository } from "../../../test/repositories/in-memory-membership.repository";
import { MembershipRepository } from "../../repositories/membership-repository";
import { AcceptGroupRequest } from "./accept-group-request";

describe("Accept join group request from user", () => {
  let groupRepository: GroupRepository;
  let membershipRepository: MembershipRepository;
  beforeEach(async () => {
    groupRepository = new InMemoryGroupRepository();
    membershipRepository = new InMemoryMembershipRepository();

    await groupRepository.create(
      new Group(
        {
          location: "everywhere",
          name: "A group",
          responsibleEducatorId: "dddd",
          membershipsIds: ["abab"],
        },
        "aaaa"
      )
    );

    await membershipRepository.create(
      new Membership(
        {
          groupId: "aaaa",
          userId: "bbbb",
        },
        "abab"
      )
    );
    await membershipRepository.create(
      new Membership(
        {
          groupId: "aaaa",
          userId: "dada",
        },
        "baba"
      )
    );

    await membershipRepository.updateRole("baba", MembershipRole.EDUCATOR);

    // User with id 'dada' has educator role
  });
  it("Should be able to accept user request", async () => {
    const acceptGroupRequest = new AcceptGroupRequest(
      membershipRepository,
      groupRepository,
      "dddd" // Same as responsible educator id shown above
    );
    expect(
      acceptGroupRequest.do({
        membershipId: "abab",
      })
    ).resolves;
  });
  it("Should fail to accept user request since actor is not allowed to do so", async () => {
    const acceptGroupRequest = new AcceptGroupRequest(
      membershipRepository,
      groupRepository,
      "bbbb"
    );
    expect(
      acceptGroupRequest.do({
        membershipId: "abab",
      })
    ).rejects.toThrow();
  });
});
