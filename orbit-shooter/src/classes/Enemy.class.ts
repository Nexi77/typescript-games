import { c } from "../main";
import { PositionType, VelocityType } from "../utils/Interfaces";

class Enemy implements EnemyModel {
    private _position;
    private _radius;
    private _color;
    private _velocity;
    constructor({ position, radius, color, velocity }: EnemyConstructor) {
        this._position = position;
        this._radius = radius;
        this._color = color;
        this._velocity = velocity;
    }

    get position() {
        return this._position;
    }

    get color() {
        return this._color;
    }

    get radius() {
        return this._radius;
    }

    set radius(x: number) {
        this._radius = x;
    }

    draw() {
        c.beginPath();
        c.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, false);
        c.fillStyle = this._color;
        c.fill();
    }

    update() {
        this._position.x += this._velocity.x;
        this._position.y += this._velocity.y;
        this.draw();
    }
}

interface EnemyModel {
    position: PositionType,
    radius: number,
    color: string,
    draw: () => void
    update: () => void,
}

interface EnemyConstructor {
    position: PositionType
    radius: number,
    color: string,
    velocity: VelocityType
}


export default Enemy;