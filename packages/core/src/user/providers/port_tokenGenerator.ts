export interface port_tokenGenerator {
    generate(id: string, email?: string, createdAt?: Date): string;
}
