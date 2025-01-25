export interface port_passwordHasher {
    hash(password: string): string
    compare(passowrd: string, hash: string): boolean
}