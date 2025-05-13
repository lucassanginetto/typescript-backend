import "reflect-metadata"
import { DataSource } from "typeorm";

const host = process.env.DB_HOST;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const ca = process.env.DB_SSL_CA;
let ssl = undefined;
if (ca) {
  ssl = {
    rejectUnauthorized: true,
    ca
  };
}

const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/../**/*.entity.ts'
  ],
  subscribers: [],
  migrations: [],
  ssl
});

AppDataSource.initialize()
  .then(() => console.log('Connected successfully'))
  .catch((error) => console.log(error))

export default AppDataSource;
