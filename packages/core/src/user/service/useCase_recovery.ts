import { port_userRepo } from '../providers/port_userRepo';
import { port_tokenGenerator } from '../providers/port_tokenGenerator';
import recoveryOutDTO from '../dtos/recoveryOutDTO';
import port_emailService from '../providers/port_emailService';
import recoveryInDTO from '../dtos/recoveryInDTO';

export class useCase_recovery {
    constructor(
        private readonly repo: port_userRepo,
        private readonly tokenGenerator: port_tokenGenerator,
        private readonly emailService: port_emailService,
    ) {}

    async execute(data: recoveryInDTO): Promise<recoveryOutDTO> {
        const existingEmail = await this.repo.findByEmail(data.email);

        if (!existingEmail) {
            throw new Error('Email not founded');
        }

        // Gera um token de recuperação de senha
        const recoveryToken = this.tokenGenerator.generate(existingEmail.id);

        // Envia o email com o link de recuperação de senha
        const recoveryLink = `http://localhost:3000/reset-password?token=${recoveryToken}`;

        try {
            await this.emailService.sendRecoveryEmail(data.email, recoveryLink);
        } catch (error) {
            throw error;
        }

        return {
            statusCode: 200,
            message: 'Recovery email sent successfully',
        };
    }
}
