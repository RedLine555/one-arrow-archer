"use strict";
const entity_1 = require("./entity");
const player_1 = require("./player");
const gameConstants_1 = require("../gameConstants");
class Arrow extends entity_1.Entity {
    constructor(parent, angle, power) {
        super();
        this.timer = 1000;
        this.timerRemove = 0;
        this.parent = '_';
        this.isFlying = true;
        power = power + 1;
        this.spdX = Math.cos(angle / 180 * Math.PI) * 30 * power;
        this.spdY = Math.sin(angle / 180 * Math.PI) * 30 * power;
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
                this.timer -= gameConstants_1.Constants.deltaTime;
            }
            for (let i in player_1.Player.list) {
                if (player_1.Player.list[i].id !== this.parent && this.getDistance(player_1.Player.list[i]) < 20) {
                    this.isFlying = false;
                    this.spdX = 0;
                    this.spdY = 0;
                    delete player_1.Player.list[i];
                }
            }
        }
        else {
            if (this.timerRemove++ >= 1000)
                delete Arrow.list[this.id];
            for (let i in player_1.Player.list) {
                if (!player_1.Player.list[i].haveArrow && this.getDistance(player_1.Player.list[i]) < 20) {
                    this.timerRemove = 0;
                    delete Arrow.list[this.id];
                    player_1.Player.list[i].haveArrow = true;
                }
            }
        }
        super.update();
    }
    static update() {
        let pack = [];
        for (let i in Arrow.list) {
            let arrow = Arrow.list[i];
            arrow.update();
            pack.push({
                id: arrow.id,
                x: arrow.x,
                y: arrow.y,
                rotation: arrow.rotation,
                isFlying: arrow.isFlying
            });
        }
        return pack;
    }
}
Arrow.list = {};
exports.Arrow = Arrow;
