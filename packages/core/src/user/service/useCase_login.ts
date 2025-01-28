import loginDTO from '../dtos/loginDTO';
import { port_userRepo } from '../providers/port_userRepo';
import { port_passwordHasher } from '../providers/port_passwordHasher';
import { port_tokenGenerator } from '../providers/port_tokenGenerator';

export class useCase_login {
    constructor(
        private readonly repo: port_userRepo,
        private readonly hasher: port_passwordHasher,
        private readonly tokenGenerator: port_tokenGenerator,
    ) {}

    async execute(data: loginDTO): Promise<object> {
        const existingEmail = await this.repo.findByEmail(data.email);

        if (!existingEmail) {
            throw new Error('EMAIL_NOT_FOUNDED');
        }

        const validPassword = await this.hasher.compare(
            data.password,
            existingEmail.password,
        );

        if (!validPassword) {
            throw new Error('INVALID_PASSWORD');
        }

        const token = this.tokenGenerator.generate(existingEmail.id);

        return {
            token: token,
        };
    }
}
