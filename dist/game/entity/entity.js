"use strict";
const gameConstants_1 = require("../gameConstants");
class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
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
        if (this.x > gameConstants_1.Constants.maxWidth)
            this.x -= gameConstants_1.Constants.maxWidth;
        else if (this.x < 0)
            this.x += gameConstants_1.Constants.maxWidth;
        if (this.y > gameConstants_1.Constants.maxHeight)
            this.y -= gameConstants_1.Constants.maxHeight;
        else if (this.y < 0)
            this.y += gameConstants_1.Constants.maxHeight;
    }
    getDistance(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }
}
exports.Entity = Entity;
