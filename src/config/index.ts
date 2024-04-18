import dotenv = require("dotenv");
import path = require("path");
import Logger from "../loaders/logger";

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: path.join(__dirname, "../../env/.env.prod") });
} else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.join(__dirname, "../../env/.env.dev") });
} else {
    throw new Error("Couldn't find .env file");
}

export default {
    server_port: process.env.PORT,
    // api: {
    //     prefix: "/api", 
    // },
    //DB config
    mysql_config: {
        HOST: process.env.MYSQL_HOST,
        PORT: process.env.MYSQL_PORT,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        dialect: "mysql",
        DB: process.env.MYSQL_DATABASE,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
