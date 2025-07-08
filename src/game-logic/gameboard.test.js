import { test, expect, describe, beforeAll, beforeEach } from 'vitest';
import { createGameboard } from './gameboard';
import { createShip } from './ship'

describe('createGameboard', () => {
    let gameboard;
    let board;
    let boardSize;
    let ship;
    let shipSize;
    let receiveAttack;
    beforeEach(() => {
        gameboard = createGameboard(10);
        board = gameboard.getBoard();
        boardSize = gameboard.getBoardSize();
        ship = createShip(3);
        shipSize = ship.getSize();
    })
    test('Board is 10 wide', () => {
        expect(board.length).toBe(10);
    })
    test('Board is 10 deep', () => {
        board.forEach((row) => {
            expect(row.length).toBe(10);
        })
    })

    describe('placeShip() method', () => {
        test('Throw an error for non-numeric row', () => {
            expect(() => gameboard.placeShip(ship, 'a', 1, 'h'))
                .toThrow("Invalid arguments for placeShip");
        })
        test('Throw an error for non-numeric column', () => {
            expect(() => gameboard.placeShip(ship, 1, 'a', 'h'))
                .toThrow("Invalid arguments for placeShip");
        })
        test('Throw an error for invalid orientation', () => {
            expect(() => gameboard.placeShip(ship, 1, 1, 'diagonal'))
                .toThrow("Invalid arguments for placeShip");
        })
        test('Ship can be placed horizontally', () => {
            let col = 1;
            let row = 1;
            gameboard.placeShip(ship, row, col, 'h');
            for (let i = 0; i < shipSize; i++) {
                expect(board[row][col + i]).toEqual({ ship: ship, segmentIndex: i });
            }
        })
        test('Ship can be placed vertically', () => {
            let col = 1;
            let row = 1;
            gameboard.placeShip(ship, row, col, 'v');
            for (let i = 0; i < shipSize; i++) {
                expect(board[row + i][col]).toEqual({ ship: ship, segmentIndex: i });
            }
        })
        test('Throw an error if ship placement is out of bounds horizontally', () => {
            // Place ship starting at col 8, size 3. (8,9,10) -> 10 is out of bounds (0-9)
            expect(() => gameboard.placeShip(ship, 0, boardSize - shipSize + 1, 'h'))
                .toThrow(`Ship placement out of bounds at (0, ${boardSize}).`);
        })
        test('Throw an error if ship placement is out of bounds vertically', () => {
            // Place ship starting at row 8, size 3. (8,9,10) -> 10 is out of bounds (0-9)
            expect(() => gameboard.placeShip(ship, boardSize - shipSize + 1, 0, 'v'))
                .toThrow(`Ship placement out of bounds at (${boardSize}, 0).`);
        })
        test('Throw an error if ship overlaps another ship', () => {
            const ship1 = createShip(3);
            const ship2 = createShip(2);
            let row = 0;
            let col = 1;
            gameboard.placeShip(ship1, row, 0, 'h');
            // Attempt to place second ship overlapping the first
            expect(() => gameboard.placeShip(ship2, row, col, 'h')) // Overlaps ship1 at (0,1)
                .toThrow(`Ship placement overlaps existing ship at (${row}, ${col}).`);
        })
        test('Placed ships added to tracker', () => {
            gameboard.placeShip(ship, 1, 1, 'h');
            expect(gameboard.getShips()).toEqual([ship]);
            expect(gameboard.getShips().length).toBe(1);
        })
    })

    describe('receiveAttack() method', () => {
        test('Ship is hit on attack', () => {
            let col = 1;
            let row = 1;
            gameboard.placeShip(ship, row, col, 'h');
            expect(gameboard.receiveAttack(row, col)).toEqual({ status: 'hit', isShipSunk: false });
        })
        test('Ship can be destroyed', () => {
            gameboard.placeShip(ship, 1, 1, 'h');
            gameboard.receiveAttack(1, 1);
            gameboard.receiveAttack(1, 2);
            expect(gameboard.receiveAttack(1, 3)).toEqual({ status: 'hit', isShipSunk: true });
        })
        test('Attack misses', () => {
            expect(gameboard.receiveAttack(5, 5)).toEqual({ status: 'miss' });
        })
        test('Missed attack is marked on board', () => {
            gameboard.receiveAttack(5, 5)
            expect(board[5][5]).toBe('miss');
        })
        test('Block duplicate attack locations', () => {
            gameboard.receiveAttack(1, 1);
            expect(() => gameboard.receiveAttack(1, 1)).toThrow('Cannot attack same location');
        })
        test('Prevent attacks outside of grid', () => {
            expect(() => gameboard.receiveAttack(-1, 1)).toThrow('Cannot attack outside of grid');
        })
    })


    describe('allShipsSunk() method', () => {
        test('Returns false when no ships are sunk', () => {
            expect(gameboard.allShipsSunk()).toBe(false);
        })
        test('Return false if some but not all ships are sunk', () => {
            const ship1 = createShip(1);
            const ship2 = createShip(2);
            gameboard.placeShip(ship1, 0, 0, 'h');
            gameboard.placeShip(ship2, 2, 0, 'h');
            // Sink ship1
            gameboard.receiveAttack(0, 0);
            expect(ship1.isSunk()).toBe(true);
            // Verify ship2 is not sunk
            expect(ship2.isSunk()).toBe(false);
            // Expect allShipsSunk to be false because ship2 is not sunk
            expect(gameboard.allShipsSunk()).toBe(false);
        })
        test('Notify when all ships are sunken', () => {
            gameboard.placeShip(ship, 1, 1, 'h');
            gameboard.receiveAttack(1, 1);
            gameboard.receiveAttack(1, 2);
            gameboard.receiveAttack(1, 3);
            expect(gameboard.allShipsSunk()).toBe(true);
        })
    })
})