import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/../**/*.entity.ts'
  ],
  subscribers: [],
  migrations: [],
  ssl: process.env.DB_SSL_CA ? {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CA
  } : undefined
});

const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

export default getDataSource;
