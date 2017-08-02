"use strict";
class Player {
    constructor(socket) {
        this.x = 200;
        this.y = 200;
        this.maxSpeed = 10;
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingDown = false;
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
exports.Player = Player;
