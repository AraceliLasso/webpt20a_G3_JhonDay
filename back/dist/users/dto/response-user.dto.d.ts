export default class UserResponseDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    city?: string;
    address: string;
    constructor(partial: Partial<UserResponseDto>);
}
