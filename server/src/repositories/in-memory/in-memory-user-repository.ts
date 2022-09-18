import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class InMemoryUserRepository implements UserRepositoryBase {
    users: User[] = []
    async create (user: User){
        const createUser = new User({
            birthDay: user.birthDay,
            currentGrade: user.currentGrade,
            currentGraduation: user.currentGraduation,
            name: user.name,
            password: user.password
        })
        this.users.push(createUser)
        return new User({
            birthDay: user.birthDay,
            currentGrade: user.currentGrade,
            currentGraduation: user.currentGraduation,
            name: user.name,
            password: user.password
        }, createUser.id)
    }
    async delete (userId: string){
        const deleteUser = this.users.find(user => user.id === userId) || null
        this.users = this.users.filter(user => user.id !== userId)
        return deleteUser
        
    }

    async changeUserName (userId: string, username: string) {
        const userIndex = this.users.findIndex(user => user.id === userId)
        const targetUser = this.users[userIndex]
        this.users[userIndex] = new User({
            name: username,
            birthDay: targetUser.birthDay,
            currentGrade: targetUser.currentGrade,
            currentGraduation: targetUser.currentGraduation,
            password: targetUser.password
        }, targetUser.id)
        return this.users[userIndex]
    }

    async findUserByName (username: string){
        const user = this.users.find(user => user.name === username)
        if(!!user){
            return user
        }
        return null
    }
    async findAll(){
        return this.users
    }

}