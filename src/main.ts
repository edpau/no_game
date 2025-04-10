import "./styles/main.scss";

import Tank from "./components/Tank";

import GameMap from "./game/GameMap";

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

if (!boardEl) {
  throw new Error("Cannot find board element");
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
  !btnFDRightEl
) {
  throw new Error("Cannot find controller elements");
}

// start game
const gameMap= new GameMap(boardEl);
const tank = new Tank({ x: 5, y: 8 }, gameMap.board);

// TODO game data, take away later
const directionDataEl = document.querySelector("#fireD");
if (!directionDataEl) {
  throw new Error("game data element not found");
}

// Event Listener - direction btn
btnUpEl.addEventListener("click", () => {
  tank.moveUp();
});

btnDownEl.addEventListener("click", () => {
  tank.moveDown();
});

btnLeftEl.addEventListener("click", () => {
  tank.moveLeft();
});

btnRightEl.addEventListener("click", () => {
  tank.moveRight();
});

btnFireEl.addEventListener("click", () => {
  tank.fireBullet();
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      tank.moveUp();
      break;
    case "KeyS":
      tank.moveDown();
      break;
    case "KeyA":
      tank.moveLeft();
      break;
    case "KeyD":
      tank.moveRight();
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
