import { UserDTO } from "../dtos/UserDTO";
import { User } from "../model/User";
import port_idGenerator from "../providers/port_idGenerator";
import { port_userRepo } from "../providers/port_userRepo";
import {port_passwordHasher} from '../providers/port_passwordHasher'

export class useCase_register {
    constructor(private readonly repo: port_userRepo  ,private readonly idGenerator: port_idGenerator, private readonly hasher: port_passwordHasher){}

    async execute(user: User): Promise<UserDTO> {

        if(!user.password) {
            throw new Error('Password is required!')
        }

        if(!user.email) {
            throw new Error('Email is required!')
        }

        const emailExisting = await this.repo.findByEmail(user.email)

        if(emailExisting) {
            throw new Error('User email has already been used')
        }

        const finalUser: User = {
            ...user,
            id: this.idGenerator.generate(),
            password: this.hasher.hash(user.password),
            createdAt: new Date()
        }

        await this.repo.save(finalUser)

        const userToReturn: UserDTO = {
            id: finalUser.id,
            email: finalUser.email,
            createdAt: finalUser.createdAt
            
        }

        return userToReturn

    }
}