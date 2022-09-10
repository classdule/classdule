import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class InMemoryUserRepository implements UserRepositoryBase {
    users: User[] = []
    async create (user: User){
        this.users.push(user)
        return new User({
            birthDay: user.birthDay,
            currentGrade: user.currentGrade,
            currentGraduation: user.currentGraduation,
            id: user.id,
            name: user.name,
            password: user.password
        })
    }
    async delete (userId: string){
        const deleteUser = this.users.find(user => user.id === userId) || null
        this.users = this.users.filter(user => user.id === userId)
        return deleteUser
        
    }
    async findUsersByName (username: string){
        const users = this.users.filter(user => user.name === username)
        return users
    }

}