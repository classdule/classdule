import { Membership, MembershipRole } from "../entities/membership";

export interface MembershipRepository {
  findAll: () => Promise<Membership[]>;
  findByGroup: (groupId: string) => Promise<Membership[]>;
  findById: (membershipId: string) => Promise<Membership | null>;
  findByUser: (userId: string) => Promise<Membership[]>;
  create: (membership: Membership) => Promise<Membership | null>;
  delete: (membershipId: string) => Promise<Membership | null>;
  updateRole: (
    membershipId: string,
    role: MembershipRole
  ) => Promise<Membership | null>;
}
