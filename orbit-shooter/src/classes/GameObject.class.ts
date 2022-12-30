import { PositionType, VelocityType } from "../utils/Interfaces";
import { c } from "../main";

class GameObject implements ObjectModel {
    protected _position;
    protected _radius;
    protected _color;
    protected _velocity;
    constructor({ position, radius, color, velocity }: ObjectConstructor) {
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

interface ObjectModel {
    position: PositionType,
    radius: number,
    color: string,
    draw: () => void
    update: () => void,
}

export interface ObjectConstructor {
    position: PositionType
    radius: number,
    color: string,
    velocity: VelocityType
}

export default GameObject;