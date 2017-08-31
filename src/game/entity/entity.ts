export class Entity {
    x: number = 200;
    y: number = 200;
    rotation: number = 200;
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
    }

}