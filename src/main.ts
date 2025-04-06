import "./styles/main.scss";

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

// map
const gameMap: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const squareClassNames: Record<number, string> = {
  0: "board__square--road",
  1: "board__square--boundary",
  2: "board__square--wall",
};

// add gameMap into DOM function

function createBoard(boardEl: HTMLDivElement): HTMLDivElement[][] {
  const board: HTMLDivElement[][] = [];
  gameMap.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("board__row");
    const rowArr: HTMLDivElement[] = [];

    row.forEach((value) => {
      const squareEl = document.createElement("div");
      const squareClassName = squareClassNames[value] ?? "board__square--error";
      squareEl.classList.add("board__square", squareClassName);

      rowEl.appendChild(squareEl);
      rowArr.push(squareEl);
    });
    boardEl.appendChild(rowEl);
    board.push(rowArr);
  });
  return board;
}

// tank function

// TODO move type to separate file?
type TankPos = { x: number; y: number };
type TankFireDirection = "up" | "down" | "left" | "right";

function createTank(position: TankPos): {
  x: number;
  y: number;
} {
  board[position.y][position.x].classList.add("tank");
  return position;
}

// TODO repeat code moveUp/ moveDown / moveLeft / moveRight make it simple?

function moveUp(tankPos: TankPos): TankPos {
  const { x, y } = tankPos;

  if (y - 1 < 0) return tankPos;

  if (board[y - 1][x].classList.contains("board__square--road")) {
    board[y][x].classList.remove("tank");
    board[y - 1][x].classList.add("tank");
    return { x: x, y: y - 1 };
  }
  return tankPos;
}

function moveDown(tankPos: TankPos): TankPos {
  const { x, y } = tankPos;

  if (y + 1 >= board.length) return tankPos;

  if (board[y + 1][x].classList.contains("board__square--road")) {
    board[y][x].classList.remove("tank");
    board[y + 1][x].classList.add("tank");
    return { x: x, y: y + 1 };
  }
  return tankPos;
}

function moveLeft(tankPos: TankPos): TankPos {
  const { x, y } = tankPos;

  if (x - 1 < 0) return tankPos;

  if (board[y][x - 1].classList.contains("board__square--road")) {
    board[y][x].classList.remove("tank");
    board[y][x - 1].classList.add("tank");
    return { x: x - 1, y: y };
  }
  return tankPos;
}

function moveRight(tankPos: TankPos): TankPos {
  const { x, y } = tankPos;

  if (x + 1 >= board[0].length) return tankPos;

  if (board[y][x + 1].classList.contains("board__square--road")) {
    board[y][x].classList.remove("tank");
    board[y][x + 1].classList.add("tank");
    return { x: x + 1, y: y };
  }
  return tankPos;
}

function fireBullet(tankPos: TankPos, tankFireDirection: TankFireDirection) {
  let { x, y } = tankPos;

  // TODO refactor this, code repeat
  if (
    tankFireDirection === "up" &&
    board[y - 1][x].classList.contains("board__square--road")
  ) {
    const bullet = new Bullet({ x, y: y - 1 });
    bullet.create();
  } else if (
    tankFireDirection === "down" &&
    board[y + 1][x].classList.contains("board__square--road")
  ) {
    const bullet = new Bullet({ x, y: y + 1 });
    bullet.create();
  } else if (
    tankFireDirection === "left" &&
    board[y][x - 1].classList.contains("board__square--road")
  ) {
    const bullet = new Bullet({ x: x - 1, y });
    bullet.create();
  } else if (
    tankFireDirection === "right" &&
    board[y][x + 1].classList.contains("board__square--road")
  ) {
    const bullet = new Bullet({ x: x + 1, y });
    bullet.create();
  }
}

// Bullet

// Todo type bulletPos and TankPos, make it in general Pos?

type Pos = { x: number; y: number };

class Bullet {
  #pos: Pos;
  constructor(pos: Pos) {
    this.#pos = pos;
  }

  create() {
    board[this.pos.y][this.pos.x].classList.add("bullet");
  }

  move() {}

  destory() {}

  get pos() {
    return this.#pos;
  }
}



// start game
const board: HTMLDivElement[][] = createBoard(boardEl);
let tankCurrentPos = createTank({ x: 5, y: 8 });
let tankFireDir: TankFireDirection = "up";

// TODO game data, take away later
const directionDataEl = document.querySelector("#fireD");
if (!directionDataEl) {
  throw new Error("game data element not found");
}

// Event Listener - direction btn
btnUpEl.addEventListener("click", () => {
  tankCurrentPos = moveUp(tankCurrentPos);
});

btnDownEl.addEventListener("click", () => {
  tankCurrentPos = moveDown(tankCurrentPos);
});

btnLeftEl.addEventListener("click", () => {
  tankCurrentPos = moveLeft(tankCurrentPos);
});

btnRightEl.addEventListener("click", () => {
  tankCurrentPos = moveRight(tankCurrentPos);
});

btnFireEl.addEventListener("click", () => {
  fireBullet(tankCurrentPos, tankFireDir);
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.code) {
    case "KeyW":
      tankCurrentPos = moveUp(tankCurrentPos);
      break;
    case "KeyS":
      tankCurrentPos = moveDown(tankCurrentPos);
      break;
    case "KeyA":
      tankCurrentPos = moveLeft(tankCurrentPos);
      break;
    case "KeyD":
      tankCurrentPos = moveRight(tankCurrentPos);
      break;
    case "KeyF":
      fireBullet(tankCurrentPos, tankFireDir);
      break;

    // TODO need to make a function to make it simple and it need to be reuse for other tank
    case "KeyI":
      tankFireDir = "up";
      directionDataEl.textContent = tankFireDir;
      break;
    case "KeyK":
      tankFireDir = "down";
      directionDataEl.textContent = tankFireDir;
      break;
    case "KeyJ":
      tankFireDir = "left";
      directionDataEl.textContent = tankFireDir;
      break;
    case "KeyL":
      tankFireDir = "right";
      directionDataEl.textContent = tankFireDir;
      break;
  }
});

// Event Listener - fire direction
// TODO need to make a function to make it simple and it need to be reuse for other tank
btnFDUpEl.addEventListener("click", () => {
  tankFireDir = "up";
  directionDataEl.textContent = tankFireDir;
});

btnFDDownEl.addEventListener("click", () => {
  tankFireDir = "down";
  directionDataEl.textContent = tankFireDir;
});

btnFDLeftEl.addEventListener("click", () => {
  tankFireDir = "left";
  directionDataEl.textContent = tankFireDir;
});

btnFDRightEl.addEventListener("click", () => {
  tankFireDir = "right";
  directionDataEl.textContent = tankFireDir;
});
