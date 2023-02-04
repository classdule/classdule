import { Entity } from "./entity";

export enum MembershipRole {
  PENDING = "PENDING",
  MEMBER = "MEMBER",
  EDUCATOR = "EDUCATOR",
}

interface MembershipProps {
  userId: string;
  groupId: string;
  role: MembershipRole;
}

interface MembershipConstructorParams {
  userId: string;
  groupId: string;
  role?: MembershipRole;
}

export class Membership extends Entity<MembershipProps> {
  constructor(props: MembershipConstructorParams, id?: string) {
    const initialRole = props.role || MembershipRole.PENDING;
    super({ ...props, role: initialRole }, id);
  }

  get role() {
    return this.props.role;
  }
  get groupId() {
    return this.props.groupId;
  }
  get userId() {
    return this.props.userId;
  }
  get id() {
    return this._id;
  }

  set role(_role: MembershipRole) {
    this.props.role = _role;
  }
}
