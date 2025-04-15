// Game state helpers
import type Tank from "../components/Tank";
import { disableControls, enableControls, showModal } from "../utility/ui";
import type GameMap from "./GameMap";
import { Pos } from "./types";

export function resetGame(
  gameMap: GameMap,
  tank: Tank,
  gameActive: Boolean,
  controlButtons: HTMLButtonElement[]
): void {
  gameMap.reset();
  tank.reset(gameMap.board);
  gameActive = true;
  enableControls(controlButtons);
}

export function handleFlagCapture(
  flag: Pos,
  tankCurrentPos: Pos,
  winModalEl: HTMLDivElement,
  gameActive: boolean,
  controlButtons: HTMLButtonElement[]
): void {
  if (flag.x === tankCurrentPos.x && flag.y === tankCurrentPos.y) {
    showModal(winModalEl);
    gameActive = false;
    disableControls(controlButtons);
  }
}
