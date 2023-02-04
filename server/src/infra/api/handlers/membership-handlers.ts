import { Request, Response } from "express";
import { z } from "zod";
import { MembershipHttpMapper } from "../mappers/http/membership-http-mapper";
import { PrismaGroupRepository } from "../../../app/repositories/prisma/prisma-group-repository";
import { PrismaMembershipRepository } from "../../../app/repositories/prisma/prisma-membership-repository";
import { AcceptGroupRequest } from "../../../app/services/membership/accept-group-request";
import { CreateMembership } from "../../../app/services/membership/create-membership";
import { DeleteMembership } from "../../../app/services/membership/delete-membership";

export const createMembershipSchema = z.object({
  body: z.object({
    user: z.object({ id: z.string().uuid() }),
    groupId: z.string().uuid(),
  }),
});

type createMembershipBody = z.TypeOf<typeof createMembershipSchema>["body"];
export async function handleCreateMembership(
  req: Request<{}, {}, createMembershipBody>,
  res: Response
) {
  const { groupId, user } = req.body;
  const membershipRepository = new PrismaMembershipRepository();
  const createMembership = new CreateMembership(membershipRepository);

  const { membership } = await createMembership.do({
    groupId,
    userId: user.id,
  });

  return res.status(201).json(MembershipHttpMapper.toHttp(membership));
}

export const acceptMembershipRequestSchema = z.object({
  body: z.object({
    membershipId: z.string().uuid(),
    user: z.object({
      id: z.string().uuid(),
    }),
  }),
});

type acceptMembershipRequestBody = z.TypeOf<
  typeof acceptMembershipRequestSchema
>["body"];
export async function handleAcceptMembershipRequest(
  req: Request<{}, {}, acceptMembershipRequestBody>,
  res: Response
) {
  const { membershipId, user } = req.body;

  const membershipRepository = new PrismaMembershipRepository();
  const groupRepository = new PrismaGroupRepository();
  const acceptMembershipRequest = new AcceptGroupRequest(
    membershipRepository,
    groupRepository,
  );

  try {
    const { membership } = await acceptMembershipRequest.do({
      membershipId,
      actorId: user.id
    });

    if (!membership) {
      return res.sendStatus(404);
    }

    return res.json(MembershipHttpMapper.toHttp(membership));
  } catch (err) {
    if (err instanceof Error) {
      res.status(403).json({
        error: err.message,
      });
    }
  }
}

export const denyMembershipRequestSchema = z.object({
  body: z.object({
    user: z.object({
      id: z.string().uuid(),
    }),
    membershipId: z.string().uuid(),
  }),
});
type denyMembershipRequestBody = z.TypeOf<
  typeof denyMembershipRequestSchema
>["body"];
export async function handleDenyMembershipRequest(
  req: Request<{}, {}, denyMembershipRequestBody>,
  res: Response
) {
  const { membershipId, user } = req.body;

  const membershipRepository = new PrismaMembershipRepository();
  const groupRepository = new PrismaGroupRepository();

  const deleteMembership = new DeleteMembership(
    membershipRepository,
    groupRepository,
  );

  try {
    await deleteMembership.do({
      membershipId: membershipId,
      actorId: user.id
    });

    return res.sendStatus(200);
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
