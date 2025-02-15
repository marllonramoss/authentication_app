export default interface loginOutDTO {
    statusCode?: number;
    message?: string;
    token: string;
    user: {
        id: string;
        email: string;
        createdAt: Date;
    };
}
