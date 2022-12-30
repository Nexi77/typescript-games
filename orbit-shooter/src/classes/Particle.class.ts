import { c } from "../main";
import GameObject, { ObjectConstructor } from "./GameObject.class";

const friction = 0.99;

class Particle extends GameObject implements ParticleModel {
    private _alpha;
    constructor({ position, radius, color, velocity }: ObjectConstructor) {
        super({ position, radius, color, velocity })
        this._alpha = 1;
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
    alpha: number,
}

export default Particle;