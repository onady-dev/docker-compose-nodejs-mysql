import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "find",
    dto: []
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "findOne",
    dto: []
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    dto: []
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    dto: []
}]