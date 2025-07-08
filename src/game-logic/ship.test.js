import { test, expect, describe, beforeAll, beforeEach } from 'vitest';
import { createShip } from './ship';

describe('createShip', () => {
    let ship;
    beforeEach(() => {
        ship = createShip(3);
    });
    test('creates ship of a given size', () => {
        expect(ship.getSize()).toBe(3);
    })
    test('new ship is not sunken', () => {
        expect(ship.isSunk()).toBe(false);
    })
    test('should be sunk after all segments are hit', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBe(true); 
    });
})