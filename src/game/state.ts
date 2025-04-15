// ==========================
// Game state helpers
// ==========================
import type Tank from "../components/Tank";
import { disableControls, enableControls, showModal } from "../utility/ui";
import type GameMap from "./GameMap";
import { Pos } from "./types";

export function resetGame(
  gameMap: GameMap,
  tank: Tank,
  gameState: { active: boolean },
  controlButtons: HTMLButtonElement[]
): void {
  gameMap.reset();
  tank.reset(gameMap.board);
  gameState.active = true;
  enableControls(controlButtons);
}

export function handleFlagCapture(
  flag: Pos,
  tankCurrentPos: Pos,
  winModalEl: HTMLDivElement,
  gameState: { active: boolean },
  controlButtons: HTMLButtonElement[]
): void {
  if (flag.x === tankCurrentPos.x && flag.y === tankCurrentPos.y) {
    showModal(winModalEl);
    gameState.active = false;
    disableControls(controlButtons);
  }
}
