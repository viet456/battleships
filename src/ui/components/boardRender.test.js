import { test, expect, describe, beforeAll, beforeEach, vi, afterEach } from 'vitest';
import * as BoardRenderModule from './boardRender';

describe('boardRender', () => {
    let container;
    let boardRenderSpy;
    let mockBoardObj;
    const createMockBoardObj = (size) => {
        const board = new Array(size).fill(null).map(() => new Array(size).fill(null))
        return {
            getBoard: () => board,
        };
    }
    beforeEach(() => {
        container = document.createElement('div');
        boardRenderSpy = vi.spyOn(BoardRenderModule, 'renderBoard');
        mockBoardObj = createMockBoardObj(10);
    })
    afterEach(() => {
        boardRenderSpy.mockRestore();
    })
    test('Returns array of input size ^2', () => {
        const result = BoardRenderModule.renderBoard(container, mockBoardObj);
        expect(result).toEqual(new Array(100).fill(null));
    })
    test('Container is appended with cells', () => {
        BoardRenderModule.renderBoard(container, mockBoardObj);
        const cells = container.querySelectorAll('.board-cell');
        expect (cells.length).toBe(100);
    })
})