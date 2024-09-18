import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UserWithAdminDto } from "./dto/admin-user.dto";

@Injectable()
export class UsersService{
    constructor (
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

}