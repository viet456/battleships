export function createGameboard(size = 10) {
    // 10 x 10 gameboard
    const board = new Array(size).fill(null).map(() => new Array(size).fill(null));
    const ships = [];
    const boardSize = board.length;
    const attackedCoordinates = new Set();
    return {
        getBoard: () => board,
        getShips: () => [...ships],
        getBoardSize: () => boardSize,
        getAttackedCoordinates: () => [...attackedCoordinates],
        placeShip: function (ship, row, col, orientation) {
            if (!ship || typeof ship.getSize !== 'function' || typeof row !== 'number' || typeof col !== 'number' || !['h', 'v'].includes(orientation)) {
                throw new Error("Invalid arguments for placeShip");
            }
            ships.push(ship);
            let shipSize = ship.getSize();
            // check placement validity (bounds and overlap)            
            for (let i = 0; i < shipSize; i++) {
                let currentRow = row;
                let currentCol = col;
                if (orientation === 'h') {
                    currentCol += i;
                } else { // 'v'
                    currentRow += i;
                }

                // Check bounds:
                if (currentRow < 0 || currentRow >= boardSize || currentCol < 0 || currentCol >= boardSize) {
                    throw new Error(`Ship placement out of bounds at (${currentRow}, ${currentCol}).`);
                }
                // Check overlap:
                if (board[currentRow][currentCol] !== null) {
                    throw new Error(`Ship placement overlaps existing ship at (${currentRow}, ${currentCol}).`);
                }
            }
            if (orientation === 'h') {
                for (let i = 0; i < shipSize; i++) {
                    board[row][col + i] = { ship: ship, segmentIndex: i };
                }
            } else if (orientation === 'v') {
                for (let i = 0; i < shipSize; i++) {
                    board[row + i][col] = { ship: ship, segmentIndex: i };
                }
            }
        },
        receiveAttack: function (row, col) {
            if (row < 0 || row > boardSize || col < 0 || col > boardSize) {
                throw new Error('Cannot attack outside of grid')
            }
            const cell = board[row][col];
            const coordKey = `${row}, ${col}`;
            if (attackedCoordinates.has(coordKey)) {
                throw new Error('Cannot attack same location');
            }
            attackedCoordinates.add(coordKey);
            if (cell && typeof cell === 'object' && cell.ship) {
                const ship = cell.ship;
                const segmentIndex = cell.segmentIndex
                ship.hit(segmentIndex);
                return { status: 'hit', isShipSunk: ship.isSunk() };
            } else {
                board[row][col] = 'miss';
                return { status: 'miss' };
            }
        },
        allShipsSunk: function () {
            // if ships not yet placed
            if (ships.length === 0) {
                return false;
            }
            // returns boolean True/False
            return ships.every(ship => ship.isSunk());
        }
    }
}