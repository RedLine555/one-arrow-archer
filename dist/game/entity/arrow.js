"use strict";
const entity_1 = require("./entity");
class Arrow extends entity_1.Entity {
    constructor(angle) {
        super();
        this.timer = 1;
        this.toRemove = false;
        this.spdX = Math.cos(angle / 180 * Math.PI) * 10;
        this.spdY = Math.sin(angle / 180 * Math.PI) * 10;
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
            let arrow = Arrow.list[i];
            arrow.update();
            pack.push({
                x: arrow.x,
                y: arrow.y
            });
        }
        return pack;
    }
}
exports.Arrow = Arrow;
