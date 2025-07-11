import { renderBoard } from "../../components/boardRender";

export function createGameplayScreen(containerElement, playerBoard, computerBoard, playGameCallback = null) {
    containerElement.innerHTML = `
        <section class="game-boards">
            <div class='ship-port'></div>
            <div id='player-board'></div>
            <div id='computer-board'></div>
            <button id='play-btn'>Begin play</button>
        </section>
    `;
    const shipPort = containerElement.querySelector('.ship-port');
    const playerBoardContainer = containerElement.querySelector('#player-board');
    const computerBoardContainer = containerElement.querySelector('#computer-board');
    const playBtn = containerElement.querySelector('#play-btn');
    if (playGameCallback) {
        playBtn.addEventListener('click', playGameCallback);
    }
    renderBoard(playerBoardContainer, playerBoard);
    renderBoard(computerBoardContainer, computerBoard);

    return {
        shipPort: shipPort,
        playerBoardContainer: playerBoardContainer,
        computerBoardContainer: computerBoardContainer,
        playBtn: playBtn,
    }
}