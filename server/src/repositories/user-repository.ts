import { User } from "../entities/user";

export interface UserRepository {
  create: (user: User) => Promise<User | undefined>;
  delete: (userId: string) => Promise<User | null>;
  changeUserName: (userId: string, username: string) => Promise<User | null>;
  queryByName: (username: string) => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  findById: (userId: string) => Promise<User | null>;
  save: (user: User) => Promise<void>;
}
