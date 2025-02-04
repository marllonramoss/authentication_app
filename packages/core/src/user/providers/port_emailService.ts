export default interface port_emailService {
    sendRecoveryEmail(email?: string, recoveryLink?: string): Promise<void>;
}
