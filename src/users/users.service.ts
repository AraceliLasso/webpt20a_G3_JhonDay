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
//import { MailService } from "src/notifications/mail.service";

@Injectable()
export class UsersService{
    constructor (
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService, 
        //private readonly mailService: MailService
    ){}

    async login(loginUser: LoginUserDto): Promise<{user: Partial<User>,token: string}>{
        const user = await this.usersRepository.findOneBy({email: loginUser.email.toLowerCase()});
        console.log('Email recibido en el login:', loginUser.email);
        console.log('Usuario encontrado:', user);

        const isPasswordMatchin = user && await bcrypt.compare(loginUser.password, user.password) 


        console.log('Contraseña recibida en el login:', loginUser.password);
        console.log('Contraseña coincide:', isPasswordMatchin);

        if(!isPasswordMatchin){
            throw new HttpException('Email o contraseña incorrecto', HttpStatus.UNAUTHORIZED)
        }


        const token = await this.createToken(user);
        // Elimina campos sensibles como password
    const { password, ...userWithoutPassword } = user;

    // Devuelve tanto el token como la información del usuario
    return {
        user: userWithoutPassword,
        token
    };
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
            throw new HttpException('Las contraseñas no coinciden', 400)
        }

        // Crear una nueva instancia de usuario
        const newUser = new User();
        Object.assign(newUser, createUser);// Asignar los datos del DTO al nuevo usuario
        console.log('Usuario antes de guardar:', newUser);        

        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        newUser.password = hashedPassword;// Asignar la contraseña encriptada al nuevo usuario
        console.log('Hashed password:', newUser.password);

        // Enviar correo de bienvenida
        //await this.mailService.sendRegistrationEmail(newUser.email, newUser.name);

        return this.usersRepository.save(newUser)
    }

    async createUserOAuth(profile: any): Promise<User> {

        console.log("profile", profile)
        // Verificar si el usuario ya existe
        const existingUser = await this.usersRepository.findOne({ where: { email: profile.email } });
        if (existingUser) {
        return existingUser;
        }


        const newUser = new User();
        newUser.email = profile.email;
        newUser.name = `${profile.given_name || ''} ${profile.family_name || ''}`.trim();

        //newUser.name = `${profile.givenName} ${profile.familyName}`;// Asignar el nombre completo al campo 'name'
        // newUser.picture = profile.picture; se obtine desde el registro de OAuth pero nosotros no tenemos ese campo en la BD 
        
        // Como estos campos no se obtienen de OAuth le pasamos el valor predeterminado de null
        newUser.phone = null; 
        newUser.city = null;
        newUser.address = null;
        newUser.age = null;
        newUser.password = "passwordOAuth";
        
        // Guardar el nuevo usuario y devolverlo
    try {
        return await this.usersRepository.save(newUser);
    } catch (error) {
        // Manejo de errores
        console.error('Error al guardar el usuario:', error);
        throw new Error('Error al crear el usuario');
    }
    }
    


    async findOneEmail(email: string){
        return this.usersRepository.findOne( {where: {email}})
    }


    async updateUsers(id: string, userUpdate: updateUserDto): Promise <User>{
        const user = await this.usersRepository.findOne( { where: {id}});
        if(!user){
            throw new Error(`Usuario con ${id} no fue encontrado`);
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
            throw new Error(`Usuario con ${id} no fue encontrado`);
        }
        await this.usersRepository.remove(user);
        return id;
    }
}