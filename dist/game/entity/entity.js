"use strict";
class Entity {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.spdX = 0;
        this.spdY = 0;
        this.id = Math.random().toString().split('.')[1];
    }
    update() {
        this.updatePosition();
    }
    updatePosition() {
        this.x += this.spdX;
        this.y += this.spdY;
    }
}
Entity.list = {};
exports.Entity = Entity;
