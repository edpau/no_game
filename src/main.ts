import "./styles/main.scss";

import Tank from "./components/Tank";
import GameMap from "./game/GameMap";
import { Pos } from "./game/types";

import { Direction } from "./game/types";

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
let gameActive: Boolean = true;

// TODO refactor, repeat code
// Event Listener - direction btn
btnUpEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.move(Direction.UP);
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnDownEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.move(Direction.DOWN);
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnLeftEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.move(Direction.LEFT);
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnRightEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.move(Direction.RIGHT);
  handleFlagCapture(flag, tank.position, winModalEl);
});

btnFireEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.fireBullet();
});

// TODO refactor, repeat code
window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      if (!gameActive) return;
      tank.move(Direction.UP);
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyS":
      if (!gameActive) return;
      tank.move(Direction.DOWN);
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyA":
      if (!gameActive) return;
      tank.move(Direction.LEFT);
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyD":
      if (!gameActive) return;
      tank.move(Direction.RIGHT);
      handleFlagCapture(flag, tank.position, winModalEl);
      break;
    case "KeyF":
      if (!gameActive) return;
      tank.fireBullet();
      break;

    // TODO need to make a function to make it simple and it need to be reuse for other tank
    case "KeyI":
      if (!gameActive) return;
      tank.updateFireDirection(Direction.UP);
      break;
    case "KeyK":
      if (!gameActive) return;
      tank.updateFireDirection(Direction.DOWN);
      break;
    case "KeyJ":
      if (!gameActive) return;
      tank.updateFireDirection(Direction.LEFT);
      break;
    case "KeyL":
      if (!gameActive) return;
      tank.updateFireDirection(Direction.RIGHT);
      break;
  }
});

// Event Listener - fire direction
// TODO need to make a function to make it simple and it need to be reuse for other tank
btnFDUpEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.updateFireDirection(Direction.UP);
});

btnFDDownEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.updateFireDirection(Direction.DOWN);
});

btnFDLeftEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.updateFireDirection(Direction.LEFT);
});

btnFDRightEl.addEventListener("click", () => {
  if (!gameActive) return;
  tank.updateFireDirection(Direction.RIGHT);
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

// Game state helpers

function resetGame(): void {
  gameMap.reset();
  tank.reset(gameMap.board);
  gameActive = true;
  enableControls();
}

function handleFlagCapture(
  flag: Pos,
  tankCurrentPos: Pos,
  winModalEl: HTMLDivElement
): void {
  if (flag.x === tankCurrentPos.x && flag.y === tankCurrentPos.y) {
    showModal(winModalEl);
    gameActive = false;
    disableControls();
  }
}

// UI control helpers

function showModal(modal: HTMLDivElement): void {
  modal.style.display = "flex";
}

function hideModal(modal: HTMLDivElement): void {
  modal.style.display = "none";
}

function disableControls(): void {
  controlButtons.forEach((btn) => (btn.disabled = true));
}

function enableControls(): void {
  controlButtons.forEach((btn) => (btn.disabled = false));
}
