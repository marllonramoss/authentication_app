import { port_userRepo } from '../providers/port_userRepo';
import { port_tokenGenerator } from '../providers/port_tokenGenerator';
import recoveryOutDTO from '../dtos/recoveryOutDTO';
import port_emailService from '../providers/port_emailService';

export class useCase_recovery {
    constructor(
        private readonly repo: port_userRepo,
        private readonly tokenGenerator: port_tokenGenerator,
        private readonly emailService: port_emailService,
    ) {}

    async execute(data: { email: string }): Promise<recoveryOutDTO> {
        console.log('EMAIL JOINNED ON USECASE: ', data.email);

        const existingEmail = await this.repo.findByEmail(data.email);

        if (!existingEmail) {
            throw new Error('EMAIL_NOT_FOUNDED');
        }

        // Gera um token de recuperação de senha
        const recoveryToken = this.tokenGenerator.generate(existingEmail.id);

        // Envia o email com o link de recuperação de senha
        const recoveryLink = `http://localhost:3000/reset-password?token=${recoveryToken}`;

        await this.emailService.sendRecoveryEmail(data.email, recoveryLink);

        return {
            statusCode: 200,
            message: 'Recovery email sent successfully',
        };
    }
}
