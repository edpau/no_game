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
} as const;

export default class GameMap {
  #board: HTMLDivElement[][] = [];

  constructor(boardEl: HTMLDivElement) {
    this.#board = this.create(boardEl);
  }

  create(boardEl: HTMLDivElement): HTMLDivElement[][] {
    const board: HTMLDivElement[][] = [];
    gameMap.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.classList.add("board__row");
      const rowArr: HTMLDivElement[] = [];

      row.forEach((value) => {
        const squareEl = document.createElement("div");
        const squareClassName =
          squareClassNames[value] ?? "board__square--error";
        squareEl.classList.add("board__square", squareClassName);

        rowEl.appendChild(squareEl);
        rowArr.push(squareEl);
      });
      boardEl.appendChild(rowEl);
      board.push(rowArr);
    });
    return board;
  }

  get board(){
    return this.#board
  }
}


