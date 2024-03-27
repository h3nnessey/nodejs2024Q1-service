import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './env';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...config.db_connection,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
