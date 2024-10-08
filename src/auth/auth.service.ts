import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
) {}

private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async verifyGoogleToken(token: string): Promise<any> {
    try {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;// Devuelve el perfil del usuario decodificado
    } catch (error) {
        throw new Error('Token inválido');
    }

    // try {
    //     const decodedToken = jwt.decode(token);
    //     if (!decodedToken) throw new UnauthorizedException('Token no válido o expirado.');
    //     return decodedToken;
    // } catch (error) {
    //     throw new UnauthorizedException('Error al decodificar el token.');
    // }
}

    // async validateOAuthLogin(profile: any): Promise<any> {

    //     console.log("Perfil completo del usuario:", profile);
    //     const email = profile.email;
    //     if (!email) {
    //         throw new Error('Email no encontrado en el token decodificado');
    //     }
    //     try{
    //         let user = await this.usersService.findOneEmail(email);
    //         console.log("email", email)
    //         console.log("user en service validateOAuthLogin", user)
    //         if (!user) {
    //           // Si el usuario no existe, lo registramos
    //             user = await this.usersService.createUserOAuth(profile);
    //         }
        
    //         const payload = { email: user.email, sub: user.id, admin: user.admin };
    //         const token = this.jwtService.sign(payload);
        
    //         return {
    //             user,
    //             token,
    //         };
    //     } catch (error) {
    //         // Manejo de errores
    //         throw new Error('Error durante el proceso de inicio de sesión de OAuth');
    //     }  
    //}

    async validateOAuthLogin(decodedToken: any) {
        console.log("validateOAuthLogin function called", decodedToken);
        // try {
        //     const decodedToken = this.jwtService.decode(token);
        //     console.log('Decoded Token:', decodedToken); // Esto debería mostrar el contenido completo del token
    
        //     const email = decodedToken['email']; // Accede directamente al campo de email
        //     if (!email) {
        //         throw new Error('Email no encontrado en el token decodificado');
        //     }
    
        //     let user = await this.usersService.findOneEmail(email);
        //     if (!user) {
        //         user = await this.usersService.createUserOAuth(decodedToken); // Utiliza el token decodificado completo si necesitas otros campos
        //     }
    
        //     const payload = { email: user.email, sub: user.id, admin: user.admin };
        //     const newToken = this.jwtService.sign(payload);
    
        //     return {
        //         user,
        //         token: newToken,
        //     };
        // } catch (error) {
        //     console.error('Error:', error);
        //     throw new Error('Error durante el proceso de inicio de sesión de OAuth');
        // }

        const email = decodedToken.email;
        if (!email) {
            throw new UnauthorizedException('Email no encontrado en el token decodificado.');
        }

        // Realiza la lógica de búsqueda o creación de usuario en tu sistema
        let user = await this.usersService.findOneEmail(email);
        if (!user) {
            console.log("User not found, creating new user");
            user = await this.usersService.createUserOAuth(decodedToken); // Utiliza el token decodificado para la creación de usuario
        }
        
        return {
            user:{
                //id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        }; // Devuelve el usuario, puedes incluir otros datos si es necesario
    }

    
    async generateJwtToken(user: any): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);

    }
    
}
