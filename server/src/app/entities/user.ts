import { differenceInYears, isFuture } from "date-fns";
import { Replace } from "../../helpers/replace";

import { Entity } from "./entity";

interface Props {
  name: string;
  birthDay: Date;
  password: string;
  email: string;
  createdAt: Date;
}

export class User extends Entity<Props> {
  constructor(props: Replace<Props, { createdAt?: Date }>, id?: string) {
    if (isFuture(props.birthDay)) {
      throw new Error("Cannot create a user that is not birth yet");
    }
    const age = Math.abs(differenceInYears(new Date(), props.birthDay));
    if (age < 4) {
      throw new Error("Cannot create a user that is younger than 4 years");
    }
    super({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get birthDay() {
    return this.props.birthDay;
  }
  get password() {
    return this.props.password;
  }
  get email() {
    return this.props.email;
  }
  get age() {
    return Math.abs(differenceInYears(new Date(), this.props.birthDay));
  }
  get spreadProps() {
    return this.props;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
