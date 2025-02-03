import { registerOutDTO } from '../dtos/registerOutDTO';
import { User } from '../model/User';

export interface port_userRepo {
    save(user: User): Promise<object>;
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleid: string): Promise<User | null>;
}
