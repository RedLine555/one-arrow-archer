export class Entity {
    x: number = 200;
    y: number = 200;
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