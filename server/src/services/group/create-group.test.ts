import { describe, it, expect } from "vitest";

import { v4 as uuid } from "uuid";

import { InMemoryGroupRepository } from "../../repositories/in-memory/in-memory-group-repository";
import { CreateGroup } from "./create-group";

describe("Create group tests", () => {
  it("Should be able to create an group", async () => {
    const repository = new InMemoryGroupRepository();
    const createGroup = new CreateGroup(repository);

    await createGroup.execute({
      location: "Somewhere",
      name: "Math group",
      responsibleEducatorId: uuid(),
    });
    expect(repository.groups.length).toBeGreaterThan(0);
  });
});
