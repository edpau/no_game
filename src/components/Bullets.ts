import type { Pos, TankFireDirection} from "../game/types"
import {delay} from "../utlity/helper"

export default class Bullet {
    #pos: Pos;
    #board:HTMLDivElement[][]
    constructor(pos: Pos, board: HTMLDivElement[][] ) {
      this.#pos = pos;
      this.#board = board;
    }
  
    create() {
      this.#board[this.pos.y][this.pos.x].classList.add("bullet");
      // bulletPool.push(this)
    }
  
    async move(tankFireDirection: TankFireDirection) {
      // let { x, y } = this.pos;
      if (tankFireDirection === "up") {
        if (this.#pos.y - 1 < 0) {
          this.#board[this.#pos.y][this.#pos.x].classList.add("bullet");
          await delay(20);
          this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        } else if (
          this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
            "board__square--road"
          )
        ) {
          await delay(20);
          this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
          this.#board[this.#pos.y - 1][this.#pos.x].classList.add("bullet");
          this.#pos = { x: this.#pos.x, y: this.#pos.y - 1 };
          this.move("up");
        } else if (
          this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
            "board__square--wall"
          )
        ) {
          this.#board[this.#pos.y - 1][this.#pos.x].classList.remove(
            "board__square--wall"
          );
          this.#board[this.#pos.y - 1][this.#pos.x].classList.add(
            "board__square--road"
          );
          this.#board[this.#pos.y][this.#pos.x].classList.remove("bullet");
        } else if (
          this.#board[this.#pos.y - 1][this.#pos.x].classList.contains(
            "board__square--boundary"
          )
        ) {
          this.#board[this.#pos.y][this.#pos.x].classList.add("bullet");
          await delay(20);
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
  