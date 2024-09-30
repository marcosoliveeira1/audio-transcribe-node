import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { PassThrough } from 'stream';
import { Buffer } from 'buffer';

export class AudioConverter {
    constructor() {
        ffmpeg.setFfmpegPath(ffmpegPath as string);
    }

    async convertToMp3(buffer: Buffer, contentType: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const inputStream = new PassThrough();
            inputStream.end(buffer);

            const outputStream = new PassThrough();
            const chunks: Buffer[] = [];

            ffmpeg(inputStream)
                .inputFormat(contentType.split('/')[1])
                .audioCodec('libmp3lame')
                .format('mp3')
                .on('error', (err) => reject(err))
                .on('end', () => resolve(Buffer.concat(chunks)))
                .pipe(outputStream, { end: true });

            outputStream.on('data', (chunk) => chunks.push(chunk));
        });
    }
}
