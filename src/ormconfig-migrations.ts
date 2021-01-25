const config = {
  type: 'mssql',
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: 'main5',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/infrastructure/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/infrastructure/migrations',
  },
  migrationsRun: true,
  synchronize: false,
  connectionTimeout: 30000,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

export default config;
