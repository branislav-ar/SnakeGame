import { Snake } from "./snake"
import { Direction } from "../models/Direction";
import { Point2D } from "../models/Point2D"
import { COLS } from "../constants/constants";

export class Game {
    snake: Snake;
    on: boolean;
    static points: number;
    static appleLoc: Point2D;

    constructor(snake: Snake, on: boolean = false) {
        this.snake = snake;
        this.on = false;
        Game.points = 0;
    }

startGame(){

    this.on = true;
    this.snake.reset();
    Game.points = 0;
    Game.appleLoc = this.generateNewApple();
}

newApple(){
    Game.appleLoc = this.generateNewApple();
}

endGame(){
    
}

isSameDirection(dir: Direction){
    if(Snake.direction[0] === dir)
    return true;
    else
    return false;
}

isSameLine(dir: Direction) {
    if(dir+2 === Snake.direction[0] || dir-2 === Snake.direction[0])
        return true;
    else return false;
}

generateNewApple(){
    function getRandomInt(min: number, max: number) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    let loc: Point2D = {x: getRandomInt(0, COLS-1), y: getRandomInt(0, COLS-1)};
    let found = false;
    while(!found){
        let PartColission = false;
        Snake.body.forEach(part => {
            if(part.x === loc.x && part.y === loc.y)
            PartColission = true;
        })
        if(PartColission === false)
            found = true;
        else loc = {x: getRandomInt(0, COLS-1), y: getRandomInt(0, COLS-1)};
    }
    return loc;

}



}