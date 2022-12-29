import './assets/styles/style.scss'
import Enemy from './classes/Enemy.class';
import Player from './classes/Player.class';
import Particle from './classes/Particle.class';
import Projectile from './classes/Projectile.class';
import { arePointsColliding, calculateDist } from './utils/Helpers';
import gsap from 'gsap';

export const canvas = document.querySelector('canvas') as HTMLCanvasElement;
export const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasCenterHorizontal = canvas.width / 2;
const canvasCenterVertical = canvas.height / 2;
let frames = 0;

const player = new Player({ position: { x: canvasCenterHorizontal, y: canvasCenterVertical }, color: 'white', radius: 10 });

const projectiles: Projectile[] = [];
const enemies: Enemy[] = [];
const particles: Particle[] = [];
let animationId: number;

const spawnEnemies = () => {
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
    const color = `hsla(${Math.random() * 360},50%,50%,1)`
    const angle = Math.atan2(
        canvas.height / 2 -  position.y,
        canvas.width / 2 - position.x
    )
    const velocity = { 
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    enemies.push(new Enemy({ position, radius, color, velocity }));
};

const removeOnProjectileCollide = (enemyIndex: number, projectileIndex: number, removeEnemy: boolean = true) => {
    setTimeout(() => {
        if(removeEnemy)
            enemies.splice(enemyIndex, 1);
        projectiles.splice(projectileIndex, 1);
    }, 0)
}

const isProjectileOffTheScreen = (projectile: Projectile) => {
    return projectile.position.x + projectile.radius < 0 || 
    projectile.position.x - projectile.radius > canvas.width ||
    projectile.position.y + projectile.radius < 0 ||
    projectile.position.y - projectile.radius > canvas.height
}

const createParticles = (enemy: Enemy, projectile: Projectile) => {
    for (let i = 0; i < enemy.radius * 2; i++) {
        particles.push(new Particle({ position: projectile.position, radius: Math.random() * 2, color: enemy.color, velocity: {
            x: (Math.random() - 0.5) * (Math.random() * 2),
            y: (Math.random() - 0.5) * (Math.random() * 2)
        }}));
    }
}

const gameStop = () => {
    cancelAnimationFrame(animationId);
}

const animate = () => {
    frames++;
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0,0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, idx) => {
        if (particle.alpha <= 0) particles.splice(idx, 1);
        else particle.update()
    });
    projectiles.forEach((projectile, index) => {
        projectile.update();
        if (isProjectileOffTheScreen(projectile)) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    });
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        const dist = calculateDist(player.position, enemy.position);
        if (arePointsColliding(dist, enemy.radius, player.radius))
            gameStop();
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = calculateDist(projectile.position, enemy.position);
            // when projectiles touch the enemy
            if (arePointsColliding(dist, enemy.radius, projectile.radius)) {
                createParticles(enemy, projectile);
                if (enemy.radius - 10 > 5)
                {
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    removeOnProjectileCollide(enemyIndex, projectileIndex, false);
                }
                else removeOnProjectileCollide(enemyIndex, projectileIndex);
            }
        });
    });
    if(frames % 60 === 0) spawnEnemies();
};

addEventListener('click', (e) => {
    const angle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
    )
    const velocity = { 
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(
        new Projectile({ position: { x: canvasCenterHorizontal, y: canvasCenterVertical}, radius: 5, color: 'white', velocity})
    )
});

animate();

