import { Constants } from "../gameConstants";

export class Entity {
    x: number = 0;
    y: number = 0;
    rotation: number = 0;
    spdX: number = 0;
    spdY: number = 0;

    id : string;

    constructor() {
        this.id = Math.random().toString().split('.')[1];
    }

    update() {
        this.updatePosition();
    }
    updatePosition() {
        this.x += this.spdX;
        this.y += this.spdY;
        if (this.x > Constants.maxWidth)
            this.x -= Constants.maxWidth;
        else if (this.x < 0)
            this.x += Constants.maxWidth;
        if (this.y > Constants.maxHeight)
            this.y -= Constants.maxHeight;
        else if (this.y < 0)
            this.y += Constants.maxHeight;
    }
    getDistance(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

}