import fs from 'fs';
import path from 'path';

export class Storage {
    constructor(private dirPath: string) {
        if (!fs.existsSync(this.dirPath)) {
            console.log('Creating directory:', this.dirPath);
            fs.mkdirSync(this.dirPath, { recursive: true });
        }
    }

    async save(buffer: Buffer, fileName: string): Promise<string> {
        const filePath = path.join(this.dirPath, fileName);

        try {
            await fs.promises.writeFile(filePath, buffer);
            return filePath;
        } catch (error: any) {
            console.error('Error saving file:', error);
            throw new Error(`Failed to save file: ${error?.message}`);
        }
    }

    async remove(filePath: string): Promise<void> {
        try {
            await fs.promises.unlink(filePath);
        } catch (error: any) {
            console.error('Error removing file:', error);
            throw new Error(`Failed to remove file: ${error?.message}`);
        }
    }
}
