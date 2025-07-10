import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import { initializeGame } from './gameManager.js';
import * as LayoutModule from '../ui/layout.js';

describe("Game Manager's UI Initialization", () => {
    let appRoot;
    let layoutSpy;
    let mockLayoutElements;
    beforeEach(() => {
        appRoot = document.createElement('div');
        appRoot.id = 'app';
        document.body.appendChild(appRoot);

        mockLayoutElements = {
            startScreen: document.createElement('div'),
            gameplayScreen: document.createElement('div'),
            gameOverScreen: document.createElement('div'),
        };
        mockLayoutElements.startScreen.classList.add('game-screen');
        mockLayoutElements.gameplayScreen.classList.add('game-screen', 'hidden'); 
        mockLayoutElements.gameOverScreen.classList.add('game-screen', 'hidden'); 

        layoutSpy = vi.spyOn(LayoutModule, 'layout');
        layoutSpy.mockReturnValue(mockLayoutElements); 
    })
    afterEach(() => {
        document.body.removeChild(appRoot);
        vi.restoreAllMocks();
    })

    test('initializeGame() calls layout() and sets start screen visibility', () => {
        initializeGame(appRoot);
        expect(layoutSpy).toHaveBeenCalledTimes(1);
        expect(layoutSpy).toHaveBeenCalledWith(appRoot);
        expect(layoutSpy().startScreen.classList.contains('hidden')).toBe(false);
        expect(layoutSpy().gameplayScreen.classList.contains('hidden')).toBe(true);
        expect(layoutSpy().gameOverScreen.classList.contains('hidden')).toBe(true);
    })
})