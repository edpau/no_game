import type { Pos, TankFireDirection } from "../game/types";
import { delay } from "../utlity/helper";

export default class Bullet {
  #pos: Pos;
  #board: HTMLDivElement[][];
  readonly #DELAY: number = 100;

  constructor(pos: Pos, board: HTMLDivElement[][]) {
    this.#pos = pos;
    this.#board = board;
    this.#board[this.pos.y][this.pos.x].classList.add("bullet");
  }

  // TODO refactor, too many repeat code
  async move(tankFireDirection: TankFireDirection) {
    if (tankFireDirection === "up") {
      if (this.#pos.y - 1 < 0) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      } else if (
        this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
          "board__square--road"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y - 1][this.#pos.x].classList.add("bullet");
        this.#pos = { x: this.#pos.x, y: this.#pos.y - 1 };
        this.move("up");
      } else if (
        this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
          "board__square--wall"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y - 1][this.#pos.x].classList.remove(
          "board__square--wall"
        );
        this.#board[this.#pos.y - 1][this.#pos.x].classList.add(
          "board__square--road"
        );
      } else if (
        this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
          "board__square--boundary"
        ) ||
        this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
          "board__square--flag"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      }
    } else if (tankFireDirection === "down") {
      if (this.#pos.y + 1 >= this.#board.length) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      } else if (
        this.#board[this.#pos.y + 1][this.#pos.x].classList.contains(
          "board__square--road"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y + 1][this.#pos.x].classList.add("bullet");
        this.#pos = { x: this.#pos.x, y: this.#pos.y + 1 };
        this.move("down");
      } else if (
        this.#board[this.#pos.y + 1][this.#pos.x].classList.contains(
          "board__square--wall"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y + 1][this.#pos.x].classList.remove(
          "board__square--wall"
        );
        this.#board[this.#pos.y + 1][this.#pos.x].classList.add(
          "board__square--road"
        );
      } else if (
        this.#board[this.#pos.y + 1][this.#pos.x].classList.contains(
          "board__square--boundary"
        ) ||
        this.#board[this.#pos.y + 1][this.#pos.x].classList.contains(
          "board__square--flag"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      }
    } else if (tankFireDirection === "left") {
      if (this.#pos.x - 1 < 0) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      } else if (
        this.#board[this.#pos.y][this.#pos.x - 1].classList.contains(
          "board__square--road"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y][this.#pos.x - 1].classList.add("bullet");
        this.#pos = { x: this.#pos.x - 1, y: this.#pos.y };
        this.move("left");
      } else if (
        this.#board[this.#pos.y][this.#pos.x - 1].classList.contains(
          "board__square--wall"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y][this.#pos.x - 1].classList.remove(
          "board__square--wall"
        );
        this.#board[this.#pos.y][this.#pos.x - 1].classList.add(
          "board__square--road"
        );
      } else if (
        this.#board[this.#pos.y][this.#pos.x - 1].classList.contains(
          "board__square--boundary"
        ) ||
        this.#board[this.#pos.y][this.#pos.x - 1].classList.contains(
          "board__square--flag"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      }
    } else if (tankFireDirection === "right") {
      if (this.#pos.x + 1 >= this.#board[0].length) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      } else if (
        this.#board[this.#pos.y][this.#pos.x + 1].classList.contains(
          "board__square--road"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y][this.#pos.x + 1].classList.add("bullet");
        this.#pos = { x: this.#pos.x + 1, y: this.#pos.y };
        this.move("right");
      } else if (
        this.#board[this.#pos.y][this.#pos.x + 1].classList.contains(
          "board__square--wall"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        this.#board[this.#pos.y][this.#pos.x + 1].classList.remove(
          "board__square--wall"
        );
        this.#board[this.#pos.y][this.#pos.x + 1].classList.add(
          "board__square--road"
        );
      } else if (
        this.#board[this.#pos.y][this.#pos.x + 1].classList.contains(
          "board__square--boundary"
        ) ||
        this.#board[this.#pos.y][this.#pos.x + 1].classList.contains(
          "board__square--flag"
        )
      ) {
        await delay(this.#DELAY);
        this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
      }
    }
  }

  destory() {
    // create bullet pool array or bullet list
  }

  get pos() {
    return this.#pos;
  }
}
