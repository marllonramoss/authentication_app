import port_idGenerator from '../providers/port_idGenerator';
import { port_passwordHasher } from '../providers/port_passwordHasher';
import { registerOutDTO } from '../dtos/registerOutDTO';
import { registerInDTO } from '../dtos/registerInDTO';
import { port_userRepo } from '../providers/port_userRepo';
import { User } from '../model/User';

export class useCase_register {
    constructor(
        private readonly repo: port_userRepo,
        private readonly idGenerator: port_idGenerator,
        private readonly hasher: port_passwordHasher,
    ) {}

    async execute(data: registerInDTO): Promise<registerOutDTO> {
        if (!data.password) {
            throw new Error('Password is required');
        }

        if (!data.email) {
            throw new Error('Email is required');
        }

        const emailExisting = await this.repo.findByEmail(data.email);

        if (emailExisting) {
            throw new Error('Email has already been used');
        }

        const finaldata: User = {
            ...data,
            id: await this.idGenerator.generate(),
            password: this.hasher.hash(data.password),
            createdAt: new Date(),
        };

        await this.repo.save(finaldata);

        const dataToReturn: registerOutDTO = {
            statusCode: 201,
            message: 'Register successful',
            user: {
                id: finaldata.id,
                email: finaldata.email,
                createdAt: finaldata.createdAt,
            },
        };

        return dataToReturn;
    }
}
