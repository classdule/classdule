import { Membership, MembershipRole } from "../entities/membership";

export interface MembershipRepository {
  findAll: () => Promise<Membership[]>;
  findByGroup: (groupId: string) => Promise<Membership[]>;
  findById: (membershipId: string) => Promise<Membership | null>;
  findByUser: (userId: string) => Promise<Membership[]>;
  create: (membership: Membership) => Promise<void>;
  delete: (membershipId: string) => Promise<void>;
  updateRole: (membershipId: string, role: MembershipRole) => Promise<void>;
}
