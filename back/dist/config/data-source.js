"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.postgresDataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
dotenv.config({ path: '.env.development.local' });
console.log({
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
});
const PostgresDataSource = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: ['./dist/**/*.entity{.ts,.js}'],
    migrations: ['./dist/migration/*{.ts,.js}'],
};
exports.postgresDataSourceConfig = (0, config_1.registerAs)('postgres', () => PostgresDataSource);
exports.connectionSource = new typeorm_1.DataSource(PostgresDataSource);
//# sourceMappingURL=data-source.js.map