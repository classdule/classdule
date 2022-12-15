import { describe, it, expect, beforeEach } from "vitest";

import { parseISO } from "date-fns";

import { Checkin } from "../../entities/checkin";
import { Classroom } from "../../entities/classroom";
import { InMemoryCheckinRepository } from "../../../test/repositories/in-memory-checkin-repository";
import { InMemoryClassroomRepository } from "../../../test/repositories/in-memory-classroom-repository";
import { InMemoryGroupRepository } from "../../../test/repositories/in-memory-group-repository";
import { CreateCheckin } from "./create-checkin";

import { Group } from "../../entities/group";
import { InMemoryMembershipRepository } from "../../../test/repositories/in-memory-membership.repository";
import { Membership, MembershipRole } from "../../entities/membership";

describe("Create check-in tests", () => {
  let checkinRepository: InMemoryCheckinRepository;
  let classroomRepository: InMemoryClassroomRepository;
  let groupRepository: InMemoryGroupRepository;
  let membershipRepository: InMemoryMembershipRepository;
  let createCheckin: CreateCheckin;

  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository();
    classroomRepository = new InMemoryClassroomRepository();
    groupRepository = new InMemoryGroupRepository();
    membershipRepository = new InMemoryMembershipRepository();

    membershipRepository.memberships = [
      new Membership(
        {
          groupId: "aaaa",
          userId: "aaaa",
          role: MembershipRole.MEMBER,
        },
        "cccc"
      ),
      new Membership(
        {
          groupId: "aaaa",
          userId: "bbbb",
          role: MembershipRole.MEMBER,
        },
        "dddd"
      ),
    ];

    await groupRepository.create(
      new Group(
        {
          name: "Example group",
          location: "The campus",
          responsibleEducatorId: "aabb",
          membershipsIds: ["cccc", "dddd"],
        },
        "aaaa"
      )
    );
    createCheckin = new CreateCheckin(
      classroomRepository,
      checkinRepository,
      groupRepository,
      membershipRepository
    );
  });
  it("Should be able to create a check-in", async () => {
    const existingClassroom = await classroomRepository.create(
      new Classroom({
        groupId: "aaaa",
        educatorId: "aaaa",
        type: "basic",
        startsAt: parseISO("1970-01-01 20:30"),
        endsAt: parseISO("1970-01-01 22:00"),
        weekdays: [1, 4], // Monday and Thursday
        content: [],
      })
    );

    const exampleCheckin = new Checkin({
      classroomId: existingClassroom.id,
      userId: "aaaa",
      createdAt: parseISO("1970-01-01 20:30"),
    });

    expect(
      createCheckin.do({
        checkin: exampleCheckin,
      })
    ).resolves;
  });
  it("Should not be able to create a check-in since checkin cannot be created a day before the classroom", async () => {
    const existingClassroom = await classroomRepository.create(
      new Classroom({
        groupId: "aaaa",
        educatorId: "bbbb",
        type: "basic",
        startsAt: parseISO("1970-01-01 20:30"),
        endsAt: parseISO("1970-01-01 22:00"),
        weekdays: [2, 4], // Tuesday and Thursday
        content: [],
      })
    );

    const exampleCheckin = new Checkin({
      classroomId: existingClassroom.id,
      userId: "bbbb",
      createdAt: parseISO("2022-09-26 20:30"),
    });

    expect(
      createCheckin.do({
        checkin: exampleCheckin,
      })
    ).rejects.toThrow();
  });

  it("Should not be able to create two check-ins in the same classroom and the same day", async () => {
    const existingClassroom = await classroomRepository.create(
      new Classroom({
        groupId: "aaaa",
        educatorId: "bbbb",
        type: "basic",
        startsAt: parseISO("1970-01-02 20:30"),
        endsAt: parseISO("1970-01-02 22:00"),
        weekdays: [1, 3], // Monday and Wednesday
        content: [],
      })
    );

    const exampleCheckin1 = new Checkin({
      classroomId: existingClassroom.id,
      userId: "bbbb",
      createdAt: parseISO("2022-09-26 20:30"),
    });
    const exampleCheckin2 = new Checkin({
      classroomId: existingClassroom.id,
      userId: "bbbb",
      createdAt: parseISO("2022-09-26 20:30"),
    });
    const exampleCheckin3 = new Checkin({
      classroomId: existingClassroom.id,
      userId: "aaaa",
      createdAt: parseISO("2022-09-26 20:30"),
    });
    await createCheckin.do({
      checkin: exampleCheckin1,
    });

    expect(
      createCheckin.do({
        checkin: exampleCheckin3,
      })
    ).resolves;

    expect(
      createCheckin.do({
        checkin: exampleCheckin2,
      })
    ).rejects.toThrow();
  });
  it("Should fail to create a a check-in since user is not a group member", async () => {
    const existingClassroom = await classroomRepository.create(
      new Classroom({
        groupId: "aaaa",
        educatorId: "bbbb",
        type: "basic",
        startsAt: parseISO("1970-01-02 20:30"),
        endsAt: parseISO("1970-01-02 22:00"),
        weekdays: [1, 3], // Monday and Wednesday
        content: [],
      })
    );

    const invalidCheckin = new Checkin({
      classroomId: existingClassroom.id,
      userId: "abab",
      createdAt: parseISO("2022-09-26 20:30"),
    });
    expect(
      createCheckin.do({
        checkin: invalidCheckin,
      })
    ).rejects.toThrow();
  });
});
