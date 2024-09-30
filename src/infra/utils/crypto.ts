import { randomUUID } from 'crypto';

export class Crypto {
    async generateKey(): Promise<string> {
        return randomUUID();
    }
}