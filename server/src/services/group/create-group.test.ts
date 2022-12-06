import { describe, it, expect } from "vitest";

import { v4 as uuid } from "uuid";

import { Group } from "../../entities/group";
import { InMemoryGroupRepository } from "../../repositories/in-memory/in-memory-group-repository";
import { CreateAcademy } from "./create-group";

describe("Create academy tests", () => {
  it("Should be able to create an academy", async () => {
    const repository = new InMemoryGroupRepository();
    const createAcademy = new CreateAcademy(repository);

    const exampleAcademy = new Group({
      educatorsIds: [],
      location: "Nowhere",
      name: "Academy 1",
      responsibleEducatorId: uuid(),
    });
    await createAcademy.execute({
      location: exampleAcademy.location,
      name: exampleAcademy.name,
      responsibleEducatorId: exampleAcademy.responsibleEducatorId,
    });
    expect(repository.groups.length).toBeGreaterThan(0);
  });
});
