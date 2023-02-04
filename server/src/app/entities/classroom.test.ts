import { describe, it, expect } from "vitest";
import { v4 as uuid } from "uuid";

import { parseISO } from "date-fns";

import { Classroom } from "./classroom";

describe("Classroom tests", () => {
  it("Should be able to instantiate a classroom", async () => {
    const classroom = new Classroom({
      educatorId: uuid(),
      type: "Basic",
      startsAt: parseISO("1970-01-01 10:00"),
      endsAt: parseISO("1970-01-01 12:00"),
      weekdays: [1],
      groupId: uuid(),
      content: [],
    });
    expect(classroom).toBeInstanceOf(Classroom);
  });
});
