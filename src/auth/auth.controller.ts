import { Body, Controller, Get, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MailService } from 'src/notifications/mail.service';
import { UpdateProfileDto } from './dto/update-usergoogle.dt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly mailService: MailService, 
        private readonly usersService: UsersService

    ) {}

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

        const decodedToken = await this.authService.verifyGoogleToken(token); // Verificando y decodificando el token JWT recibido
        
        // Enviar el perfil decodificado (que proviene del token) a validateOAuthLogin
        const{ user, isNewUser }= await this.authService.validateOAuthLogin(decodedToken);

        // Enviar correo de bienvenida si el usuario es nuevo
        if (isNewUser) { 
            setImmediate(() => {
            this.mailService.sendMail(
                user.email,
                'Bienvenido a JhonDay',
                'Gracias por registrarte.',
                '<h1>Te damos la bienvenida a JhonDay!!</h1><p>Gracias por registrarte.</p>',
        ).catch((error) => {
            console.error("Error al enviar correo de bienvenida:", error);
        });
    });
}
        const jwtToken = await this.authService.generateJwtToken(user); // Genera un token JWT para el usuario

        return {
            token: jwtToken,
            userData: {
                name: user.name,
                email: user.email,
                phone: user.phone || null,
                age: user.age || null,
                address: user.address || null,
                city: user.city || null,
                isProfileComplete: user.phone && user.age && user.address && user.city ? true : false
            },
            };
    }catch (error){
        console.error("Error al iniciar sesión con Google:", error);
        throw new UnauthorizedException('Error al iniciar sesión con Google');
    }
    
}
    @Patch('update-profile')
    @UseGuards(AuthGuard('jwt'))
    async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    const {email} = req.user;
    console.log("req.user", req.user)
    console.log("Email from token:", email);
    if (!email) {
        throw new UnauthorizedException('No se pudo obtener el email del token.');
    }

    return await this.usersService.updateProfile(email, updateProfileDto);
    }

}
