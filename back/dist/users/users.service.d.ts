import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    login(loginUser: LoginUserDto): Promise<User>;
    getUsers(page: number, limit: number): Promise<UserWithAdminDto[]>;
    getUserById(id: string): Promise<User | undefined>;
    createUser(createUser: CreateUserDto): Promise<User>;
    findOneEmail(email: string): Promise<User>;
    updateUsers(id: string, userUpdate: updateUserDto): Promise<User>;
    removeUsers(id: string): Promise<string>;
}
