import { LogLevel } from '@nestjs/common';
import 'dotenv/config';

const logLevels: LogLevel[] = [
  'verbose',
  'debug',
  'log',
  'error',
  'warn',
  'fatal',
];

const getLogLevel = (level: number): LogLevel => {
  return (logLevels[level] as LogLevel) || 'log';
};

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  db_connection: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_DB || 'postgres',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
  },
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY || 'secret',
    secret_refresh_key: process.env.JWT_SECRET_REFRESH_KEY || 'secret',
    token_expire_time: process.env.TOKEN_EXPIRE_TIME || '1h',
    token_refresh_expire_time: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
  },
  hash: {
    crypt_salt: parseInt(process.env.CRYPT_SALT, 10) || 10,
  },
  logLevel: getLogLevel(parseInt(process.env.LOG_LEVEL, 10) || 2),
};
