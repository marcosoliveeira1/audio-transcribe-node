import fs from 'fs';
import OpenAI from "openai";

export class AiTranscriber {
    private aiClient;

    constructor({ apiKey, organization }: { apiKey: string, organization: string }) {
        this.aiClient = new OpenAI({
            apiKey,
            organization,
        });
    }

    async transcribe(audioPath: string, model: string = 'whisper-1'): Promise<string> {
        try {
            const audio = fs.createReadStream(audioPath);

            const transcription = await this.aiClient.audio.transcriptions.create({
                file: audio,
                model: "whisper-1",
            });

            return transcription.text;
        } catch (error) {
            console.error('Error during transcription:', error);
            throw new Error('Failed to transcribe the audio file.');
        }
    }
}