import { registerOutDTO } from '../dtos/registerOutDTO';
import { User } from '../model/User';
import { port_passwordHasher } from '../providers/port_passwordHasher';
import { port_userRepo } from '../providers/port_userRepo';

export class useCase_changePassword {
    constructor(
        private readonly repo: port_userRepo,
        private readonly hasher: port_passwordHasher,
    ) {}

    async execute(data: { id: string; newPassword: string }): Promise<void> {
        console.log('JOINNED ON USECASE CHANGE PASSOWRD');
        console.log(data.id);
        console.log(data.newPassword);

        console.log('ANTES DO FINDBYID');

        const _id = data.id;

        const _data = {
            id: _id,
        };

        const existingUser = await this.repo.findById(_data);

        console.log('DEPOIS DO FINDBYID');

        if (!existingUser) {
            throw new Error(`User not founded with id: ${data.id}`);
        }

        const hashedPassword = await this.hasher.hash(data.newPassword);

        const validadeHashedPassword = await this.hasher.compare(
            data.newPassword,
            hashedPassword,
        );

        if (!validadeHashedPassword) {
            throw new Error('Password hashed not is equal to newPassowrd ');
        }

        await this.repo.change_password(data.id, hashedPassword);
    }
}
