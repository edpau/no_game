import "./styles/main.scss";

import Tank from "./components/Tank";
import GameMap from "./game/GameMap";
import { Pos } from "./game/types";

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
  throw new Error("Cannot find controller elements");
}

// start game
let gameMap = new GameMap(boardEl);
const tank = new Tank({ x: 5, y: 8 }, gameMap.board);
const flag: Pos = gameMap.flag;

// TODO game data, take away later
const directionDataEl = document.querySelector("#fireD");
if (!directionDataEl) {
  throw new Error("game data element not found");
}

// TODO refactor, repeat code
// Event Listener - direction btn
btnUpEl.addEventListener("click", () => {
  tank.moveUp();
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnDownEl.addEventListener("click", () => {
  tank.moveDown();
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnLeftEl.addEventListener("click", () => {
  tank.moveLeft();
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnRightEl.addEventListener("click", () => {
  tank.moveRight();
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnFireEl.addEventListener("click", () => {
  tank.fireBullet();
});

// TODO refactor, repeat code
window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      tank.moveUp();
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyS":
      tank.moveDown();
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyA":
      tank.moveLeft();
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyD":
      tank.moveRight();
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyF":
      tank.fireBullet();
      break;

    // TODO need to make a function to make it simple and it need to be reuse for other tank
    case "KeyI":
      tank.fireDir = "up";
      directionDataEl.textContent = tank.fireDir;
      break;
    case "KeyK":
      tank.fireDir = "down";
      directionDataEl.textContent = tank.fireDir;
      break;
    case "KeyJ":
      tank.fireDir = "left";
      directionDataEl.textContent = tank.fireDir;
      break;
    case "KeyL":
      tank.fireDir = "right";
      directionDataEl.textContent = tank.fireDir;
      break;
  }
});

// Event Listener - fire direction
// TODO need to make a function to make it simple and it need to be reuse for other tank
btnFDUpEl.addEventListener("click", () => {
  tank.fireDir = "up";
  directionDataEl.textContent = tank.fireDir;
});

btnFDDownEl.addEventListener("click", () => {
  tank.fireDir = "down";
  directionDataEl.textContent = tank.fireDir;
});

btnFDLeftEl.addEventListener("click", () => {
  tank.fireDir = "left";
  directionDataEl.textContent = tank.fireDir;
});

btnFDRightEl.addEventListener("click", () => {
  tank.fireDir = "right";
  directionDataEl.textContent = tank.fireDir;
});

// Event Listener - reset
btnResetEl.addEventListener("click", () => {
  resetGame();
  hideModal(winModalEl);
});

// Event Listener - modal reset
btnModalResetEl.addEventListener("click", () => {
  resetGame();
  hideModal(winModalEl);
});

function resetGame() {
  gameMap.reset();
  tank.reset(gameMap.board);
}

function handleFlagCapture(
  flag: Pos,
  tankCurrentPos: Pos,
  winModalEl: HTMLDivElement
) {
  if (flag.x === tankCurrentPos.x && flag.y === tankCurrentPos.y) {
    console.log("s");
    showModal(winModalEl);
  }
}

function showModal(modal: HTMLDivElement) {
  modal.style.display = "block";
}

function hideModal(modal: HTMLDivElement) {
  modal.style.display = "none";
}

