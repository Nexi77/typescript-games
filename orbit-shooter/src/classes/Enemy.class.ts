import GameObject, { ObjectConstructor } from "./GameObject.class";

class Enemy extends GameObject {
    constructor({ position, radius, color, velocity }: ObjectConstructor) {
        super({ position, radius, color, velocity})
    }

    get radius() {
        return this._radius;
    }

    set radius(x: number) {
        this._radius = x;
    }
}

export default Enemy;