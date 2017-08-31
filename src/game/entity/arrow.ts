import { Entity } from './entity'

export class Arrow extends Entity {

    timer: number = 1;
    toRemove: boolean = false;

    constructor(angle) {
        super();
        this.spdX = Math.cos(angle/180*Math.PI) * 10;
        this.spdY = Math.sin(angle/180*Math.PI) * 10;
        Arrow.list[this.id] = this;
    }

    update() {
        if (this.timer++ > 100)
            this.toRemove = true;
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
                y: arrow.y
            })
        }
        return pack;
    }

    static list = {}
}