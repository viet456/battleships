export function createGameplayScreen(containerElement, playGameCallback) {
    containerElement.innerHTML = `
        <section class="game-boards">
            <div class='ship-port'></div>
            <div id='player-board'></div>
            <div id='computer-board'></div>
            <button id='play-btn'>Begin play</button>
        </section>
    `;
    const shipPort = containerElement.querySelector('.ship-port');
    const ownBoard = containerElement.querySelector('#player-board');
    const computerBoard = containerElement.querySelector('#computer-board');
    const playBtn = containerElement.querySelector('#play-btn');
    if (playGameCallback) {
        playBtn.addEventListener('click', playGameCallback);
    }
    return {
        shipPort: shipPort,
        ownBoard: ownBoard,
        computerBoard: computerBoard,
        playBtn: playBtn,
    }
}