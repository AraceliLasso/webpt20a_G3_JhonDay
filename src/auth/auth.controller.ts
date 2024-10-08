import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
    // Esta función se activa cuando el usuario es redirigido a este endpoint por Google.
    // La autenticación se maneja automáticamente gracias al guardia AuthGuard.
    // Si el usuario no está autenticado, se redirigirá a Google para iniciar sesión.
    // Si el usuario ya está autenticado, se procederá a la siguiente función (callback).
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
    return {
        message: 'Usuario autenticado exitosamente',
        user: req.user,
    };
}

@Post('google-login')
async googleLogin(@Body() body: { token: string }) {

    try{
        const { token } = body;
        console.log("body", body)
    
        // Desencriptar (decodificar) el token JWT recibido
        const decodedToken = await this.authService.verifyGoogleToken(token); // Aquí estás verificando y decodificando el token JWT
        console.log("Decoded Token:", decodedToken);
    
        // Enviar el perfil decodificado (que proviene del token) a validateOAuthLogin
        const user = await this.authService.validateOAuthLogin(decodedToken);
    
        //const user = await this.authService.validateOAuthLogin(token); // Aquí validas el token y creas o logueas al usuario en tu sistema.
        const jwtToken = await this.authService.generateJwtToken(user); // Genera un token JWT para el usuario
       // return { ...user, token: jwtToken }; // Asegúrate de que devuelves el usuario y el token
        return {
            token: jwtToken,
            userData: {
                name: user.user.name,
                email: user.user.email,
                phone: user.user.phone,
            }
            }
    }catch (error){
        console.error("Error al iniciar sesión con Google:", error);
        throw new UnauthorizedException('Error al iniciar sesión con Google');
    }
    
}

}
