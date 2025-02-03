export default interface loginOutDTO {
    statusCode?: number;
    message?: string;
    token: string;
    user: {
        email: string;
        googleId?: string;
        createdAt: Date;
    };
}
