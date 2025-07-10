import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import { initializeGame } from './gameManager.js';
import * as LayoutModule from '../ui/layout.js';
import * as StartScreenModule from '../ui/screens/start/startScreen.js';
import * as GameplayScreenModule from '../ui/screens/gameplay/gameplayScreen.js'

describe("Game Manager's UI Initialization", () => {
    let appRoot;
    let layoutSpy;
    let createStartScreenSpy;
    let createGameplayScreenSpy;
    let mockStartScreenContainer;
    let mockGameplayScreenContainer;
    let mockGameOverScreenContainer;
    let mockStartGameButton;
    let createGameboardSpy, createPlayerSpy;
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

        // startScreen spy
        createStartScreenSpy = vi.spyOn(StartScreenModule, 'createStartScreen');
        mockStartGameButton = document.createElement('button');
        mockStartGameButton.id = 'start-btn';
        mockStartGameButton.textContent = 'Start';
        createStartScreenSpy.mockImplementation((container, callback) => {
            container.appendChild(mockStartGameButton);
            mockStartGameButton.addEventListener('click', callback);
            return {
                element: container,
                startButton: mockStartGameButton
            };
        });

        // gameplayScreen spy
        createGameplayScreenSpy = vi.spyOn(GameplayScreenModule, 'createGameplayScreen');

    })
    afterEach(() => {
        document.body.removeChild(appRoot);
        vi.restoreAllMocks();
    })

    test('initializeGame() calls layout() and sets start screen visibility', () => {
        initializeGame(appRoot);
        expect(layoutSpy).toHaveBeenCalledTimes(1);
        expect(layoutSpy).toHaveBeenCalledWith(appRoot);
        expect(mockLayoutElements.startScreen.classList.contains('hidden')).toBe(false);
        expect(mockLayoutElements.gameplayScreen.classList.contains('hidden')).toBe(true);
        expect(mockLayoutElements.gameOverScreen.classList.contains('hidden')).toBe(true);
    })
    test('Clicking start button switches to gameplay screen', () => {
        initializeGame(appRoot);
        expect(mockLayoutElements.startScreen.classList.contains('hidden')).toBe(false);
        expect(mockLayoutElements.gameplayScreen.classList.contains('hidden')).toBe(true);
        expect(mockLayoutElements.gameOverScreen.classList.contains('hidden')).toBe(true);
        mockStartGameButton.click();
        expect(mockLayoutElements.startScreen.classList.contains('hidden')).toBe(true);
        expect(mockLayoutElements.gameplayScreen.classList.contains('hidden')).toBe(false);
        expect(mockLayoutElements.gameOverScreen.classList.contains('hidden')).toBe(true);
    })
})