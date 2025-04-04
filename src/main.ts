import "./styles/main.scss";

const boardEl = document.querySelector<HTMLDivElement>(".screen__board");
const btnUpEl = document.querySelector<HTMLButtonElement>(
  ".controller__btn--up"
);
const btnDownEl = document.querySelector<HTMLButtonElement>(
  ".controller__btn--down"
);
const btnLeftEl = document.querySelector<HTMLButtonElement>(
  ".controller__btn--left"
);
const btnRightEl = document.querySelector<HTMLButtonElement>(
  ".controller__btn--right"
);
const btnFireEl = document.querySelector<HTMLButtonElement>(
  ".controller__btn--fire"
);

if (!boardEl) {
  throw new Error("Cannot find board element");
}

if (!btnUpEl || !btnDownEl || !btnLeftEl || !btnRightEl || !btnFireEl) {
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

// start game
const board: HTMLDivElement[][] = createBoard(boardEl);
let tankCurrentPos = createTank({ x: 5, y: 8 });

// Event Listener
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
  }
});
