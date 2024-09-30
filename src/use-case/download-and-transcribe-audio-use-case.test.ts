import { AudioConverter } from "../infra/audio/audio-converter";
import { HttpClient } from "../infra/http/http-client";
import { Storage } from "../infra/storage/storage";
import { AiTranscriber } from "../infra/ai/ai-transcriber";
import { Crypto } from "../infra/utils/crypto";
import { DownloadAndTranscribeAudioUseCase } from "./download-and-transcribe-audio-use-case";
import path from 'path';
import 'dotenv/config'

describe('test download and transcribe audio', () => {
    const makeSut = () => {
        const httpClient = new HttpClient();
        const storage = new Storage(path.join(__dirname, '..', '..', 'temp'));
        const crypto = new Crypto();
        const audioConverter = new AudioConverter();

        const transcriber = new AiTranscriber({
            apiKey: process.env.OPENAI_API_KEY as string,
            organization: process.env.OPENAI_ORG as string
        });

        const sut = new DownloadAndTranscribeAudioUseCase(httpClient, storage, crypto, audioConverter, transcriber);
        return {
            sut
        }
    }

    it('should download and transcribe audio', async () => {
        const { sut } = makeSut();
        const result = await sut.execute('http://sndup.net/rxp4h/d');
        expect(result).toBeTruthy();
    })
})