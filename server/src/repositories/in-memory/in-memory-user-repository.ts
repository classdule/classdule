import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class InMemoryUserRepository implements UserRepositoryBase {
    users: User[] = []
    async create (user: User){
        this.users.push(user);
        return user;
    }
    async delete (userId: string){
        const deleteUser = this.users.find(user => user.id === userId) || null
        this.users = this.users.filter(user => user.id !== userId)
        return deleteUser
        
    }

    async changeUserName (userId: string, username: string) {
        const userIndex = this.users.findIndex(user => user.id === userId)
        this.users[userIndex].name = username;
        return this.users[userIndex]
    }

    async findByEmail (email: string){
        const user = this.users.find(user => user.email === email);
        if(!!user){
            return user;
        }
        return null;
    }
    async queryByName(name:string) {
        return this.users.filter(user => name.includes(user.name));
    }
    async findAll(){
        return this.users;
    }
    async findById(userId: string){
        return this.users.find(user => user.id === userId) ?? null;
    }

}