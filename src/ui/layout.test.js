import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import * as LayoutModule from './layout.js';

describe('layout() function', () => {
    let root;
    let elements;
    beforeEach(() => {
        root = document.createElement('div');
        elements = LayoutModule.layout(root);
        document.body.appendChild(root);
    });
    afterEach(() => {
        document.body.removeChild(root);
    });
    test('Creates the start screen element', () => {
        expect(elements.startScreen).not.toBeNull();
        expect(root.querySelector('#start-screen')).not.toBeNull();
    });
    test('Creates the gameplay screen element and hides it', () => {
        expect(elements.gameplayScreen).not.toBeNull();
        expect(root.querySelector('#gameplay-screen')).not.toBeNull();
        expect(elements.gameplayScreen.classList.contains('hidden')).toBe(true);
    });
    test('Return correct element references', () => {
        expect(elements.player1BoardContainer).not.toBeNull();
        expect(elements.player2BoardContainer).not.toBeNull();
        expect(elements.resetButton).not.toBeNull();
        expect(elements.startButton).not.toBeNull();
    });
});