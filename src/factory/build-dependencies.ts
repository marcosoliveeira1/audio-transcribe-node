import path from 'path';

import { DownloadAndTranscribeAudioUseCase } from '../use-case/download-and-transcribe-audio-use-case';
import { HttpClient } from '../infra/http/http-client';
import { Storage } from '../infra/storage/storage';
import { Crypto } from '../infra/utils/crypto';
import { AudioConverter } from '../infra/audio/audio-converter';
import { AiTranscriber } from '../infra/ai/ai-transcriber';

export function buildDependencies({
    OPENAI_ORG, OPENAI_API_KEY
}: {
    OPENAI_ORG?: string,
    OPENAI_API_KEY?: string
}) {
    return {
        downloadAndTranscribeAudioUseCase: new DownloadAndTranscribeAudioUseCase(
            new HttpClient(),
            new Storage(path.join(__dirname, '..', '..', 'temp')),
            new Crypto(),
            new AudioConverter(),
            new AiTranscriber({
                apiKey: OPENAI_API_KEY as string,
                organization: OPENAI_ORG as string
            })
        )
    }

}