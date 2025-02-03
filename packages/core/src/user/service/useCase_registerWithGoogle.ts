import { UserGoogleDTO } from '../dtos/UserGoogleDTO';
import { User } from '../model/User';
import port_idGenerator from '../providers/port_idGenerator';
import { port_userRepo } from '../providers/port_userRepo';

export class useCase_registerWithGoogle {
    constructor(
        private readonly repo: port_userRepo,
        private readonly idGenerator: port_idGenerator,
    ) {}

    async execute(email: string, googleId: string): Promise<UserGoogleDTO> {
        if (!email || !googleId) {
            throw new Error('Email and GoogleId are required!');
        }

        const userExisting = await this.repo.findByGoogleId(googleId);

        if (userExisting) {
            throw new Error('User has already registered');
        }

        const emailExisting = await this.repo.findByEmail(email);

        if (emailExisting) {
            throw new Error('Email aready in use by another account');
        }

        const newUser: User = {
            id: this.idGenerator.generate(),
            email: email,
            googleId: googleId,
            createdAt: new Date(),
        };

        await this.repo.save(newUser);

        const userToReturn: UserGoogleDTO = {
            id: newUser.id,
            email: newUser.email,
            googleId: newUser.googleId,
            createdAt: newUser.createdAt,
        };

        return userToReturn;
    }
}
