import { renderBoard } from "../../components/boardRender";
import './gameplayScreen.css';

export function createGameplayScreen(containerElement, playerBoard, computerBoard, playGameCallback = null) {
    containerElement.innerHTML = `
        <div class='gameplay-screen-content'>
            <div class='ship-port'></div>
            <section class="game-boards">
                <div id='player-board'></div>
                <div id='computer-board' class='hidden'></div>
            </section>
            <button id='play-btn'>Begin play</button>
        </div>
    `;
    const shipPort = containerElement.querySelector('.ship-port');
    const playerBoardContainer = containerElement.querySelector('#player-board');
    const computerBoardContainer = containerElement.querySelector('#computer-board');
    const playBtn = containerElement.querySelector('#play-btn');
    if (playGameCallback) {
        computerBoardContainer.classList.remove('hidden');
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