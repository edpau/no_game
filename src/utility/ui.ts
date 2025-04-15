// ==========================
// UI control helpers
// ==========================
export function showModal(modal: HTMLDivElement): void {
  modal.style.display = "flex";
}

export function hideModal(modal: HTMLDivElement): void {
  modal.style.display = "none";
}

export function disableControls(controlButtons: HTMLButtonElement[]): void {
  controlButtons.forEach((btn) => (btn.disabled = true));
}

export function enableControls(controlButtons: HTMLButtonElement[]): void {
  controlButtons.forEach((btn) => (btn.disabled = false));
}
