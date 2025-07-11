import { layout } from "../ui/layout";
import * as StartScreenModule from "../ui/screens/start/startScreen";
import * as GameplayScreenModule from "../ui/screens/gameplay/gameplayScreen";
import { createGameboard } from "../game-logic/gameboard";

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
    let playerBoard = createGameboard(10);
    let computerBoard = createGameboard(10);
    // create the UI elements
    ({ startScreen, gameplayScreen, gameOverScreen } = layout(document.getElementById('app')));
    StartScreenModule.createStartScreen(startScreen, startGame);
    GameplayScreenModule.createGameplayScreen(gameplayScreen, playerBoard, computerBoard);
    currentScreen = startScreen;
}

function startGame() {
    showScreen(gameplayScreen);
}
