import { describe, it, expect } from "vitest";

import { v4 as uuid } from "uuid";

import { Checkin } from "../../entities/checkin";
import { InMemoryCheckinRepository } from "../../../../test/repositories/in-memory-checkin-repository";
import { VerifyCheckin } from "./verify-checkin";
import { InMemoryClassroomRepository } from "../../../../test/repositories/in-memory-classroom-repository";
import { Classroom } from "../../entities/classroom";

describe("Verify check-in tests", () => {
  const checkinRepository = new InMemoryCheckinRepository();
  const classroomRepository = new InMemoryClassroomRepository();

  const createdClassroom = new Classroom({
    groupId: "aaaa",
    educatorId: "aaaa",
    startsAt: new Date("1970-01-01 12:30"),
    endsAt: new Date("1970-01-01 14:30"),
    type: "basic",
    weekdays: [4, 5],
    content: "Introduction",
  });

  classroomRepository.classrooms = [createdClassroom];

  const createdCheckin = new Checkin({
    classroomId: createdClassroom.id,
    userId: uuid(),
  });

  checkinRepository.checkins = [createdCheckin];

  it("Should be able to verify an check-in", async () => {
    const verifyCheckin = new VerifyCheckin(
      checkinRepository,
      classroomRepository
    );

    await verifyCheckin.do({
      checkinId: createdCheckin.id,
      verify: true,
      actorId: "aaaa",
    });

    const modifiedCheckin = checkinRepository.checkins.find(
      (checkin) => checkin.id === createdCheckin.id
    );
    expect(modifiedCheckin?.verified).toBeTruthy();
  });
  it("Should not be able to verify an check-in since actor does not have authorization to do so", async () => {
    const verifyCheckin = new VerifyCheckin(
      checkinRepository,
      classroomRepository
    );

    expect(
      verifyCheckin.do({
        checkinId: createdCheckin.id,
        verify: true,
        actorId: "bbbb",
      })
    ).rejects.toThrow();
  });
});
