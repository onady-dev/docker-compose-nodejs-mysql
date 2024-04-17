import 'reflect-metadata'
import * as express from "express";
import loaders from "./loaders";
import { AppDataSource } from "./data-source";
import config from './config';

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        await loaders({ expressApp: app });

        const port = config.port;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
