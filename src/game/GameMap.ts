import { Pos } from "./types";

const gameMap: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 2, 2, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// throw error if there is more than one 3 in the gameMap

const squareClassNames: Record<number, string> = {
  0: "board__square--road",
  1: "board__square--boundary",
  2: "board__square--wall",
  3: "board__square--flag",
};

export default class GameMap {
  #board: HTMLDivElement[][] = [];
  #boardEl: HTMLDivElement;
  #flag: Pos;

  constructor(boardEl: HTMLDivElement) {
    this.#boardEl = boardEl;

    try {
      this.#flag = this.flagPos(gameMap);
    } catch (error) {
      // TODO take away this line in production
      console.error("Map initialization failed:", error);

      const errorMsg = document.createElement("div");
      if (error instanceof Error) {
        errorMsg.textContent = error.message;
        errorMsg.style.color = "red";
        boardEl.appendChild(errorMsg);
      }

      throw error;
    }
    this.#board = this.create(this.#boardEl);
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

  get board() {
    return this.#board;
  }

  get flag() {
    return this.#flag;
  }

  reset() {
    this.#boardEl.innerHTML = "";
    this.#board = this.create(this.#boardEl);
  }

  flagPos(gameMap: number[][]): Pos {
    let flagCount = 0;
    let pos: Pos | null = null;

    for (let y = 0; y < gameMap.length; y++) {
      const x = gameMap[y].indexOf(3);
      if (x > -1) {
        flagCount++;
        if (flagCount > 1) {
          throw new Error("gameMap has more than one flag");
        }
        pos = { x, y };
      }
    }
    if (flagCount === 0 || pos === null) {
      throw new Error("gameMap does not have a flag");
    }
    return pos;
  }
}
