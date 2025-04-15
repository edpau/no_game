import type { Pos } from "../game/types";
import { delay } from "../utility/helper";
import { Direction } from "../game/types";

export default class Bullet {
  #pos: Pos;
  #board: HTMLDivElement[][];
  readonly #DELAY: number = 100;

  constructor(pos: Pos, board: HTMLDivElement[][]) {
    this.#pos = pos;
    this.#board = board;
  }

  async move(tankFireDirection: Direction) {
    const directions = {
      up: { dX: 0, dY: -1 },
      down: { dX: 0, dY: 1 },
      left: { dX: -1, dY: 0 },
      right: { dX: +1, dY: 0 },
    };

    const offset = directions[tankFireDirection];
    if (!offset) return;

    const newX = this.#pos.x + offset.dX;
    const newY = this.#pos.y + offset.dY;

    const isOutOfBounds =
      newX < 0 ||
      newY < 0 ||
      newX >= this.#board[0].length ||
      newY >= this.#board.length;

    if (isOutOfBounds) {
      await this.unDrawBullet();
      return;
    }

    const nextSquare = this.#board[newY][newX];

    if (this.nextSquareHasClass(nextSquare, "board__square--road")) {
      await this.unDrawBullet();
      await this.moveBullet(newX, newY, tankFireDirection);
    } else if (this.nextSquareHasClass(nextSquare, "board__square--wall")) {
      await this.unDrawBullet();
      this.#board[newY][newX].classList.remove("board__square--wall");
      this.#board[newY][newX].classList.add("board__square--road");
    } else if (
      this.nextSquareHasClass(nextSquare, "board__square--boundary") ||
      this.nextSquareHasClass(nextSquare, "board__square--flag")
    ) {
      this.unDrawBullet();
    }
  }

  private async unDrawBullet(): Promise<void> {
    await delay(this.#DELAY);
    this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
  }

  private async moveBullet(
    newX: number,
    newY: number,
    direction: Direction
  ): Promise<void> {
    this.#board[newY][newX].classList.add("bullet");
    this.#pos = { x: newX, y: newY };
    this.move(direction);
  }
  private nextSquareHasClass(
    nextSquare: HTMLDivElement,
    className: string
  ): boolean {
    return nextSquare.classList.contains(className);
  }
}
