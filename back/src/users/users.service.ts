import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
//import { compare} from 'bcrypt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService{
    constructor (
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    async login(loginUser: LoginUserDto): Promise<User>{
        const user = await this.usersRepository.findOneBy({email: loginUser.email});

        
        const isPasswordMatchin = user && bcrypt.compare(loginUser.password, user.password) 
        
        if(!isPasswordMatchin){
            throw new HttpException('Email o password incorrectos', HttpStatus.UNAUTHORIZED)
        }
        return user
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
            throw new HttpException('La contraseña no coincide', 400)
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
            throw new Error(`El usuario con ${id} no fue encontrado`);
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
            throw new Error(`El usuario con ${id} no fue encontrado`);
        }
        await this.usersRepository.remove(user);
        return id;
    }

}


