import { DataSource } from 'typeorm';
import { Appointment, Statusenum } from 'src/appointment/appointment.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { Category } from 'src/category/category.entity';

export const seedAppointments = async (dataSource: DataSource) => {
    const appointmentRepository = dataSource.getRepository(Appointment);
    
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);

    // Obtener usuarios y productos para relacionar en las citas
    const users = await userRepository.find();
    const products = await productRepository.find();

    const appointments: Partial<Appointment>[] = [
        {
            id: "f1e7c9e2-4123-4f3b-bd8c-1d2b80a85d0f",
            status: Statusenum.PENDIENTE, // Usar el enum
            date: new Date("2024-09-30T10:00:00Z"),
            description: "Cita para mantenimiento de laptop.",
            user: users[0],
            category: Category[0],
        },
        {
            id: "d18c5f8b-5cfc-4f74-8b54-cb83ae2c9a1b",
            status: Statusenum.COMPLETADO, // Usar el enum
            date: new Date("2024-09-29T14:30:00Z"),
            description: "Reparación de impresora terminada.",
            user: users[1],
            category: Category[1],
        },
        {
            id: "e3d3a0c4-2153-4a3b-a2b3-c9d64a8c5e7b",
            status: Statusenum.PENDIENTE, // Usar el enum
            date: new Date("2024-10-01T09:00:00Z"),
            description: "Instalación de red WiFi solicitada.",
            user: users[2],
            category: Category[2],
        },
        {
            id: "c1e7652e-b7d6-4c5d-9771-f5e3f2c7a2a0",
            status: Statusenum.COMPLETADO, // Usar el enum
            date: new Date("2024-09-28T16:00:00Z"),
            description: "Reparación de línea fija completada.",
            user: users[0],
            category: Category[3],
        },
        {
            id: "b1b6b15f-98d1-4a76-bc0e-5e3d5f6c3e44",
            status: Statusenum.PENDIENTE, // Usar el enum
            date: new Date("2024-09-30T11:30:00Z"),
            description: "Consulta sobre administración escolar.",
            user: users[1],
            category: Category[4],
        },
        {
            id: "a7153fd6-5b54-4e4b-b9f4-d6d20968f4a4",
            status: Statusenum.COMPLETADO, // Usar el enum
            date: new Date("2024-09-27T12:00:00Z"),
            description: "Consultoría escolar realizada.",
            user: users[2],
            category: Category[5],
        },
        {
            id: "b2a5f88f-5ec3-4c09-81cb-c34c776b4a14",
            status: Statusenum.PENDIENTE, // Usar el enum
            date: new Date("2024-10-02T15:00:00Z"),
            description: "Revisión de PC de escritorio.",
            user: users[0],
            category: Category[6],
        },
    ];

    for (const appointment of appointments) {
        const existingAppointment = await appointmentRepository.findOne({
            where: { id: appointment.id },
        });
        
        if (!existingAppointment) {
            await appointmentRepository.save(appointment);
        }
    }
};
