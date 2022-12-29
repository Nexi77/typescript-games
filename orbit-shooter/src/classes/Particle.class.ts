import { c } from "../main";
import { PositionType, VelocityType } from "../utils/Interfaces";

const friction = 0.99;

class Particle implements ParticleModel {
    private _position;
    private _radius;
    private _color;
    private _velocity;
    private _alpha;
    constructor({ position, radius, color, velocity }: ParticleConstructor) {
        this._position = position;
        this._radius = radius;
        this._color = color;
        this._velocity = velocity;
        this._alpha = 1;
    }

    get position() {
        return this._position;
    }

    get alpha() {
        return this._alpha;
    }

    draw() {
        c.save();
        c.globalAlpha = this._alpha;
        c.beginPath();
        c.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, false);
        c.fillStyle = this._color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this._velocity.x *= friction;
        this._velocity.y *= friction;
        this._position.x += this._velocity.x;
        this._position.y += this._velocity.y;
        this._alpha -= 0.01;
    }
}

interface ParticleModel {
    position: PositionType,
    alpha: number,
    draw: () => void
    update: () => void,
}

interface ParticleConstructor {
    position: PositionType
    radius: number,
    color: string,
    velocity: VelocityType
}


export default Particle;