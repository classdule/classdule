import { User } from "../../../../app/entities/user";

export class UserHttpMapper {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthday: user.birthDay,
    };
  }
}
