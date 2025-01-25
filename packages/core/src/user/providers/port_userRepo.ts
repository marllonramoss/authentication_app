import { UserDTO } from "../dtos/UserDTO";
import { User } from "../model/User";

export interface port_userRepo {
    save(user: User): Promise<void>
    findByEmail(email: string): Promise<User>
}