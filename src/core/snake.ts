import { SNAKE_LENGHT, COLS, ROWS, DIRECTIONS } from "../constants/constants";
import { Direction } from "../models/Direction";
import { Point2D } from "../models/Point2D";
import { directions } from "../services/services";
export class Snake {

    static body: Point2D[] = new Array(COLS*ROWS);
    static direction: Direction[] = new Array(COLS*ROWS);

    constructor(dir: Direction = Direction.left)
    {
        this.reset();
    }

    reset(){
        
        Snake.direction = []//new Array(COLS*ROWS);
        Snake.direction.unshift(Direction.left);
        Snake.direction.unshift(Direction.left);
       // Snake.direction.unshift(Direction.left);
        Snake.direction.forEach(element => {
            console.log(element);
        });
        Snake.body = []//;new Array(COLS*ROWS);
        Snake.body.unshift({ x: COLS / 2, y: ROWS/2 + 3});
        Snake.body.unshift({ x: COLS / 2, y: ROWS/2 + 2});
        Snake.body.unshift({ x: COLS / 2, y: ROWS/2 + 1});

    }

    go(grow: boolean){
        let newPart: Point2D;
        if(grow){
            newPart = {x: Snake.body[Snake.body.length-1].x, y: Snake.body[Snake.body.length-1].y};
        }
        Snake.body.forEach((part, index) => {
            let pomeraj = directions(Snake.direction[index]);
            part.x += pomeraj.y;
            part.y += pomeraj.x;
            //brojac++;
        });
        if(!grow)  
        Snake.direction.pop()
        else Snake.body.push(newPart);
    }
}