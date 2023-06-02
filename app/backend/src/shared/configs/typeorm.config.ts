import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'spacebattle-backend-database',
  port: parseInt(POSTGRES_PORT) ?? 5432,
  username: POSTGRES_USER ?? 'root',
  password: POSTGRES_PASSWORD ?? 'root',
  database: POSTGRES_DB ?? 'xladnn_spacebattle',
  entities: [__dirname + './../../modules/**/*.entity.{js,ts}'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: true,
};

export default config;
