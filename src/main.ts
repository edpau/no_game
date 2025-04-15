import "./styles/main.scss";

import Tank from "./components/Tank";
import GameMap from "./game/GameMap";
import { Pos } from "./game/types";

import { Direction } from "./game/types";
import {
  disableControls,
  enableControls,
  hideModal,
  showModal,
} from "./utility/ui";
import { handleFlagCapture, resetGame } from "./game/state";

const boardEl = document.querySelector<HTMLDivElement>(".screen__board");
const btnUpEl = document.querySelector<HTMLButtonElement>("#dUp");
const btnDownEl = document.querySelector<HTMLButtonElement>("#dDown");
const btnLeftEl = document.querySelector<HTMLButtonElement>("#dLeft");
const btnRightEl = document.querySelector<HTMLButtonElement>("#dRight");
const btnFireEl = document.querySelector<HTMLButtonElement>("#fire");

const btnFDUpEl = document.querySelector<HTMLButtonElement>("#fDUp");
const btnFDDownEl = document.querySelector<HTMLButtonElement>("#fDDown");
const btnFDLeftEl = document.querySelector<HTMLButtonElement>("#fDLeft");
const btnFDRightEl = document.querySelector<HTMLButtonElement>("#fDRight");

const btnResetEl = document.querySelector<HTMLButtonElement>("#reset");
const btnModalResetEl =
  document.querySelector<HTMLButtonElement>("#modalResetBtn");

const winModalEl = document.querySelector<HTMLDivElement>("#winModal");

if (!boardEl) {
  throw new Error("Cannot find board element");
}

if (!winModalEl) {
  throw new Error("Cannot find win modal element");
}

if (
  !btnUpEl ||
  !btnDownEl ||
  !btnLeftEl ||
  !btnRightEl ||
  !btnFireEl ||
  !btnFDUpEl ||
  !btnFDDownEl ||
  !btnFDLeftEl ||
  !btnFDRightEl ||
  !btnResetEl ||
  !btnModalResetEl
) {
  throw new Error(
    `Cannot find controller elements: btnUpEl => ${btnUpEl}, btnDownEl => ${btnDownEl}, btnLeftEl => ${btnLeftEl}, btnRightEl => ${btnRightEl}, 
    btnFireEl => ${btnFireEl}, btnFDUpEl => ${btnFDUpEl}, btnFDDownEl => ${btnFDDownEl}, btnFDLeftEl => ${btnFDLeftEl}, btnFDRightEl => ${btnFDRightEl}, 
    btnResetEl => ${btnResetEl}, btnModalResetEl => ${btnModalResetEl} `
  );
}

const controlButtons: HTMLButtonElement[] = [
  btnUpEl,
  btnDownEl,
  btnLeftEl,
  btnRightEl,
  btnFDUpEl,
  btnFDDownEl,
  btnFDLeftEl,
  btnFDRightEl,
  btnFireEl,
];

// start game
let gameMap = new GameMap(boardEl);
const tank = new Tank({ x: 5, y: 8 }, gameMap.board);
const flag: Pos = gameMap.flag;
let gameActive: boolean = true;

function handleTankMove(
  direction: Direction,
  tank: Tank,
  gameActive: boolean,
  flag: Pos,
  winModalEl: HTMLDivElement,
  controlButtons: HTMLButtonElement[]
) {
  if (!gameActive) return;
  tank.move(direction);
  handleFlagCapture(
    flag,
    tank.position,
    winModalEl,
    gameActive,
    controlButtons
  );
}

function handleTankFire(tank: Tank, gameActive: boolean) {
  if (!gameActive) return;
  tank.fireBullet();
}

function handleTankFireDirection(
  direction: Direction,
  tank: Tank,
  gameActive: boolean
) {
  if (!gameActive) return;
  tank.updateFireDirection(direction);
}

// Event Listener - direction btn
btnUpEl.addEventListener("click", () => {
  handleTankMove(
    Direction.UP,
    tank,
    gameActive,
    flag,
    winModalEl,
    controlButtons
  );
});

btnDownEl.addEventListener("click", () => {
  handleTankMove(
    Direction.DOWN,
    tank,
    gameActive,
    flag,
    winModalEl,
    controlButtons
  );
});

btnLeftEl.addEventListener("click", () => {
  handleTankMove(
    Direction.LEFT,
    tank,
    gameActive,
    flag,
    winModalEl,
    controlButtons
  );
});

btnRightEl.addEventListener("click", () => {
  handleTankMove(
    Direction.RIGHT,
    tank,
    gameActive,
    flag,
    winModalEl,
    controlButtons
  );
});

btnFireEl.addEventListener("click", () => {
  handleTankFire(tank, gameActive);
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      handleTankMove(
        Direction.UP,
        tank,
        gameActive,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyS":
      handleTankMove(
        Direction.DOWN,
        tank,
        gameActive,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyA":
      handleTankMove(
        Direction.LEFT,
        tank,
        gameActive,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyD":
      handleTankMove(
        Direction.RIGHT,
        tank,
        gameActive,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyF":
      handleTankFire(tank, gameActive);
      break;

    // TODO need to make a function to make it simple and it need to be reuse for other tank
    case "KeyI":
      handleTankFireDirection(Direction.UP, tank, gameActive);
      break;
    case "KeyK":
      if (!gameActive) return;
      handleTankFireDirection(Direction.DOWN, tank, gameActive);
      break;
    case "KeyJ":
      if (!gameActive) return;
      handleTankFireDirection(Direction.LEFT, tank, gameActive);
      break;
    case "KeyL":
      if (!gameActive) return;
      handleTankFireDirection(Direction.RIGHT, tank, gameActive);
      break;
  }
});

// Event Listener - fire direction
btnFDUpEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.UP, tank, gameActive);
});

btnFDDownEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.DOWN, tank, gameActive);
});

btnFDLeftEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.LEFT, tank, gameActive);
});

btnFDRightEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.RIGHT, tank, gameActive);
});

// Event Listener - reset
btnResetEl.addEventListener("click", () => {
  resetGame(gameMap, tank, gameActive, controlButtons);
  hideModal(winModalEl);
});

// Event Listener - modal reset
btnModalResetEl.addEventListener("click", () => {
  resetGame(gameMap, tank, gameActive, controlButtons);
  hideModal(winModalEl);
});
