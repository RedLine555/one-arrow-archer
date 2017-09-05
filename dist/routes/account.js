"use strict";
const route_1 = require("./route");
class AccountRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[AccountRoute::create] Creating index route.");
        router.get("/signin", (req, res, next) => {
            new AccountRoute().signin(req, res, next);
        });
        router.post("/signin", (req, res, next) => {
            new AccountRoute().login(req, res, next);
        });
    }
    constructor() {
        super();
    }
    signin(req, res, next) {
        this.render(req, res, "signin");
    }
    login(req, res, next) {
        res.redirect("/");
    }
}
exports.AccountRoute = AccountRoute;
