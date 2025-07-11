import './boardRender.css'

export function renderBoard(containerElement, boardObj) {
    containerElement.innerHTML = '';
    let board = boardObj.getBoard();
    const boardWidth = boardObj.getBoardSize();
    containerElement.classList.add('game-board');
    containerElement.style.setProperty('--grid-cols', boardWidth);
    containerElement.style.setProperty('--grid-rows', boardWidth);
    board = board.flat();
    board.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('board-cell');
        containerElement.append(cellDiv);
    });
    return board;
}