import {v4} from 'uuid'

import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class UserRepositoryInMemory implements UserRepositoryBase {
    users: User[] = []
    async create (user: User){
        this.users.push(user)
    }
    async delete (userId: string){
        this.users = this.users.filter(user => user.id !== userId)
    }
    async findUsersByName (username: string){
        const users = this.users.filter(user => user.name === username)
        return users
    }

}