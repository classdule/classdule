import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";

interface Request {
  name: string;
  birthDay: Date;
  password: string;
  email: string;
}

interface Response {
  user: User;
}
export class CreateUser {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async do({ birthDay, email, name, password }: Request): Promise<Response> {
    const alreadyTakenEmail =
      (await this.repository.findByEmail(email)) !== null;
    if (alreadyTakenEmail) {
      throw new Error("User email already in use");
    }
    const encryptedPassword = await hash(password, 10);
    const createUser = new User({
      birthDay,
      email,
      name,
      password: encryptedPassword,
    });

    await this.repository.create(createUser);
    return {
      user: createUser,
    };
  }
}
