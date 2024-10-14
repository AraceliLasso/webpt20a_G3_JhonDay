import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Módulo donde tienes el manejo de usuarios
import { GoogleStrategy } from './google.strategy'; // Estrategia de Google para login
import { SharedModule } from 'src/shared/shared.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwtStrategy';// Estrategia JWT para manejo de tokens
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/notifications/mail.module';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
    //     PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET, // Usa tu secret para el JWT
    //     signOptions: { expiresIn: '3600s' },
    // }),
        UsersModule, PassportModule, SharedModule, MailModule],
    providers: [
        AuthService,
        JwtStrategy, // Estrategia para autenticación JWT
    GoogleStrategy, // Estrategia de autenticación de Google
    ],
    controllers: [AuthController],
})
export class AuthModule {}
