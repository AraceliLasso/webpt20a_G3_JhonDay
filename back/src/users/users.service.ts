import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService{
    constructor (
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async login(loginUser: LoginUserDto): Promise<{token: string}>{
        const user = await this.usersRepository.findOneBy({email: loginUser.email});


        const isPasswordMatchin = user && bcrypt.compare(loginUser.password, user.password) 

        if(!isPasswordMatchin){
            throw new HttpException('Incorrect email or password', HttpStatus.UNAUTHORIZED)
        }
        const token = await this.createToken(user);
        return {token}
        }
        private async createToken(user: User){
            const payload = {
                id: user.id,
                email: user.email,
                admin: user.admin
            };
            return this.jwtService.signAsync(payload)
        }
    

    async getUsers(page: number, limit: number): Promise<UserWithAdminDto[]> {
        const offset = (page - 1) * limit; 

        const users = await this.usersRepository.find({
            skip: offset,
            take: limit 
        })

        return users.map(user => {
            const userDto = new UserWithAdminDto();
            userDto.name = user.name;
            userDto.age = user.age;
            userDto.email = user.email;
            userDto.address = user.address;
            userDto.phone = user.phone;
            userDto.city = user.city;
            userDto.admin = user.admin
            return userDto
        })
    }


    async getUserById(id: string): Promise<User | undefined>{
        return this.usersRepository.findOne({ where: {id}})
    }

    async createUser(createUser: CreateUserDto): Promise<User>{
        // Verificar que las contraseñas coinciden antes de cualquier procesamiento
        if(createUser.password !== createUser.passwordConfirm){
            throw new HttpException('Password does not match', 400)
        }

        // Crear una nueva instancia de usuario
        const newUser = new User();
        Object.assign(newUser, createUser);// Asignar los datos del DTO al nuevo usuario
        console.log('Usuario antes de guardar:', newUser);        

        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        newUser.password = hashedPassword;// Asignar la contraseña encriptada al nuevo usuario
        console.log('Hashed password:', newUser.password);
        return this.usersRepository.save(newUser)
    }

    async findOneEmail(email: string){
        return this.usersRepository.findOne( {where: {email}})
    }


    async updateUsers(id: string, userUpdate: updateUserDto): Promise <User>{
        const user = await this.usersRepository.findOne( { where: {id}});
        if(!user){
            throw new Error(`User with ${id} was not found`);
        }

        if (userUpdate.password) {

        const salt = await bcrypt.genSalt(10);
        userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
    }

        Object.assign(user, userUpdate);
        await this.usersRepository.save(user)
        return user;
    }

    async removeUsers(id: string): Promise <string>{
        const user = await this.usersRepository.findOne({ where: {id}});
        if(!user){
            throw new Error(`User with ${id} was not found`);
        }
        await this.usersRepository.remove(user);
        return id;
    }

}