import { expect, describe, it } from "vitest";
import { v4 as uuid } from "uuid";
import { parseISO } from "date-fns";
import { Classroom } from "../../entities/classroom";
import { InMemoryClassroomRepository } from "../../../test/repositories/in-memory-classroom-repository";
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
      content: "Trigonometria",
    });
    const classroom2 = new Classroom({
      groupId: "aaaa",
      educatorId: uuid(),
      startsAt: parseISO("1970-01-01 20:30"),
      endsAt: parseISO("1970-01-01 22:00"),
      type: "basic",
      weekdays: [1, 4],
      content: "Trigonometria",
    });
    const classroom3 = new Classroom({
      groupId: "bbbb",
      educatorId: uuid(),
      startsAt: parseISO("1970-01-01 20:30"),
      endsAt: parseISO("1970-01-01 22:00"),
      type: "basic",
      weekdays: [1, 4],
      content: "Trigonometria",
    });
    classroomRepository.classrooms = [classroom1, classroom2, classroom3];
    expect(classroomRepository.classrooms.length).toBe(3);

    const { classrooms: c1 } = await getClassroomsByGroup.do({
      groupId: "aaaa",
    });

    expect(c1).toHaveLength(2);

    const { classrooms: c2 } = await getClassroomsByGroup.do({
      groupId: "bbbb",
    });
    expect(c2).toHaveLength(1);
  });
});
