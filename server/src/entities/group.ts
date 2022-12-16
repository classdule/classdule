import { Entity } from "./entity";

interface Props {
  name: string;
  location: string;
  responsibleEducatorId: string;
}

export class Group extends Entity<Props> {
  constructor(props: Props, id?: string) {
    super(props, id);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get location() {
    return this.props.location;
  }
  get responsibleEducatorId() {
    return this.props.responsibleEducatorId;
  }
}
