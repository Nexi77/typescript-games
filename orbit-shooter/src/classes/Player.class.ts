import { c } from '../main';
import { PositionType } from '../utils/Interfaces';
import GameObject from './GameObject.class';

class Player extends GameObject implements PlayerModel {
    private _power;
    constructor({ position, color, radius } : PlayerConstructor) {
       super({ position, radius, color, velocity: { x: 0, y: 0 } })
        this._power = 10;
    }

    get power() {
        return this._power;
    }

    draw() {
        c.beginPath();
        c.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, false);
        c.fillStyle = this._color;
        c.fill();
    };

    update() {
        
    }

}

interface PlayerModel {
    power: number,
}

interface PlayerConstructor {
    position: PositionType,
    radius: number,
    color: string
}

export default Player;