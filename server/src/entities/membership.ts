import { Entity } from "./entity";

export enum MembershipRole {
  PENDING = "PENDING",
  MEMBER = "MEMBER",
  EDUCATOR = "EDUCATOR",
}

interface MemberShipProps {
  userId: string;
  groupId: string;
  role: MembershipRole;
}

export class Membership extends Entity<MemberShipProps> {
  constructor(props: MemberShipProps, id?: string) {
    super(props, id);
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
}
