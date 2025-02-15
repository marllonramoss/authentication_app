import recoveryInDTO from '../dtos/recoveryInDTO';
import { registerOutDTO } from '../dtos/registerOutDTO';
import { User } from '../model/User';

export interface port_userRepo {
    save(user: User): Promise<object>;
    saveWithGoogle(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(data: { id: string }): Promise<User | null>;
    findByGoogleId(googleid: string): Promise<User | null>;
    change_password(id: string, newPassword: string): Promise<void>;
}
