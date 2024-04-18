import { DataSource } from "typeorm";
import config from "./config";
import { User } from "./entity/user/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.mysql_config.HOST,
    port: Number(config.mysql_config.PORT),
    username: config.mysql_config.USER,
    password: config.mysql_config.PASSWORD,
    database: config.mysql_config.DB,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
