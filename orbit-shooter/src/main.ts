import './assets/styles/style.scss'
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

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile => projectile.update());
    
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

