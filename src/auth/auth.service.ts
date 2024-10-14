import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/users.entity';

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
}

    async validateOAuthLogin(decodedToken: any) {
    
        const email = decodedToken.email;
        if (!email) {
            throw new UnauthorizedException('Email no encontrado en el token decodificado.');
        }

        // Realiza la lógica de búsqueda o creación de usuario en tu sistema
        let user = await this.usersService.findOneEmail(email);
        let isNewUser = false;

        if (!user) {
            console.log("User not found, creating new user");
            user = await this.usersService.createUserOAuth(decodedToken); // Utiliza el token decodificado para la creación de usuario
            isNewUser = true; // Marca el usuario como nuevo
        }
        
        return {
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                age: user.age,
                city: user.city,
                address: user.address
            },
            isNewUser, // Devuelve si el usuario es nuevo
        }; 
    }

    
    async generateJwtToken(user: Partial<User>): Promise<string> {
        const payload = { 
            sub: user.id, 
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            address: user.address,
            city: user.city,
            
        };
        return this.jwtService.sign(payload);

    }
    
}
