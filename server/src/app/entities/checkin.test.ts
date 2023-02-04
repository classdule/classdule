import { expect, it, describe } from "vitest";
import { v4 as uuid } from "uuid";
import { Checkin } from "./checkin";

describe("Check-in tests", () => {
  it("Should be able to instantiate a Check-in", () => {
    const exampleCheckin = new Checkin({
      classroomId: uuid(),
      userId: uuid(),
    });

    expect(exampleCheckin).toBeInstanceOf(Checkin);
    expect(exampleCheckin.verified).toBe(false);
  });
});
