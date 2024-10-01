import { User } from "src/users/users.entity";
import { DataSource } from "typeorm";
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
    const usersRepository = dataSource.getRepository(User);

    const users = [
        {
            id: "d7b3b02b-8d26-4f95-94a8-1e54f2d89b6c",
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            password: await bcrypt.hash("Password1!", 10), // Hash de la contraseña
            age: 28,
            phone: 1234567890,
            city: "Buenos Aires",
            address: "Avenida de Mayo 123",
            admin: true,
        },
        {
            id: "a1b4dede-5c4e-40c4-b3c8-42d18e962f6e",
            name: "María López",
            email: "maria.lopez@example.com",
            password: await bcrypt.hash("Password2@", 10),
            age: 32,
            phone: 2345678901,
            city: "Córdoba",
            address: "Calle Falsa 456",
            admin: false,
        },
        {
            id: "4cddc224-6b6a-4a8d-9a9c-f8e5a1d3d12b",
            name: "Carlos González",
            email: "carlos.gonzalez@example.com",
            password: await bcrypt.hash("Password3#", 10),
            age: 25,
            phone: 3456789012,
            city: "Rosario",
            address: "Calle del Libertador 789",
            admin: false,
        },
        {
            id: "e5e396b2-b1d7-4e6d-bc21-6bb9f7b4b656",
            name: "Lucía Fernández",
            email: "lucia.fernandez@example.com",
            password: await bcrypt.hash("Password4$", 10),
            age: 29,
            phone: 4567890123,
            city: "La Plata",
            address: "Avenida 7 321",
            admin: false,
        },
        {
            id: "fb22f8a9-44e6-4b7e-896e-fd96f9c9f633",
            name: "Andrés Martínez",
            email: "andres.martinez@example.com",
            password: await bcrypt.hash("Password5%", 10),
            age: 34,
            phone: 5678901234,
            city: "Mendoza",
            address: "Calle San Martín 654",
            admin: false,
        },
        {
            id: "8a633f91-49c5-41d2-94ba-69d490d6ff7b",
            name: "Sofía Ramírez",
            email: "sofia.ramirez@example.com",
            password: await bcrypt.hash("Password6^", 10),
            age: 22,
            phone: 6789012345,
            city: "Tucumán",
            address: "Avenida Belgrano 987",
            admin: false,
        },
        {
            id: "739cfb5c-fd65-4519-a959-015216c2be7d",
            name: "Diego Torres",
            email: "diego.torres@example.com",
            password: await bcrypt.hash("Password7&", 10),
            age: 30,
            phone: 7890123456,
            city: "Salta",
            address: "Calle 20 de Febrero 159",
            admin: false,
        }
    ];

    for (const user of users) {
        const existingUser = await usersRepository.findOne({
            where: { email: user.email } // Verifica si el usuario ya existe por su correo electrónico
        });

        if (!existingUser) {
            await usersRepository.save(user);
        } else {
            console.log(`El usuario "${user.name}" ya existe y no se insertará.`);
        }
    }
};
