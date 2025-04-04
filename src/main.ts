import "./styles/main.scss";

// map
const boardEl = document.querySelector<HTMLDivElement>(".screen__board");

if (!boardEl) {
  throw new Error("Cannot find board element");
}

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
  0: "board__square--floor",
  1: "board__square--boundary",
  2: "board__square--wall",
};

// add gameMap into DOM

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


// start game
// 
let board: HTMLDivElement[][] = createBoard(boardEl);
console.log(board);
console.log((board[8][5].style.backgroundColor = "pink"));