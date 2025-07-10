import './startScreen.css';

export function createStartScreen(containerElement, startGameCallback) {
    containerElement.innerHTML = `
        <div class="start-screen-content">
            <h1>Battleship</h1>
            <p class="tagline">Prepare for battle!</p>
            <button id="start-btn" class="start-btn">Start Game</button>
        </div>
    `;
    const startButtonRef = containerElement.querySelector('#start-btn');
    if (startGameCallback) {
        startButtonRef.addEventListener('click', startGameCallback);
    }
    return {
        element: containerElement,
        startButton: startButtonRef,
    }
}