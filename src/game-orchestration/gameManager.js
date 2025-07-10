import { layout } from "../ui/layout";
import * as StartScreenModule from "../ui/screens/start/startScreen";

let startScreen;
let gameplayScreen;
let gameOverScreen;
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
    const { startScreen, gameplayScreen, gameOverScreen } = layout(document.getElementById('app'));
    StartScreenModule.createStartScreen(startScreen, startGame);
    currentScreen = startScreen;
}

function startGame() {
    showScreen(gameplayScreen);
}
