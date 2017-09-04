import { Entity } from './entity';
import { Arrow } from './arrow';
import { Constants } from '../gameConstants';

export class Player extends Entity {
    maxSpeed: number = 10;
    get MaxSpeed(): number {
        return this.isCharging ? 0.4 * this.maxSpeed : this.maxSpeed;
    }
    rotationSpeed: number = 10;
    get RotationSpeed(): number {
        return this.isCharging ? 0.4 * this.rotationSpeed : this.rotationSpeed;
    }

    haveArrow: boolean = true;

    chargeSpeed: number = Constants.deltaTime;
    chargePower: number = 0;
    chargeLimit: number = 2000;
    isCharging: boolean = false;
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
        this.updateShoot();
        super.update();
    }

    updateSpeed() {
        if (this.pressingRight)
            this.spdX = this.MaxSpeed;
        else if (this.pressingLeft)
            this.spdX = -this.MaxSpeed;
        else
            this.spdX = 0;

        if (this.pressingDown)
            this.spdY = this.MaxSpeed;
        else if (this.pressingUp)
            this.spdY = -this.MaxSpeed;
        else
            this.spdY = 0;
    }

    updateRotation() {
        let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x) / Math.PI * 180;
        if (angle < 0)
            angle += 360;
        else if (angle > 360)
            angle -= 360;
        let diff = angle - this.rotation;
        if (Math.abs(diff) <= this.RotationSpeed)
            this.rotation = angle;
        else {
            if (diff < 0)
                diff += 360;
            else if (diff > 360)
                diff -= 360;
            if (diff < 180) 
                this.rotation += this.RotationSpeed;  
            else
                this.rotation -= this.RotationSpeed;  
        }

        if (this.rotation < 0)
            this.rotation += 360;
        else if (this.rotation > 360)
            this.rotation -= 360;
    }

    updateShoot() {
        if (this.isCharging) {
            this.chargePower += this.chargeSpeed;
            if (this.chargePower > this.chargeLimit)
                this.chargePower = this.chargeLimit;
        } else if (this.chargePower > 0) {
            this.haveArrow = false;
            let arrow = new Arrow(this.id, this.rotation, this.chargePower / this.chargeLimit);
            this.chargePower = 0;
            arrow.x = this.x;
            arrow.y = this.y;
        }
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
                rotation: player.rotation,
                charge: player.chargePower / player.chargeLimit,
                haveArrow: player.haveArrow
            })
        }
        return pack;
    }

    static list = {}
}