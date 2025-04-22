import { add, subtract, multiply, divide } from '@/utils/math';

describe('Math utility functions', () => {
    describe('add', () => {
        test('should add two positive numbers correctly', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should handle negative numbers', () => {
            expect(add(-1, 1)).toBe(0);
            expect(add(-1, -1)).toBe(-2);
        });
    });

    describe('subtract', () => {
        test('should subtract two numbers correctly', () => {
            expect(subtract(5, 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(subtract(1, -1)).toBe(2);
            expect(subtract(-1, -1)).toBe(0);
        });
    });

    describe('multiply', () => {
        test('should multiply two numbers correctly', () => {
            expect(multiply(2, 3)).toBe(6);
        });

        test('should handle negative numbers', () => {
            expect(multiply(-1, 1)).toBe(-1);
            expect(multiply(-1, -1)).toBe(1);
        });
    });

    describe('divide', () => {
        test('should divide two numbers correctly', () => {
            expect(divide(6, 3)).toBe(2);
        });

        test('should handle negative numbers', () => {
            expect(divide(-6, 3)).toBe(-2);
            expect(divide(-6, -3)).toBe(2);
        });

        test('should throw an error when dividing by zero', () => {
            expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
        });
    });
});
