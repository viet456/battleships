import './layout.css';

export function layout(rootElement) {
    rootElement.innerHTML = `
        <div id="start-screen" class="game-screen">
            <button id="computer-btn">Play Computer</button>
            <button id="local-btn">Play Local</button>
        </div>
        <div id="gameplay-screen" class="game-screen hidden">
            <div id="player1-board-container"></div>
            <div id="player2-board-container"></div>
            <button id="reset-btn">Reset</button>
            <button id="start-btn">Start</button>
        </div>
        <div id="game-over-screen" class="game-screen hidden"></div>
    `
    return {
        startScreen: rootElement.querySelector('#start-screen'),
        gameplayScreen: rootElement.querySelector('#gameplay-screen'),
        gameOverScreen: rootElement.querySelector('#game-over-screen'),
        player1BoardContainer: rootElement.querySelector('#player1-board-container'),
        player2BoardContainer: rootElement.querySelector('#player2-board-container'),
        resetButton: rootElement.querySelector('#reset-btn'),
        startButton: rootElement.querySelector('#start-btn'),
    }
}