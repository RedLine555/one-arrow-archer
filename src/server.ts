import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as p2 from "p2";
import * as socketIo from "socket.io";
import * as http from "http";
import { GameEngine } from "./game/gameEngine";

import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { IndexRoute } from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();

        //this.testP2();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.set('view engine', 'ejs');
        //use logger middlware
        //this.app.use(logger("dev"));
        
        //client files
        this.app.use('/public', express.static(__dirname + '/public') );

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parker middleware middlware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middlware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    private routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
    public GameEngine = new GameEngine();
    public sockets(server) {
        var io = socketIo(server);
        io.sockets.on('connection', (socket: any) => {
            socket.id = Math.random().toString().split('.')[1];

            this.GameEngine.addPlayer(socket);

            socket.on('disconnect', ()=>{
                this.GameEngine.removePlayer(socket);
            })

            socket.on('input', (data)=>{
                this.GameEngine.input(socket, data);
            })
        });
    }

    public testP2() {
        // Create a physics world, where bodies and constraints live 
        var world = new p2.World({
            gravity: [0, -9.82]
        });

        // Create an empty dynamic body 
        var circleBody = new p2.Body({
            mass: 5,
            position: [0, 10]
        });

        // Add a circle shape to the body. 
        var circleShape = new p2.Circle({ radius: 1 });
        circleBody.addShape(circleShape);

        // ...and add the body to the world. 
        // If we don't add it to the world, it won't be simulated. 
        world.addBody(circleBody);

        // Create an infinite ground plane. 
        var groundBody = new p2.Body({
            mass: 0 // Setting mass to 0 makes the body static 
        });
        var groundShape = new p2.Plane();
        groundBody.addShape(groundShape);
        world.addBody(groundBody);

        // To get the trajectories of the bodies, 
        // we must step the world forward in time. 
        // This is done using a fixed time step size. 
        var timeStep = 1 / 60; // seconds 

        // The "Game loop". Could be replaced by, for example, requestAnimationFrame. 
        setInterval(function () {

            // The step method moves the bodies forward in time. 
            world.step(timeStep);

            // Print the circle position to console. 
            // Could be replaced by a render call. 
            //console.log("Circle y position: " + circleBody.position[1]);

        }, 1000 * timeStep);
    }
}