import { describe, test, expect, vi } from 'vitest'
import { createGameplayScreen } from './gameplayScreen'
import * as BoardRenderModule from '../../components/boardRender'

describe('createGameplayScreen', () => {
    let container;
    let mockPlayerBoard;
    let mockComputerBoard;
    let renderBoardSpy;
    const createMockBoardObj = (size) => {
        const board = new Array(size).fill(null).map(() => new Array(size).fill(null))
        return {
            getBoard: () => board,
        };
    }
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        mockPlayerBoard = createMockBoardObj(10);
        mockComputerBoard = createMockBoardObj(10);
        renderBoardSpy = vi.spyOn(BoardRenderModule, 'renderBoard');
    })
    afterEach(() => {
        renderBoardSpy.mockRestore();
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    })

    test('Render correct HTML structure and calls renderBoard for both player and computer', () => {
        createGameplayScreen(container, mockPlayerBoard, mockComputerBoard);
        expect(container.querySelector('.ship-port')).not.toBe(null);
        const playerBoardContainer = container.querySelector('#player-board'); // Get specific containers
        const computerBoardContainer = container.querySelector('#computer-board');
        expect(playerBoardContainer).not.toBe(null);
        expect(computerBoardContainer).not.toBe(null);
        expect(container.querySelector('#play-btn')).not.toBe(null);
        expect(renderBoardSpy).toHaveBeenCalledTimes(2);

        expect(renderBoardSpy).toHaveBeenCalledWith( 
            playerBoardContainer,
            mockPlayerBoard
        );
        expect(renderBoardSpy).toHaveBeenCalledWith(
            computerBoardContainer,
            mockComputerBoard
        );
    });

    test('Ataches callback to button', () => {
        const callback = vi.fn();
        const { playBtn } = createGameplayScreen(container, mockPlayerBoard, mockComputerBoard, callback);
        playBtn.click();
        expect(callback).toHaveBeenCalled();
    })
    test('Does not throw if no callback is provided', () => {
        expect(() => createGameplayScreen(container, mockPlayerBoard, mockComputerBoard)).not.toThrow()
    })
})