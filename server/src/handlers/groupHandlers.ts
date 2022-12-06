import { Request, Response } from "express";

import { z } from "zod";
import { CreateGroup } from "../services/group/create-group";
import { PrismaGroupRepository } from "../repositories/prisma/prisma-group-repository";
import { GetAllGroups } from "../services/group/get-all-groups";

export async function handleGetGroups(req: Request, res: Response) {
  const groupsRepository = new PrismaGroupRepository();
  const getAllGroups = new GetAllGroups(groupsRepository);
  const queryResult = await getAllGroups.do();
  return res.json(queryResult);
}

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string(),
    responsibleEducatorId: z.string(),
    location: z.string(),
  }),
});
type createGroupRequestBody = z.TypeOf<typeof createGroupSchema>["body"];
export async function handleCreateGroup(
  req: Request<{}, {}, createGroupRequestBody>,
  res: Response
) {
  const { location, name, responsibleEducatorId } = req.body;

  const repository = new PrismaGroupRepository();
  const createGroup = new CreateGroup(repository);

  try {
    const queryResult = await createGroup.execute({
      location: location,
      name: name,
      responsibleEducatorId: responsibleEducatorId,
    });
    res.status(201).json(queryResult);
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.json({
      error: errMessage,
    });
  }
}
