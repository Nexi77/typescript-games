import { c } from '../main';
import { PositionType } from '../utils/Interfaces';

class Player implements PlayerModel {
    private _position;
    private _radius;
    private _color;
    constructor({ position, color, radius } : PlayerConstructor) {
        this._position = position
        this._radius = radius;
        this._color = color;
    }

    get position() {
        return this._position;
    }

    draw() {
        c.beginPath();
        c.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2, false);
        c.fillStyle = this._color;
        c.fill();
    };

}

interface PlayerModel {
    position: PositionType,
    draw: () => void
}

interface PlayerConstructor {
    position: PositionType,
    radius: number,
    color: string
}


export default Player;