import { describe, test, expect, vi } from 'vitest'
import { createGameplayScreen } from './gameplayScreen'

describe('createGameplayScreen', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div')
    })
    test('Render correct HTML structure', () => {
        createGameplayScreen(container);
        expect(container.querySelector('.ship-port')).not.toBe(null);
        expect(container.querySelector('#player-board')).not.toBe(null);
        expect(container.querySelector('#computer-board')).not.toBe(null);
        expect(container.querySelector('#play-btn')).not.toBe(null);
    })
    test('Ataches callback to button', () => {
        const callback = vi.fn();
        const { playBtn } = createGameplayScreen(container, callback);
        playBtn.click();
        expect(callback).toHaveBeenCalled();
    })
    test('Does not throw if no callback is provided', () => {
        expect(() => createGameplayScreen(container)).not.toThrow()
    })
})