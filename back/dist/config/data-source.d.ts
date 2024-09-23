import { DataSource } from "typeorm";
export declare const postgresDataSourceConfig: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}>;
export declare const connectionSource: DataSource;
