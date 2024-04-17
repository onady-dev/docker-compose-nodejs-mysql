import { Routes } from "../routes";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { validator } from "../middleware/validator";

export default async ({ app }: { app: express.Application }) => {
    //   app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    Routes.forEach((route) => {
        (app as any)[route.method](
            route.route,
            validator(route.dto),
            (req: express.Request, res: express.Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            }
        );
    });

    return app;
};
