import {
    COLS,
    ROWS,
    GAP_SIZE,
    CELL_SIZE,
    
} from "../constants/constants";
import { Game } from "./game"
import { Point2D } from "../models/Point2D";
import { Snake } from "./snake";

export class GameView {

    matrix: HTMLDivElement[][];
    dugme: HTMLButtonElement;
    scoreLabel: HTMLLabelElement;
    game: Game;

    constructor(game: Game, columns: number = COLS, rows: number = ROWS, spaceBetween: number = GAP_SIZE, cellSize: number = CELL_SIZE){
        this.game = game;

        this.createStartButton(this.game);
        this.createScoreLabel(this.game);
        this.createGameMatrix();
    }

    updateGame() {
        this.game.snake.go(this.isAppleEaten(Snake.body[0]));
        if(this.isBorderColission(Snake.body[0]))
            this.endGame();
        else if(this.isSelfEating(Snake.body[0]))
            this.endGame();
        else{
        this.scoreLabel.innerHTML = "SCORE: " + Game.points;
        for(let i=0; i<COLS; i++)
            for(let j=0; j<ROWS; j++)
                this.matrix[i][j].style.backgroundColor = "white";

        this.matrix[Game.appleLoc.x][Game.appleLoc.y].style.backgroundColor = "red";
        
        Snake.body.forEach((part) => {
            console.log(part);
            this.matrix[part.x][part.y].style.backgroundColor = "black"; 
        });

        
        }
    }

    isBorderColission(part: Point2D){
        if(part.x < 0 || part.y < 0)
            return true;
        if(part.x >= COLS || part.y >= COLS)
            return true;
        return false;
    }

    isSelfEating(part: Point2D){
        for(let i=1; i < Snake.body.length; i++){
            if(part.x === Snake.body[i].x && part.y === Snake.body[i].y)
                return true;
        }
        return false;
    }

    endGame() {
        this.game.on = false;
        this.dugme.disabled = false;
        for(let i=0; i<COLS; i++)
            for(let j=0; j<COLS; j++)
                this.matrix[i][j].style.backgroundColor = "white";
    }

    createStartButton(game: Game){
        this.dugme = document.createElement("button");
        this.dugme.innerHTML = "START";
        this.dugme.style.height = "30px";
        this.dugme.style.width = "60px";
        this.dugme.style.backgroundColor = "green";
        this.dugme.style.alignSelf = "center"; 
        this.dugme.onclick = () => {
            game.startGame();
            this.dugme.disabled = true;
        }
        document.body.appendChild(this.dugme);
    }

    createScoreLabel(game: Game){
        this.scoreLabel = document.createElement("label");
        this.scoreLabel.innerHTML = "SCORE: " + Game.points;
        this.scoreLabel.style.fontFamily = "Fantasy";
        //this.scoreLabel.style.fontStyle = "bold";
        this.scoreLabel.style.fontSize = "30px";
        this.scoreLabel.style.height = "30px";
        this.scoreLabel.style.width = "200px";
        this.scoreLabel.style.alignSelf = "center"; 
        this.scoreLabel.style.margin = "50px";
        this.scoreLabel.style.color = "#99ff99";
        document.body.appendChild(this.scoreLabel);
    }

    createGameMatrix(){
        let container = document.createElement("div");
        container.style.margin = "0px";
        container.classList.add("container");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignSelf = "center"; 
        this.matrix = [];
        for(let i=0; i<COLS; i++){
            this.matrix[i] = [];
            let red = document.createElement("div");
            red.style.display = "flex";
            red.style.flexDirection = "row";
            for(let j=0; j<ROWS; j++){
                let div = document.createElement("div");
                div.style.height = CELL_SIZE.toString() + "px";
                div.style.width = CELL_SIZE.toString() + "px";
                div.style.backgroundColor = "white";
                div.style.margin = GAP_SIZE.toString() + "px";

                red.appendChild(div);
                this.matrix[i][j] = div;
            }
            container.appendChild(red);
        }
        document.body.appendChild(container);
    }

    isAppleEaten(head: Point2D){
        if(head.x === Game.appleLoc.x && head.y === Game.appleLoc.y){
            this.game.newApple();
            Game.points += 25;
            return true;
        }
        return false;
    }

    
}