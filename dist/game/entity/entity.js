"use strict";
class Entity {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.rotation = 0;
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
        if (this.x > 1500)
            this.x -= 1500;
        else if (this.x < 0)
            this.x += 1500;
        if (this.y > 700)
            this.y -= 700;
        else if (this.y < 0)
            this.y += 700;
    }
    getDistance(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }
}
exports.Entity = Entity;
