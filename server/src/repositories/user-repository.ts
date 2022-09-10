import { User } from "../entities/user";

export interface UserRepositoryBase {
    create: (user: User) => Promise<void>;
    delete: (userId: string) => Promise<void>;
    findUsersByName: (username: string) => Promise<User[]>;
}