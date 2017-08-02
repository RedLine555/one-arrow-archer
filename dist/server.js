"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const p2 = require("p2");
const socketIo = require("socket.io");
const gameEngine_1 = require("./game/gameEngine");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const index_1 = require("./routes/index");
class Server {
    constructor() {
        this.GameEngine = new gameEngine_1.GameEngine();
        this.app = express();
        this.config();
        this.routes();
        this.api();
    }
    static bootstrap() {
        return new Server();
    }
    api() {
    }
    config() {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set('view engine', 'ejs');
        this.app.use('/public', express.static(__dirname + '/public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    routes() {
        let router;
        router = express.Router();
        index_1.IndexRoute.create(router);
        this.app.use(router);
    }
    sockets(server) {
        var io = socketIo(server);
        io.sockets.on('connection', (socket) => {
            socket.id = Math.random().toString().split('.')[1];
            this.GameEngine.addPlayer(socket);
            socket.on('disconnect', () => {
                this.GameEngine.removePlayer(socket);
            });
            socket.on('input', (data) => {
                this.GameEngine.input(socket, data);
            });
        });
    }
    testP2() {
        var world = new p2.World({
            gravity: [0, -9.82]
        });
        var circleBody = new p2.Body({
            mass: 5,
            position: [0, 10]
        });
        var circleShape = new p2.Circle({ radius: 1 });
        circleBody.addShape(circleShape);
        world.addBody(circleBody);
        var groundBody = new p2.Body({
            mass: 0
        });
        var groundShape = new p2.Plane();
        groundBody.addShape(groundShape);
        world.addBody(groundBody);
        var timeStep = 1 / 60;
        setInterval(function () {
            world.step(timeStep);
        }, 1000 * timeStep);
    }
}
exports.Server = Server;
