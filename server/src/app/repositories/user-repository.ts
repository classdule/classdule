import { User } from "../entities/user";

export interface UserRepository {
  create: (user: User) => Promise<void>;
  delete: (userId: string) => Promise<void>;
  queryByName: (username: string) => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  findById: (userId: string) => Promise<User | null>;
  save: (user: User) => Promise<void>;
}
