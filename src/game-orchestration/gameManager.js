import { layout } from "../ui/layout";
// switch screen in view
let currentScreen;
function showScreen(screenElement) {
    if (currentScreen) {
        currentScreen.classList.add('hidden');
    }
    screenElement.classList.remove('hidden');
    currentScreen = screenElement;
}

export function initializeGame() {
    // create the UI elements
    const { startScreen, gameplayScreen, gameOverScreen, player1BoardContainer, player2BoardContainer, resetButton } = layout(document.getElementById('app'));
    showScreen(startScreen);
}
