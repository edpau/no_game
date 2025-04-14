import type { Pos } from "../game/types";
import { Direction } from "../game/types";
import Bullet from "./Bullets";

const tankDirectionClasses = {
  up: "tank--up",
  down: "tank--down",
  left: "tank--left",
  right: "tank--right",
} as const;

export default class Tank {
  #position: Pos;
  #fireDirection: Direction;
  #board: HTMLDivElement[][];
  #startingPosition: Pos;

  constructor(position: Pos, board: HTMLDivElement[][]) {
    this.#position = position;
    this.#board = board;
    this.#startingPosition = position;
    this.#fireDirection = Direction.UP;

    this.#board[position.y][position.x].classList.add("tank");
  }

  updateFireDirection(fireDirection: Direction) {
    this.undraw(this.position);
    this.#fireDirection = fireDirection;
    this.draw(this.position);
  }

  get position() {
    return this.#position;
  }

  // TODO repeat code moveUp/ moveDown / moveLeft / moveRight make it simple?

  draw(position: Pos) {
    this.#board[position.y][position.x].classList.add(
      "tank",
      tankDirectionClasses[this.#fireDirection]
    );
  }

  undraw(position: Pos) {
    this.#board[position.y][position.x].classList.remove(
      "tank",
      tankDirectionClasses[this.#fireDirection]
    );
  }

  moveUp() {
    const { x, y } = this.#position;

    if (y - 1 < 0 || this.#board[y - 1][x].classList.contains("bullet")) return;

    if (
      this.#board[y - 1][x].classList.contains("board__square--road") ||
      this.#board[y - 1][x].classList.contains("board__square--flag")
    ) {
      this.undraw({ x, y });
      this.draw({ x, y: y - 1 });

      this.#position = { x: x, y: y - 1 };
    }
  }

  moveDown() {
    const { x, y } = this.#position;

    if (
      y + 1 >= this.#board.length ||
      this.#board[y + 1][x].classList.contains("bullet")
    )
      return;

    if (
      this.#board[y + 1][x].classList.contains("board__square--road") ||
      this.#board[y + 1][x].classList.contains("board__square--flag")
    ) {
      this.undraw({ x, y });
      this.draw({ x, y: y + 1 });
      this.#position = { x: x, y: y + 1 };
    }
  }

  moveLeft() {
    const { x, y } = this.#position;

    if (x - 1 < 0 || this.#board[y][x - 1].classList.contains("bullet")) return;

    if (
      this.#board[y][x - 1].classList.contains("board__square--road") ||
      this.#board[y][x - 1].classList.contains("board__square--flag")
    ) {
      this.undraw({ x, y });
      this.draw({ x: x - 1, y });

      this.#position = { x: x - 1, y: y };
    }
  }

  moveRight() {
    const { x, y } = this.#position;

    if (
      x + 1 >= this.#board[0].length ||
      this.#board[y][x + 1].classList.contains("bullet")
    )
      return;

    if (
      this.#board[y][x + 1].classList.contains("board__square--road") ||
      this.#board[y][x + 1].classList.contains("board__square--flag")
    ) {
      this.undraw({ x, y });
      this.draw({ x: x + 1, y });
      this.#position = { x: x + 1, y: y };
    }
  }

  fireBullet() {
    let { x, y } = this.#position;
    const bullet = new Bullet({ x, y: y }, this.#board);
    bullet.move(this.#fireDirection);
  }

  reset(board: HTMLDivElement[][]) {
    this.undraw(this.#position);
    this.#board = board;
    this.#position = this.#startingPosition;
    this.#fireDirection = Direction.UP;
    this.draw(this.#position);
  }
}
