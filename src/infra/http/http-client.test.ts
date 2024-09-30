import { vi, describe, it, expect, beforeEach } from 'vitest';
import { HttpClient } from './http-client'; // Adjust the import path as necessary

describe('HttpClient', () => {
    let httpClient: HttpClient;

    beforeEach(() => {
        httpClient = new HttpClient();
    });

    it('should return buffer and contentType when fetch is successful', async () => {
        const mockBuffer = Buffer.from('mock data');
        const mockArrayBuffer = Uint8Array.from(mockBuffer).buffer;
        const mockResponse = {
            ok: true,
            arrayBuffer: vi.fn().mockResolvedValue(mockArrayBuffer),
            headers: {
                get: vi.fn().mockReturnValue('image/png'),
            },
        };

        global.fetch = vi.fn().mockResolvedValue(mockResponse as any);

        const result = await httpClient.get('https://example.com/file.png');

        expect(result).toEqual({
            buffer: mockBuffer,
            contentType: 'image/png',
        });

        expect(global.fetch).toHaveBeenCalledWith('https://example.com/file.png');
    });

    it('should throw an error if fetch fails', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };

        global.fetch = vi.fn().mockResolvedValue(mockResponse as any);

        await expect(httpClient.get('https://example.com/file.png')).rejects.toThrow('HTTP error! Status: 404');
    });
});
