export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    city?: string;
    address?: string;
    constructor(partial: Partial<RegisterUserDto>);
}
