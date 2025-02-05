export interface port_passwordHasher {
    hash(password: string): string;
    compare(password: string, hash: string): boolean;
}
