import { test, expect, describe, beforeAll, beforeEach, vi, afterEach } from 'vitest';
import { createPlayer } from './player';
import { createGameboard } from '../game-logic/gameboard';
import { createShip } from '../game-logic/ship';

describe('createPlayer', () => {
    let player1;
    let player1Board;
    let opponent;
    let opponentBoard;
    let ship;
    beforeEach(() => {
        player1Board = createGameboard(10);
        opponentBoard = createGameboard(10);
        player1 = createPlayer(player1Board, opponentBoard, 'human');
        opponent = createPlayer(opponentBoard, player1Board, 'human');
        ship = createShip(3);
    })
    test('Player has their own board', () => {
        expect(player1.ownBoard).toBe(player1Board);
    })
    test('Player sees opponent board', () => {
        expect(player1.opponentBoard).toBe(opponentBoard);
    })

    describe('attack() method', () => {
        let receiveAttackSpy;
        beforeEach(() => {
            receiveAttackSpy = vi.spyOn(opponentBoard, 'receiveAttack');
        })
        afterEach(() => {
            receiveAttackSpy.mockRestore();
        })
        test('Player.attack() is delegated to opponentBoard.receiveAttack()', () => {
            player1.attack(1, 1);
            // test the callee function Player.ownBoard.receiveAttack
            // from caller Player.attack
            expect(receiveAttackSpy).toHaveBeenCalledWith(1, 1);
            expect(receiveAttackSpy).toHaveBeenCalledTimes(1);
        })
        test('Return "hit" status from the opponent board', () => {
            receiveAttackSpy.mockReturnValueOnce({ status: 'hit', isShipSunk: false });
            const result = player1.attack(0, 0);
            expect(result).toEqual({ status: 'hit', isShipSunk: false })
        })
        test('Return "miss" status from the opponent board', () => {
            receiveAttackSpy.mockReturnValueOnce({ status: 'miss' });
            const result = player1.attack(0, 0);
            expect(result).toEqual({ status: 'miss' });
        })
        test('Should throw duplicate attack Error', () => {
            const row = 1;
            const col = 1;
            receiveAttackSpy.mockReturnValueOnce({ status: 'duplicate', message: `Location (${row}, ${col}) already attacked.` });
            const result = player1.attack(row, col);
            expect(result).toEqual({ status: 'duplicate', message: `Location (${row}, ${col}) already attacked.` });
        })
        test('Should throw out of bounds Error', () => {
            const row = -1;
            const col = 1;
            receiveAttackSpy.mockReturnValueOnce({ status: 'out_of_bounds', message: `Attack at (${row}, ${col}) is outside the grid.` });
            const result = player1.attack(row, col);
            expect(result).toEqual({ status: 'out_of_bounds', message: `Attack at (${row}, ${col}) is outside the grid.` })
        })
    })

    describe('randomAttack() method', () => {
        let receiveAttackSpy;
        let mathRandomSpy;
        beforeEach(() => {
            receiveAttackSpy = vi.spyOn(opponentBoard, 'receiveAttack');
            mathRandomSpy = vi.spyOn(Math, 'random');
        })
        afterEach(() => {
            receiveAttackSpy.mockRestore();
            mathRandomSpy.mockRestore();
        })
        test('Player.randomAttack() is delegated to opponentBoard.receiveAttack()', () => {
            player1.randomAttack();
            expect(receiveAttackSpy).toHaveBeenCalledTimes(1);
        })
        test('Valid random attack on the first try', () => {
            mathRandomSpy.mockReturnValueOnce(0.1); // row
            mathRandomSpy.mockReturnValueOnce(0.1); // col
            receiveAttackSpy.mockReturnValueOnce({ status: 'miss' });
            const result = player1.randomAttack();
            expect(receiveAttackSpy).toHaveBeenCalledTimes(1);
            expect(receiveAttackSpy).toHaveBeenCalledWith(1, 1);
            expect(result).toEqual({ status: 'miss' });
        })
        test('Retry attacks until a non-duplicate location is found', () => {
            mathRandomSpy.mockReturnValue(0.0);
            receiveAttackSpy
                .mockReturnValueOnce({ status: 'duplicate', message: `Location (0, 0) already attacked.` })
                .mockReturnValueOnce({ status: 'duplicate', message: `Location (0, 0) already attacked.` })
                .mockReturnValueOnce({ status: 'miss' });
            const result = player1.randomAttack();
            expect(receiveAttackSpy).toHaveBeenCalledTimes(3);
            expect(receiveAttackSpy).toHaveBeenCalledWith(0, 0);
            expect(result).toEqual({ status: 'miss' });
        })
        test('Retry attacks until in-bounds location is found', () => {
            mathRandomSpy.mockReturnValueOnce(0.0);
            mathRandomSpy.mockReturnValueOnce(0.0);
            mathRandomSpy.mockReturnValueOnce(0.1);
            mathRandomSpy.mockReturnValueOnce(0.1);
            receiveAttackSpy
                .mockReturnValueOnce({ status: 'out_of_bounds', message: `Attack at (10, 10) is outside the grid.` })
                .mockReturnValueOnce({ status: 'miss' });
            const result = player1.randomAttack();
            expect(receiveAttackSpy).toHaveBeenCalledTimes(2);
            expect(receiveAttackSpy).toHaveBeenCalledWith(0, 0);
            expect(receiveAttackSpy).toHaveBeenCalledWith(1, 1);
            expect(result).toEqual({ status: 'miss' });
        })
    })

    describe('hasLost() method', () => {
        let allShipsSunkSpy;
        beforeEach(() => {
            allShipsSunkSpy = vi.spyOn(player1Board, 'allShipsSunk');
        })
        afterEach(() => {
            allShipsSunkSpy.mockRestore();
        })
        test('Delegate hasLost() to player1Board.allShipsSunk', () => {
            allShipsSunkSpy.mockReturnValueOnce(true);
            const result = player1.hasLost();
            expect(result).toBe(true);
        })
    })

    describe('hasWon() method', () => {
        let allShipsSunkSpy;
        beforeEach(() => {
            allShipsSunkSpy = vi.spyOn(opponentBoard, 'allShipsSunk');
        })
        afterEach(() => {
            allShipsSunkSpy.mockRestore();
        })
        test('Delegate hasLost() to player1Board.allShipsSunk', () => {
            allShipsSunkSpy.mockReturnValueOnce(true);
            const result = player1.hasWon();
            expect(result).toBe(true);
        })
    })
})