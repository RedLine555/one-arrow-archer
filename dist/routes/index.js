"use strict";
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.addScript("/socket.io/socket.io.js");
        this.addScript("/lib/js/ocanvas.min.js");
        this.addScript("/js/game.js");
        let options = {
            "message": "Welcome to the Tour of Heros"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRoute = IndexRoute;
