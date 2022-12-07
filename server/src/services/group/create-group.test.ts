import { describe, it, expect } from "vitest";

import { v4 as uuid } from "uuid";

import { Group } from "../../entities/group";
import { InMemoryGroupRepository } from "../../repositories/in-memory/in-memory-group-repository";
import { CreateGroup } from "./create-group";

describe("Create group tests", () => {
  it("Should be able to create an group", async () => {
    const repository = new InMemoryGroupRepository();
    const createGroup = new CreateGroup(repository);

    const exampleGroup = new Group({
      educatorsIds: [],
      location: "Nowhere",
      name: "Math group",
      responsibleEducatorId: uuid(),
    });
    await createGroup.execute({
      location: exampleGroup.location,
      name: exampleGroup.name,
      responsibleEducatorId: exampleGroup.responsibleEducatorId,
    });
    expect(repository.groups.length).toBeGreaterThan(0);
  });
});
