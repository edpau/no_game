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
gameMap.forEach((row) => {
  const rowEl = document.createElement("div");
  rowEl.classList.add("board__row");

  row.forEach((value) => {
    const squareEl = document.createElement("div");
    const squareClassName = squareClassNames[value] ?? "board__square--error";
    squareEl.classList.add("board__square", squareClassName);

    rowEl.appendChild(squareEl);
  });
  boardEl.appendChild(rowEl);
});
