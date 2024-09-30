import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Crypto } from './crypto';
import { randomUUID } from 'crypto';

vi.mock('crypto', () => ({
    randomUUID: vi.fn(),
}));

describe('Crypto class', () => {
    let crypto: Crypto;

    beforeEach(() => {
        crypto = new Crypto();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should generate a unique key', async () => {
        const mockKey = '123e4567-e89b-12d3-a456-426614174000';
        // @ts-ignore
        (randomUUID as vi.Mock).mockReturnValue(mockKey);

        const key = await crypto.generateKey();

        expect(key).toBe(mockKey);
        expect(randomUUID).toHaveBeenCalledTimes(1);
    });
});
