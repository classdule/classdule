import { describe, it, expect } from "vitest";
import { Group } from "./group";

describe("Group entity tests", () => {
  it("Should be able to instantiate a group", () => {
    expect(
      new Group({
        educatorsIds: [],
        location: "Everywhere",
        name: "Academy 1",
        responsibleEducatorId: "aaaa",
        membersIds: [],
      })
    ).toBeInstanceOf(Group);
  });
  it("Should accept id as an argument", () => {
    expect(
      new Group(
        {
          educatorsIds: [],
          location: "Everywhere",
          name: "Academy 1",
          responsibleEducatorId: "aaaa",
          membersIds: [],
        },
        "aaaa"
      ).id
    ).toBe("aaaa");
  });
});
