import GameObject, { ObjectConstructor } from "./GameObject.class";

class Projectile extends GameObject {
    constructor({ position, radius, color, velocity }: ObjectConstructor) {
       super({ position, color, radius, velocity })
    }
}

export default Projectile;