import { describe, test, expect, vi } from 'vitest'
import { createStartScreen } from './startScreen.js'

describe('createStartScreen', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div')
    })
    test('Renders the correct HTML structure', () => {
        createStartScreen(container)
        expect(container.querySelector('h1')).not.toBeNull();
        expect(container.querySelector('p')).not.toBeNull();
        expect(container.querySelector('#start-btn')).not.toBeNull();
    })
    test('Return correct references', () => {
        const result = createStartScreen(container);
        expect(result.element).toBe(container);
        expect(result.startButton).toBe(container.querySelector('#start-btn'));
    })
    test('Ataches callback to button', () => {
        const callback = vi.fn();
        const { startButton } = createStartScreen(container, callback);
        startButton.click();
        expect(callback).toHaveBeenCalled();
    })
    test('Does not throw if no callback is provided', () => {
        expect(() => createStartScreen(container)).not.toThrow()
    })
})