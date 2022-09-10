import { User } from "../entities/user";

export interface UserRepositoryBase {
    create: (user: User) => Promise<User | null>;
    delete: (userId: string) => Promise<User | null>;
    changeUserName: (userId: string, username: string) => Promise<User |null>;
    findUserByName: (username: string) => Promise<User | null>;
}