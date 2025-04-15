import "./styles/main.scss";
import Tank from "./components/Tank";
import GameMap from "./game/GameMap";
import { Pos } from "./game/types";
import { Direction } from "./game/types";
import { hideModal } from "./utility/ui";
import { handleFlagCapture, resetGame } from "./game/state";

// ==========================
// DOM Element References
// ==========================
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

// ==========================
// Element Validations
// ==========================
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

// ==========================
// Control Buttons Group
// ==========================

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

// ==========================
// Game Initialization
// ==========================
let gameMap = new GameMap(boardEl);
const tank = new Tank({ x: 5, y: 8 }, gameMap.board);
const flag: Pos = gameMap.flag;
let gameState = { active: true };

// ==========================
// Controller Handlers
// ==========================
function handleTankMove(
  direction: Direction,
  tank: Tank,
  gameState: { active: boolean },
  flag: Pos,
  winModalEl: HTMLDivElement,
  controlButtons: HTMLButtonElement[]
) {
  if (!gameState.active) return;
  tank.move(direction);
  handleFlagCapture(flag, tank.position, winModalEl, gameState, controlButtons);
}

function handleTankFire(tank: Tank, gameState: { active: boolean }) {
  if (!gameState.active) return;
  tank.fireBullet();
}

function handleTankFireDirection(
  direction: Direction,
  tank: Tank,
  gameState: { active: boolean }
) {
  if (!gameState.active) return;
  tank.updateFireDirection(direction);
}

// ==============================
// Event Listeners - Touch Button
// =============================
btnUpEl.addEventListener("click", () => {
  handleTankMove(
    Direction.UP,
    tank,
    gameState,
    flag,
    winModalEl,
    controlButtons
  );
});

btnDownEl.addEventListener("click", () => {
  handleTankMove(
    Direction.DOWN,
    tank,
    gameState,
    flag,
    winModalEl,
    controlButtons
  );
});

btnLeftEl.addEventListener("click", () => {
  handleTankMove(
    Direction.LEFT,
    tank,
    gameState,
    flag,
    winModalEl,
    controlButtons
  );
});

btnRightEl.addEventListener("click", () => {
  handleTankMove(
    Direction.RIGHT,
    tank,
    gameState,
    flag,
    winModalEl,
    controlButtons
  );
});

btnFireEl.addEventListener("click", () => {
  handleTankFire(tank, gameState);
});

btnFDUpEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.UP, tank, gameState);
});

btnFDDownEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.DOWN, tank, gameState);
});

btnFDLeftEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.LEFT, tank, gameState);
});

btnFDRightEl.addEventListener("click", () => {
  handleTankFireDirection(Direction.RIGHT, tank, gameState);
});

// ==========================
// Event Listeners - Keyboard
// ==========================
window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      handleTankMove(
        Direction.UP,
        tank,
        gameState,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyS":
      handleTankMove(
        Direction.DOWN,
        tank,
        gameState,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyA":
      handleTankMove(
        Direction.LEFT,
        tank,
        gameState,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyD":
      handleTankMove(
        Direction.RIGHT,
        tank,
        gameState,
        flag,
        winModalEl,
        controlButtons
      );
      break;
    case "KeyF":
      handleTankFire(tank, gameState);
      break;
    case "KeyI":
      handleTankFireDirection(Direction.UP, tank, gameState);
      break;
    case "KeyK":
      handleTankFireDirection(Direction.DOWN, tank, gameState);
      break;
    case "KeyJ":
      handleTankFireDirection(Direction.LEFT, tank, gameState);
      break;
    case "KeyL":
      handleTankFireDirection(Direction.RIGHT, tank, gameState);
      break;
  }
});

// ==========================
// Event Listeners - Reset
// ==========================
btnResetEl.addEventListener("click", () => {
  resetGame(gameMap, tank, gameState, controlButtons);
  hideModal(winModalEl);
});

btnModalResetEl.addEventListener("click", () => {
  resetGame(gameMap, tank, gameState, controlButtons);
  hideModal(winModalEl);
});
