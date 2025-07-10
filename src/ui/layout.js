import './layout.css';

export function layout(rootElement) {
    rootElement.innerHTML = `
        <div id="start-screen" class="game-screen"></div>
        <div id="gameplay-screen" class="game-screen hidden"></div>
        <div id="game-over-screen" class="game-screen hidden"></div>
    `
    return {
        startScreen: rootElement.querySelector('#start-screen'),
        gameplayScreen: rootElement.querySelector('#gameplay-screen'),
        gameOverScreen: rootElement.querySelector('#game-over-screen'),
    }
}