import { User } from "../../src/app/entities/user";
import { UserRepository } from "../../src/app/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];
  async create(user: User) {
    this.users.push(user);
  }
  async delete(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  async changeUserName(userId: string, username: string) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    this.users[userIndex].name = username;
    return this.users[userIndex];
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!!user) {
      return user;
    }
    return null;
  }
  async queryByName(name: string) {
    return this.users.filter((user) => name.includes(user.name));
  }
  async findAll() {
    return this.users;
  }
  async findById(userId: string) {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  async save(user: User) {
    const targetIndex = this.users.findIndex((item) => item.id === user.id);
    if (targetIndex < 0) {
      throw new Error(`User not found with id ${user.id}`);
    }
    this.users[targetIndex] = user;
  }
}
