import { registerAs } from '@nestjs/config';

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export default registerAs('database', () => {
  return {
    type: 'postgres',
    host: 'spacebattle-backend-database',
    port: parseInt(POSTGRES_PORT) ?? 5432,
    username: POSTGRES_USER ?? 'root',
    password: POSTGRES_PASSWORD ?? 'root',
    database: POSTGRES_DB ?? 'xladnn_spacebattle',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsRun: false,
    logging: true,
    migrationsTableName: 'migration',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: true,
  };
});
