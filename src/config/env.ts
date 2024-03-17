import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

interface Config {
  PORT: number;
  DB_CONNECTION: TypeOrmModuleOptions;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT, 10) || 4000,
  DB_CONNECTION: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
};
