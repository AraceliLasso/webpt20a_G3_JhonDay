import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
    super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3010/auth/google/callback', // URL de redirección
        scope: ['email', 'profile'],
    });
}

//     async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
// ): Promise<any> {
//     const { name, emails, photos } = profile;
//     const user = {
//         email: emails[0].value,
//         firstName: name.givenName,
//         lastName: name.familyName,
//         picture: photos[0].value,
//         accessToken,
//     };
//     console.log("user", user)

//     const userInDb = await this.authService.validateOAuthLogin(user);// Valida el usuario en tu sistema
//     done(null, userInDb); // El servicio auth manejará el registro o la validación del usuario.
//     }
}
