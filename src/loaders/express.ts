import { Routes } from "../routes";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { validationResult } from "express-validator";

export default async ({ app }: { app: express.Application }) => {
    //   app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    const validate = (req: express.Request, res: express.Response, next: Function) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(400).json({ message: errors.array()[0].msg });
    };

    Routes.forEach((route) => {
        (app as any)[route.method](
            route.route,
            [...route.dto, validate],
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
