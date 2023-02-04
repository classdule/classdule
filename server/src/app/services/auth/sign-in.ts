import { compare } from "bcrypt";

import { User } from "../../entities/user";
import { JwtProvider } from "../../providers/jwt-provider";
import { UserRepository } from "../../repositories/user-repository";

interface Response {
  validPassword: boolean;
  user: User;
  token: string;
}
export class Signin {

  constructor(private repository: UserRepository, private jwtProvider: JwtProvider) {
  }
  async execute(email: string, password: string): Promise<Response> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error(`User not found with email ${email}`);
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = await this.jwtProvider.sign({
      id: user.id
    });

    return {
      validPassword: isPasswordValid,
      user: user,
      token,
    };
  }
}
