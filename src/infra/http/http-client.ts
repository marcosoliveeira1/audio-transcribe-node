export class HttpClient {
    async get(url: string): Promise<{ buffer: Buffer, contentType: string }> {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            
            const buffer = Buffer.from(arrayBuffer);
            const contentType = response.headers.get('Content-Type') || 'unknown';

            return { buffer, contentType };
        } catch (error) {
            console.error('Error downloading file:', error);
            throw error;
        }
    }
}
