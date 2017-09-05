import { Entity } from './entity'
import { Player } from './player'
import { Constants } from '../gameConstants';

export class Arrow extends Entity {

    timer: number = 1000;
    timerRemove: number = 0;
    parent: string = '_';
    isFlying: boolean = true;

    constructor(parent, angle, power) {
        super();
        power = power + 1;
        this.spdX = Math.cos(angle/180*Math.PI) * 30 * power;
        this.spdY = Math.sin(angle/180*Math.PI) * 30 * power;
        this.parent = parent;
        Arrow.list[this.id] = this;
        this.rotation = angle;
    }

    update() {
        if (this.isFlying) {
            if (this.timer <= 0) {
                this.isFlying = false;
                this.spdX = 0;
                this.spdY = 0;
            }
            else {
                this.timer -= Constants.deltaTime;
            }
            for(let i in Player.list) {
                if (Player.list[i].id !== this.parent && this.getDistance(Player.list[i]) < 20) {
                    this.isFlying = false;
                    this.spdX = 0;
                    this.spdY = 0;
                    delete Player.list[i];
                }
            }
        } else {
            if (this.timerRemove++ >= 1000)
                delete Arrow.list[this.id];
            for(let i in Player.list) {
                if (!Player.list[i].haveArrow && this.getDistance(Player.list[i]) < 20) {
                    this.timerRemove = 0;
                    delete Arrow.list[this.id];
                    Player.list[i].haveArrow = true;
                }
            }
        }
        super.update();

    }

    static update() {
        let pack = [];
        for (let i in Arrow.list) {
            let arrow:Arrow = Arrow.list[i];
            arrow.update();
            pack.push({
                id: arrow.id,
                x: arrow.x,
                y: arrow.y,
                rotation: arrow.rotation,
                isFlying: arrow.isFlying
            })
        }
        return pack;
    }

    static list = {}
}