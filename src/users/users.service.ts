import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProfileDto } from "../auth/dto/update-usergoogle.dt";
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
            });
        
            return users.map(user => {
                const userDto = new UserWithAdminDto();
                userDto.id = user.id;  // Asegúrate de devolver el id también
                userDto.name = user.name;
                userDto.age = user.age;
                userDto.email = user.email;
                userDto.address = user.address;
                userDto.phone = user.phone;
                userDto.city = user.city;
                userDto.admin = user.admin;
                return userDto;
            });
        }
        

    async getUserById(id: string): Promise<User | undefined>{
        return this.usersRepository.findOne({ where: {id}})
    }

    async createUser(createUser: CreateUserDto): Promise<User>{
        try{
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

        return this.usersRepository.save(newUser)
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new HttpException('Error al crear el usuario', 500);
    }
    }

    async createUserOAuth(profile: any): Promise<User> {
        try{
        console.log("profile", profile)
        // Verificar si el usuario ya existe
        const existingUser = await this.usersRepository.findOne({ where: { email: profile.email } });
        if (existingUser) {
        return existingUser;
        }


        const newUser = new User();
        newUser.email = profile.email;
        newUser.name = `${profile.given_name || ''} ${profile.family_name || ''}`.trim();

        // Como estos campos no se obtienen de OAuth le pasamos el valor predeterminado de null
        newUser.phone = profile.phone || null; 
        newUser.city = profile.city || null;
        newUser.address = profile.address || null;
        newUser.age = profile.age || null;
        newUser.password = "passwordOAuth";
        
        // Guardar el nuevo usuario y devolverlo
        return await this.usersRepository.save(newUser);

    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        throw new HttpException('Error al crear el usuario con OAuth', 500);
    }
    }

    async updateProfile( email: string , updateProfileDto: UpdateProfileDto): Promise<User> {
        // const email = decodedToken.email;
        // console.log("decodedToken", decodedToken)
        console.log("email capturado del decodedToken", email)

        if (!email) {
            throw new UnauthorizedException('Email no encontrado en el token decodificado.');
        }

        const user = await this.usersRepository.findOne({ where: { email } });
        console.log("Email encontrado en updateProfile", email)
    
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
    
        Object.assign(user, updateProfileDto);
        console.log("updateProfileDto", updateProfileDto)

        try {
            const updatedUser = await this.usersRepository.save(user);
            console.log("Usuario actualizado en la base de datos:", updatedUser);
            return updatedUser
        } catch (error) {
            console.error("Error al guardar en la base de datos:", error);
            throw new HttpException('Error al actualizar el perfil del usuario', 500);
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