import { User } from "../entities/user";

export interface UserRepositoryBase {
    create: (user: User) => Promise<User | undefined>;
    delete: (userId: string) => Promise<User | null>;
    changeUserName: (userId: string, username: string) => Promise<User |null>;
    findUserByName: (username: string) => Promise<User | null>;
    findAll: ()=> Promise<User[]>;
    findById: (userId: string) => Promise<User | null>;
}