import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../../../test/repositories/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";
import { InMemoryGroupRepository } from "../../../../test/repositories/in-memory-group-repository";
import { InMemoryMembershipRepository } from "../../../../test/repositories/in-memory-membership.repository";
import { Group } from "../../entities/group";
import { Membership } from "../../entities/membership";

describe("Create classroom tests", () => {
  const classroomRepository = new InMemoryClassroomRepository();
  const groupRepository = new InMemoryGroupRepository();
  const membershipRepository = new InMemoryMembershipRepository();

  membershipRepository.memberships = [
    new Membership(
      {
        groupId: "aaaa",
        userId: "bbbb",
      },
      "efef"
    ),
  ];

  groupRepository.groups = [
    new Group(
      {
        location: "Any location",
        name: "Any name",
        responsibleEducatorId: "aaaa",
      },
      "aaaa"
    ),
  ];
  it("Should be able to create an classroom", async () => {
    const createClassroom = new CreateClassroom(
      classroomRepository,
      groupRepository,
      membershipRepository
    );

    await expect(
      createClassroom.do({
        groupId: "aaaa",
        educatorId: "aaaa",
        weekdays: [2, 4],
        type: "basic",
        endsAt: parseISO("1970-01-01 21:00"),
        startsAt: parseISO("1970-01-01 19:00"),
        content: "Fração",
        actorId: "aaaa",
      })
    ).resolves.not.toThrow();

    expect(classroomRepository.classrooms).toHaveLength(1);
  });
  it("Should not be able to create a classroom since educator is not associated with group", async () => {
    const createClassroom = new CreateClassroom(
      classroomRepository,
      groupRepository,
      membershipRepository
    );

    const classroomToCreate = new Classroom({
      groupId: "aaaa",
      educatorId: "bbbb",
      weekdays: [2, 4],
      type: "basic",
      endsAt: parseISO("1970-01-01 21:00"),
      startsAt: parseISO("1970-01-01 19:00"),
      content: "Fração",
    });
    expect(
      createClassroom.do({
        actorId: "aaaa",
        groupId: "aaaa",
        educatorId: "bbbb",
        type: "basic",
        startsAt: parseISO("1970-01-01 19:00"),
        endsAt: parseISO("1970-01-01 21:00"),
        content: "Fração",
        weekdays: [2, 4],
      })
    ).rejects;
  });
  it("Should not be able to create a classroom since actor is not associated with group", async () => {
    const createClassroom = new CreateClassroom(
      classroomRepository,
      groupRepository,
      membershipRepository
    );

    expect(
      createClassroom.do({
        groupId: "aaaa",
        educatorId: "aaaa",
        weekdays: [2, 4],
        type: "basic",
        endsAt: parseISO("1970-01-01 21:00"),
        startsAt: parseISO("1970-01-01 19:00"),
        content: "Fração",
        actorId: "abab",
      })
    ).rejects.toThrow();
  });
});
