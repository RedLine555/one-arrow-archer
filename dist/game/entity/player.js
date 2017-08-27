"use strict";
const entity_1 = require("./entity");
class Player extends entity_1.Entity {
    constructor(socket) {
        super();
        this.maxSpeed = 10;
        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingDown = false;
        socket.id = this.id;
        this.socket = socket;
        Player.list[this.id] = this;
    }
    update() {
        this.updateSpeed();
        super.update();
    }
    updateSpeed() {
        if (this.pressingRight)
            this.spdX = this.maxSpeed;
        else if (this.pressingLeft)
            this.spdX = -this.maxSpeed;
        else
            this.spdX = 0;
        if (this.pressingDown)
            this.spdY = this.maxSpeed;
        else if (this.pressingUp)
            this.spdY = -this.maxSpeed;
        else
            this.spdY = 0;
    }
    static update() {
        let pack = [];
        for (let i in Player.list) {
            let player = Player.list[i];
            player.update();
            pack.push({
                id: player.id,
                x: player.x,
                y: player.y
            });
        }
        return pack;
    }
}
Player.list = {};
exports.Player = Player;
