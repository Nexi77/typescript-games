import './assets/styles/style.scss'
import Enemy from './classes/Enemy.class';
import Player from './classes/Player.class';
import Projectile from './classes/Projectile.class';

export const canvas = document.querySelector('canvas') as HTMLCanvasElement;
export const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasCenterHorizontal = canvas.width / 2;
const canvasCenterVertical = canvas.height / 2;

const player = new Player({ position: { x: canvasCenterHorizontal, y: canvasCenterVertical }, color: 'blue', radius: 30 });

const projectiles: Projectile[] = [];
const enemies: Enemy[] = [];
let hue = 0;

const spawnEnemies = () => {
    setInterval(() => {
        const radius = Math.random() * (30 - 5) + 5;
        const position = {
            x: 0,
            y: 0
        }
        if(Math.random() < .5) {
            position.x = Math.random() < .5 ? 0 - radius : canvas.width + radius;
            position.y = Math.random() * canvas.height;
        }
        else {
            position.x = Math.random() * canvas.width;
            position.y = Math.random() < .5 ? 0 - radius : canvas.height + radius;
        }
        const color = `hsla(${hue},100%,50%,1)`
        const angle = Math.atan2(
            canvas.height / 2 -  position.y,
            canvas.width / 2 - position.x
        )
        const velocity = { 
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy({ position, radius, color, velocity }))
    }, 1000)
};

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    player.draw();
    hue++;
    projectiles.forEach(projectile => projectile.update());
    enemies.forEach(enemy => enemy.update());
};

addEventListener('click', (e) => {
    const angle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
    )
    const velocity = { 
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile({ position: { x: canvasCenterHorizontal, y: canvasCenterVertical}, radius: 5, color: 'red', velocity})
    )
});

animate();
// spawnEnemies();

