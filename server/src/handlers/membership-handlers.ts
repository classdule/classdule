import { Request, Response } from "express";
import { z } from "zod";
import { PrismaMembershipRepository } from "../repositories/prisma/prisma-membership-repository";
import { CreateMembership } from "../services/membership/create-membership";

const createMembershipSchema = z.object({
  body: z.object({
    user: z.object({ id: z.string().uuid() }),
    groupId: z.string().uuid(),
  }),
});

export async function handleCreateMembership(req: Request, res: Response) {
  const membershipRepository = new PrismaMembershipRepository();
  const createMembership = new CreateMembership(membershipRepository);
}
