import './assets/styles/style.scss'
import Player from './classes/Player.class';

export const canvas = document.querySelector('canvas') as HTMLCanvasElement;
export const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player({ position: { x: canvas.width / 2, y: canvas.height / 2 }, color: 'blue', radius: 30 })
player.draw();

