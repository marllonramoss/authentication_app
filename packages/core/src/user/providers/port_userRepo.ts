import { UserDTO } from '../dtos/UserDTO';
import { User } from '../model/User';

export interface port_userRepo {
    save(user: User): Promise<UserDTO>;
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleid: string): Promise<User | null>;
}
