import { Entity } from './entity'

export class Player extends Entity {
    maxSpeed: number = 10;
    pressingRight: boolean = false;
    pressingLeft: boolean = false;
    pressingUp: boolean = false;
    pressingDown: boolean = false;

    socket: any;

    constructor(socket) {
        super();
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

    static list = {};
    
    static update() {
        let pack = [];
        for (let i in Player.list) {
            let player:Player = Player.list[i];
            player.update();
            pack.push({
                id: player.id,
                x: player.x,
                y: player.y
            })
        }
        return pack;
    }
}