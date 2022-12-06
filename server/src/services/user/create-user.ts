import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { UserRepositoryBase } from "../../repositories/user-repository";

interface Request {
  name: string;
  birthDay: Date;
  password: string;
  email: string;
  groupIds?: string[];
}
export class CreateUser {
  repository: UserRepositoryBase;

  constructor(repository: UserRepositoryBase) {
    this.repository = repository;
  }

  async execute({ birthDay, email, name, password, groupIds = [] }: Request) {
    const alreadyTakenEmail =
      (await this.repository.findByEmail(email)) !== null;
    if (alreadyTakenEmail) {
      throw new Error("User email already in use");
    }
    const encryptedPassword = await hash(password, 10);
    const createUser = new User({
      birthDay,
      email,
      groupIds,
      name,
      password: encryptedPassword,
    });

    const createdUser = await this.repository.create(createUser);
    return createdUser;
  }
}
