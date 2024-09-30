import mime from "mime";
import { HttpClient } from "../infra/http/http-client";
import { Storage } from "../infra/storage/storage";
import { Crypto } from "../infra/utils/crypto";
import { AudioUtils } from "../utils/audio-utils";
import { AudioConverter } from "../infra/audio/audio-converter";
import { AiTranscriber } from "../infra/ai/ai-transcriber";

export class DownloadAndTranscribeAudioUseCase {
    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
        private crypto: Crypto,
        private audioConverter: AudioConverter,
        private transcriber: AiTranscriber
    ) {

    }
    async execute(audioUrl: string, OPENAI_MODEL: string = 'whisper-1'): Promise<string> {
        let { buffer, contentType } = await this.httpClient.get(audioUrl);
        let extension = mime.extension(contentType);

        const needsConversion = AudioUtils.needsConversion(extension as string);
        
        if(needsConversion) {
            buffer = await this.audioConverter.convertToMp3(buffer, contentType);
            extension = 'mp3';
        }
        
        const key = await this.crypto.generateKey();

        const audioPath = await this.storage.save(buffer, `audio-${key}.${extension}`);
        
        const transcription = await this.transcriber.transcribe(audioPath, OPENAI_MODEL);
        
        this.storage.remove(audioPath);
        return transcription;
    }


}