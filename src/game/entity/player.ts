import { Entity } from './entity';
import { Arrow } from './arrow';

export class Player extends Entity {
    maxSpeed: number = 10;
    rotationSpeed: number = 10;
    rotation: number = 10;
    target: {x: number, y:number} = {x:0,y:0};
    pressingRight: boolean = false;
    pressingLeft: boolean = false;
    pressingUp: boolean = false;
    pressingDown: boolean = false;
    pressingAttack: boolean = false;
    mouseAngle: number = 0;

    socket: any;

    constructor(socket) {
        super();
        socket.id = this.id;
        this.socket = socket;
        Player.list[this.id] = this;
    }

    update() {
        this.updateSpeed();
        this.updateRotation();
        super.update();
    }

    shoot(angle) {
        let arrow = new Arrow(angle);
        arrow.x = this.x;
        arrow.y = this.y;
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

    updateRotation() {
        let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x) / Math.PI * 180;
        if (angle < 0)
            angle += 360;
        if (angle > 360) {
            angle -= 360;
        }
        let diff = angle - this.rotation;
        if (diff < 0)
            diff += 360;
        if (diff > 360) {
            diff -= 360;
        }
        if (diff <= this.rotationSpeed)
            this.rotation = angle;
        else if (diff < 180) 
            this.rotation += this.rotationSpeed;  
        else
            this.rotation -= this.rotationSpeed;  

        if (this.rotation < 0)
            this.rotation += 360;
        if (this.rotation > 360) {
            this.rotation -= 360;
        }
        console.log(this.rotation);
    }
    
    static update() {
        let pack = [];
        for (let i in Player.list) {
            let player:Player = Player.list[i];
            player.update();
            pack.push({
                id: player.id,
                x: player.x,
                y: player.y,
                rotation: player.rotation
            })
        }
        return pack;
    }
}