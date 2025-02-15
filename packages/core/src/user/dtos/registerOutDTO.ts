export interface registerOutDTO {
    statusCode: number;
    message: string;
    user?: {
        id: string;
        email: string;
        createdAt: Date;
    };
}
