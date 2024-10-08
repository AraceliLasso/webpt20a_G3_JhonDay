import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedAppointments } from './appointments/appointment.seed';
import { seedUsers } from './users/user.seed';
// import { seedProducts } from './products/product.seed';
// import { seedCategories } from './categories/category.seed';
@Module({})
export class SeedModule {
    constructor(private dataSource: DataSource) {}

    async onModuleInit() {
        // await seedCategories(this.dataSource);
        // await seedProducts(this.dataSource); 
        await seedUsers(this.dataSource); 
        await seedAppointments(this.dataSource); 
    }
}
