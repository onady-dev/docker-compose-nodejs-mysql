import { Service, Container } from 'typedi';
import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

@Service()
export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = Container.get(UserService)
    }

    async find(request: Request, response: Response, next: NextFunction) {
        const users = await this.userService.find();
        response.json(users);
    }

    async findOne(request: Request, response: Response) {
        const user = await this.userService.findOne(request.params);
        response.json(user);
    }

    async save(request: Request, response: Response) {
        const user = await this.userService.save(request.body);
        response.json(user);
    }

    async remove(request: Request, response: Response) {
        const result = await this.userService.remove(request.params);
        response.json(result);
    }
}
