import { User } from "../entities/user";

export interface UserRepositoryBase {
    create: (user: User) => Promise<User | null>;
    delete: (userId: string) => Promise<User | null>;
    findUsersByName: (username: string) => Promise<User[]>;
}