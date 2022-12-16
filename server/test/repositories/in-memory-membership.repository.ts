import { Membership, MembershipRole } from "../../src/entities/membership";
import { MembershipRepository } from "../../src/repositories/membership-repository";

export class InMemoryMembershipRepository implements MembershipRepository {
  memberships: Membership[] = [];
  async findAll() {
    return this.memberships;
  }
  async findByGroup(groupId: string) {
    return this.memberships.filter(
      (membership) => membership.groupId === groupId
    );
  }
  async findById(membershipId: string) {
    return (
      this.memberships.find((membership) => membership.id === membershipId) ||
      null
    );
  }
  async findByUser(userId: string) {
    return this.memberships.filter(
      (membership) => membership.userId === userId
    );
  }

  async create(membership: Membership) {
    this.memberships.push(membership);
  }
  async delete(membershipId: string) {
    this.memberships = this.memberships.filter(
      (membership) => membership.id !== membershipId
    );
  }

  async updateRole(membershipId: string, role: MembershipRole) {
    const targetIndex = this.memberships.findIndex(
      (membership) => membership.id === membershipId
    );
    this.memberships[targetIndex].role = role;
  }
}
