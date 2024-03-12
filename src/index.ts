import {
    TICKER_INTERVAL,
} from "./constants/constants";
import {
  fromEvent,
  interval
} from "rxjs";
import {
  filter,
  map,
  withLatestFrom
} from "rxjs/operators";
import { Game } from "./core/game";
import { generateWindow, getRecords } from "./services/services"
import { Direction } from "./models/Direction";
import { Snake } from "./core/snake";
import { GameView } from "./core/gameview"

generateWindow();

let snake = new Snake();
let game = new Game(snake);
let prikaz = new GameView(game);

const ticker$ = interval(TICKER_INTERVAL).pipe(
  filter((x) => game.on)
)

let keydown$ = fromEvent(document, 'keydown');

let playerInput$ = keydown$.pipe(
  map((event: any) => {
  switch(event.keyCode){
    case 37:
      return Direction.left;
    case 39:
      return Direction.right;
    case 38:
      return Direction.up;
    case 40:
      return Direction.down;
    default:
      return null
    }
  }),
  filter((dir: Direction) => (dir === null || (!prikaz.game.isSameDirection(dir) && !prikaz.game.isSameLine(dir))),
  map((dir: Direction) => {
    if(dir === null)
      return Snake.direction[0];
    else return dir;
  })
  ));
  
let gameFlow$ = ticker$.pipe(
  withLatestFrom(playerInput$))
  .subscribe(x => {
      Snake.direction.unshift(x[1]);
      prikaz.updateGame();
  });

(async () => {
    let niz = await getRecords();
    console.log(niz);
})();

/* let niz = await getRecords();
console.log(niz); */



