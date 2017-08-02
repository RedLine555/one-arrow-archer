export class Player {
    x: number = 200;
    y: number = 200;
    maxSpeed: number = 10;
    pressingRight: boolean = false;
    pressingLeft: boolean = false;
    pressingUp: boolean = false;
    pressingDown: boolean = false;

    id : string;
    socket: any;

    constructor(socket) {
        this.id = socket.id;
        this.socket = socket;

    }

    updatePosition() {
        if (this.pressingRight)
            this.x += this.maxSpeed;
        else if (this.pressingLeft)
            this.x -= this.maxSpeed;
        else if (this.pressingDown)
            this.y += this.maxSpeed;
        else if (this.pressingUp)
            this.y -= this.maxSpeed;
    }
}