import { c } from "../main";
import { PositionType, VelocityType } from "../utils/Interfaces";

class Projectile implements ProjectileModel {
    private _position;
    private _radius;
    private _color;
    private _velocity;
    constructor({ position, radius, color, velocity }: ProjectileConstructor) {
        this._position = position;
        this._radius = radius;
        this._color = color;
        this._velocity = velocity;
    }

    get position() {
        return this._position;
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
        this.position.x += this._velocity.x;
        this.position.y += this._velocity.y;
        this.draw();
    }
}

interface ProjectileModel {
    position: PositionType,
    radius: number,
    draw: () => void
    update: () => void
}

interface ProjectileConstructor {
    position: PositionType
    radius: number,
    color: string,
    velocity: VelocityType
}


export default Projectile;