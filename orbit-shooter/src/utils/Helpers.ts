import { PositionType } from "./Interfaces";

const calculateDist = (firstPosition: PositionType, secondPosition: PositionType) => {
    return Math.hypot(firstPosition.x - secondPosition.x, firstPosition.y - secondPosition.y);
};

const arePointsColliding = (dist: number, firstPointRadius: number, secondPointRadius: number) => {
    return dist - firstPointRadius - secondPointRadius < 1;
}

export { calculateDist, arePointsColliding }