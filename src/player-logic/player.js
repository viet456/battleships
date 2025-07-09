// import { createGameboard } from "../game-logic/gameboard";

export function createPlayer(ownBoard, opponentBoard, type = 'human') {
    return {
        ownBoard: ownBoard,
        opponentBoard: opponentBoard,
        attack: function (row, col) {
            return opponentBoard.receiveAttack(row, col);
        },
        randomAttack: function () {
            let hitStatus;
            do {
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                hitStatus = opponentBoard.receiveAttack(row, col);
            } while (hitStatus.status === 'out_of_bounds' || hitStatus.status === 'duplicate');
            return hitStatus;
        },
        hasLost: function () {
            return ownBoard.allShipsSunk();
        },
        hasWon: function () {
            return opponentBoard.allShipsSunk();
        }
    }
}