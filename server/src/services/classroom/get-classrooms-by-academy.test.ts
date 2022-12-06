import { expect, describe, it } from "vitest";
import { v4 as uuid } from "uuid";
import { parseISO } from "date-fns";
import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../repositories/in-memory/in-memory-classroom-repository";
import { GetClassroomsByGroup } from "./get-classrooms-by-group";

describe("Get classrooms by group tests", () => {
  it("Should be able to get all classrooms given an group id", async () => {
    const classroomRepository = new InMemoryClassroomRepository();
    const getClassroomsByGroup = new GetClassroomsByGroup(classroomRepository);

    const classroom1 = new Classroom({
      groupId: "aaaa",
      educatorId: uuid(),
      startsAt: parseISO("1970-01-01 20:30"),
      endsAt: parseISO("1970-01-01 22:00"),
      type: "basic",
      weekdays: [1, 4],
      content: ["3 Ashi waza"],
    });
    const classroom2 = new Classroom({
      groupId: "aaaa",
      educatorId: uuid(),
      startsAt: parseISO("1970-01-01 20:30"),
      endsAt: parseISO("1970-01-01 22:00"),
      type: "basic",
      weekdays: [1, 4],
      content: ["3 Ashi waza"],
    });
    const classroom3 = new Classroom({
      groupId: "bbbb",
      educatorId: uuid(),
      startsAt: parseISO("1970-01-01 20:30"),
      endsAt: parseISO("1970-01-01 22:00"),
      type: "basic",
      weekdays: [1, 4],
      content: ["3 Ashi waza"],
    });
    classroomRepository.classrooms = [classroom1, classroom2, classroom3];
    expect(classroomRepository.classrooms.length).toBe(3);

    expect(getClassroomsByGroup.do({ groupId: "aaaa" })).resolves.toHaveLength(
      2
    );
    expect(getClassroomsByGroup.do({ groupId: "bbbb" })).resolves.toHaveLength(
      1
    );
  });
});
