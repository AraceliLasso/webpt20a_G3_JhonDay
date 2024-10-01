import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
        auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS         // Tu contraseña o clave de aplicación
        }
    });
    }

    async sendRegistrationEmail(to: string, username: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Remitente
      to: to,                       // Correo del destinatario
        subject: 'Bienvenido a nuestra página',
        text: `Hola ${username}, gracias por registrarte en nuestra página.`,
        html: `<p>Hola <strong>${username}</strong>, gracias por registrarte en nuestra página.</p>`
    };

    try {
        await this.transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
    }
}
