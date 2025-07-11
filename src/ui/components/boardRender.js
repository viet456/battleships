export function renderBoard(containerElement, boardObj) {
    containerElement.innerHTML = '';
    let board = boardObj.getBoard();
    board = board.flat();
    board.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('board-cell');
        containerElement.append(cellDiv);
    });
    return board;
}