import 'reflect-metadata'
import * as express from "express";
import loaders from "./loaders";
import { AppDataSource } from "./data-source";
import config from './config';
import Logger from './loaders/logger';

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        await loaders({ app });
        const port = config.server_port || 5000;
        app.listen(port, () => {
            Logger.info(`Server is running on port ${port}`);
        });
    })
    .catch((error) => Logger.error(`error : ${error}`));
