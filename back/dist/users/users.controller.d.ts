import { UsersService } from "./users.service";
import { UserWithAdminDto } from "./dto/admin-user.dto";
import UserResponseDto from "./dto/response-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signIn(credentials: LoginUserDto): Promise<User>;
    createUser(createUser: CreateUserDto, request: any): Promise<string>;
    getUsersPag(page?: number, limit?: number): Promise<UserWithAdminDto[]>;
    getUser(id: string): Promise<UserResponseDto>;
    updateUsers(id: string, updateUser: updateUserDto): Promise<User>;
    deleteUsers(id: string): Promise<{
        id: string;
    }>;
}
