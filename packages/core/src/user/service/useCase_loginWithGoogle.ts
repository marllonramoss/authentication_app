import { port_tokenGenerator } from '../providers/port_tokenGenerator';
import { port_userRepo } from '../providers/port_userRepo';

interface LoginWithGoogleDTO {
    email: string;
    googleId: string;
}

export class useCase_loginWithGoogle {
    constructor(
        private readonly userRepo: port_userRepo,
        private readonly tokenGenerator: port_tokenGenerator,
    ) {}

    async execute(
        data: LoginWithGoogleDTO,
    ): Promise<{ token: string; user: any }> {
        // Verifica se o usuário já existe no banco
        let user = await this.userRepo.findByEmail(data.email);

        if (!user) {
            // Cria um novo usuário se não existir
            user = await this.userRepo.saveWithGoogle({
                email: data.email,
                googleId: data.googleId,
                createdAt: new Date(),
            });
        }

        // Gera o token JWT
        const token = this.tokenGenerator.generate(
            user.id,
            user.email,
            user.createdAt,
        );

        return { token, user }; // Retorna token e dados do usuário
    }
}
