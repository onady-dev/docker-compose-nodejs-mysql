import { CreateUserDto } from './entity/user/User.dto';
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "find",
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "findOne",
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    dto: CreateUserDto
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
}]