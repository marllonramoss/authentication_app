import { port_userRepo } from '../providers/port_userRepo';
import { port_passwordHasher } from '../providers/port_passwordHasher';
import { port_tokenGenerator } from '../providers/port_tokenGenerator';
import loginOutDTO from '../dtos/loginOutDTO';
import loginInDTO from '../dtos/loginInDTO';

export class useCase_login {
    constructor(
        private readonly repo: port_userRepo,
        private readonly hasher: port_passwordHasher,
        private readonly tokenGenerator: port_tokenGenerator,
    ) {}

    async execute(data: loginInDTO): Promise<loginOutDTO> {
        const existingEmail = await this.repo.findByEmail(data.email);

        if (!existingEmail) {
            throw new Error('Email not founded');
        }

        const validPassword = await this.hasher.compare(
            data.password,
            existingEmail.password,
        );

        if (!validPassword) {
            throw new Error('Invalid password');
        }

        const token = this.tokenGenerator.generate(
            existingEmail.id,
            existingEmail.email,
            existingEmail.createdAt,
        );

        return {
            statusCode: 200,
            message: 'Login successful',
            token: token,
            user: {
                id: existingEmail.id,
                email: existingEmail.email,
                createdAt: existingEmail.createdAt,
            },
        };
    }
}
