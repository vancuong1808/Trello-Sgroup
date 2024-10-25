import { DataSource } from "typeorm";
import { envDataBase } from '../env'

export const mysqlSource = new DataSource({
    type: "mysql",
    host: envDataBase.HOST,
    port : envDataBase.PORT,
    username: envDataBase.USERNAME,
    password: envDataBase.PASSWORD,
    database: envDataBase.DATABASE,
    synchronize: false,
    logging: false,
    entities: [__dirname + "/../orm/entities/*.ts"],
    migrations: [__dirname + "/../orm/migrations/*.ts"],
});