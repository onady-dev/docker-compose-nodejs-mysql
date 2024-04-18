import "express-async-errors";
import { Routes } from "../routes";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { validator } from "../middleware/validator";
import { errorMiddleware } from "../middleware/errorMiddleware";
import morganMiddleware from "../middleware/morganMiddleware";

export default async ({ app }: { app: express.Application }) => {
    const whitelist = ['http://localhost:3000'] //클라이언트 (프론트 URL)
    //cors 옵션
    const corsOptions = {
        origin: function (origin, callback) {
            const isWhitelisted = whitelist.indexOf(origin) !== -1
            callback(null, isWhitelisted)
        },
        credentials: true,
    }
    app.use(cors(corsOptions));
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morganMiddleware) //morgan 미들웨어 설정

    Routes.forEach((route) => {
        (app as any)[route.method](
            route.route,
            validator(route.dto),
            async (req: express.Request, res: express.Response, next: Function) => {
                const result = await new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            }
        );
    });

    app.use(errorMiddleware);
    return app;
};
