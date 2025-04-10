import type { Pos, TankFireDirection } from "../game/types";
import Bullet from "./Bullets";

export default class Tank {
  #position: Pos;
  #fireDirection: TankFireDirection = "up";
  #board: HTMLDivElement[][];
  #startingPosition: Pos;

  constructor(position: Pos, board: HTMLDivElement[][]) {
    this.#position = position;
    this.#board = board;
    this.#startingPosition = position;

    this.#board[position.y][position.x].classList.add("tank");
  }

  get position() {
    return this.#position;
  }

  get fireDir() {
    return this.#fireDirection;
  }

  set fireDir(fireDir: TankFireDirection) {
    this.#fireDirection = fireDir;
  }

  // TODO repeat code moveUp/ moveDown / moveLeft / moveRight make it simple?

  draw(position: Pos) {
    this.#board[position.y][position.x].classList.add("tank");
  }

  undraw(position: Pos) {
    this.#board[position.y][position.x].classList.remove("tank");
  }

  moveUp() {
    const { x, y } = this.#position;

    if (y - 1 < 0 || this.#board[y - 1][x].classList.contains("bullet")) return;

    if (this.#board[y - 1][x].classList.contains("board__square--road")) {
      this.#board[y][x].classList.remove("tank");
      this.#board[y - 1][x].classList.add("tank");
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

    if (this.#board[y + 1][x].classList.contains("board__square--road")) {
      this.#board[y][x].classList.remove("tank");
      this.#board[y + 1][x].classList.add("tank");
      this.#position = { x: x, y: y + 1 };
    }
  }

  moveLeft() {
    const { x, y } = this.#position;

    if (x - 1 < 0 || this.#board[y][x - 1].classList.contains("bullet")) return;

    if (this.#board[y][x - 1].classList.contains("board__square--road")) {
      this.#board[y][x].classList.remove("tank");
      this.#board[y][x - 1].classList.add("tank");
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

    if (this.#board[y][x + 1].classList.contains("board__square--road")) {
      this.#board[y][x].classList.remove("tank");
      this.#board[y][x + 1].classList.add("tank");
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
    this.#board= board;
    this.#position = this.#startingPosition;
    this.draw(this.#position);
  }
}
