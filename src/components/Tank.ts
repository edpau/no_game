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

  get position() {
    return this.#position;
  }

  updateFireDirection(fireDirection: Direction) {
    this.undraw(this.#position);
    this.#fireDirection = fireDirection;
    this.draw(this.#position);
  }

  move(direction: Direction) {
    const directions = {
      up: { dX: 0, dY: -1 },
      down: { dX: 0, dY: 1 },
      left: { dX: -1, dY: 0 },
      right: { dX: +1, dY: 0 },
    };

    const offset = directions[direction];
    if (!offset) return;

    const newX = this.#position.x + offset.dX;
    const newY = this.#position.y + offset.dY;

    const newPosition: Pos = { x: newX, y: newY };

    const isOutOfBounds =
      newX < 0 ||
      newY < 0 ||
      newX >= this.#board[0].length ||
      newY >= this.#board.length;

    if (isOutOfBounds) return;
    const nextSquare: HTMLDivElement = this.#board[newY][newX];
    if (this.nextSquareHasClass(nextSquare, "bullet")) return;

    if (
      this.nextSquareHasClass(nextSquare, "board__square--road") ||
      this.nextSquareHasClass(nextSquare, "board__square--flag")
    ) {
      this.undraw(this.#position);
      this.draw(newPosition);
      this.#position = newPosition;
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

  private nextSquareHasClass(
    nextSquare: HTMLDivElement,
    className: string
  ): boolean {
    return nextSquare.classList.contains(className);
  }

  private draw(position: Pos) {
    this.#board[position.y][position.x].classList.add(
      "tank",
      tankDirectionClasses[this.#fireDirection]
    );
  }

  private undraw(position: Pos) {
    this.#board[position.y][position.x].classList.remove(
      "tank",
      tankDirectionClasses[this.#fireDirection]
    );
  }
}
