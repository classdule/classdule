import { describe, expect, it } from "vitest";

import { parseISO } from "date-fns";

import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { CreateClassroom } from "./create-classroom";
import { InMemoryGroupRepository } from "../../repositories/in-memory/in-memory-group-repository";
import { Group } from "../../entities/group";

describe("Create classroom tests", () => {
  const classroomRepository = new InMemoryClassroomRepository();
  const groupRepository = new InMemoryGroupRepository();
  groupRepository.groups = [
    new Group(
      {
        educatorsIds: ["aaaa", "cccc"],
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
      "aaaa"
    );

    const classroomToCreate = new Classroom({
      groupId: "aaaa",
      educatorId: "aaaa",
      weekdays: [2, 4],
      type: "basic",
      endsAt: parseISO("1970-01-01 21:00"),
      startsAt: parseISO("1970-01-01 19:00"),
      content: ["Fração"],
    });

    expect(await createClassroom.do(classroomToCreate)).toBeInstanceOf(
      Classroom
    );
    expect(classroomRepository.classrooms.length).toBeGreaterThan(0);
  });
  it("Should not be able to create a classroom since educator is not associated with group", async () => {
    const createClassroom = new CreateClassroom(
      classroomRepository,
      groupRepository,
      "aaaa"
    );

    const classroomToCreate = new Classroom({
      groupId: "aaaa",
      educatorId: "bbbb",
      weekdays: [2, 4],
      type: "basic",
      endsAt: parseISO("1970-01-01 21:00"),
      startsAt: parseISO("1970-01-01 19:00"),
      content: ["3 Koshi waza"],
    });
    expect(createClassroom.do(classroomToCreate)).rejects.toThrow();
  });
  it("Should not be able to create a classroom since actor is not associated with group", async () => {
    const createClassroom = new CreateClassroom(
      classroomRepository,
      groupRepository,
      "abab"
    );

    const classroomToCreate = new Classroom({
      groupId: "aaaa",
      educatorId: "aaaa",
      weekdays: [2, 4],
      type: "basic",
      endsAt: parseISO("1970-01-01 21:00"),
      startsAt: parseISO("1970-01-01 19:00"),
      content: ["Fração"],
    });
    expect(createClassroom.do(classroomToCreate)).rejects.toThrow();
  });
});
