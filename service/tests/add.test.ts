import { expect, test } from 'vitest';
import { Add } from './Add';

test('adds 1 + 2 to equal 3', () => {
    expect(Add(1, 2)).toBe(3);
});
