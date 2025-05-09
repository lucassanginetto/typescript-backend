import "reflect-metadata"
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "admin",
  password: "admin",
  database: "ts_node",
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/**/*.entity.ts'
  ],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => console.log('Connected successfully'))
  .catch((error) => console.log(error))

export default AppDataSource;
