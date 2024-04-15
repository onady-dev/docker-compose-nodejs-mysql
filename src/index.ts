import 'reflect-metadata'
require("dotenv").config();
import * as express from "express";
import loaders from "./loaders";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        await loaders({ expressApp: app });

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
