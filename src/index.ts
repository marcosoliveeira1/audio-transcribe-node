import express from 'express';

import 'dotenv';

import { buildDependencies } from './factory/build-dependencies';

const { OPENAI_MODEL, OPENAI_API_KEY, OPENAI_ORG } = process.env;
const { downloadAndTranscribeAudioUseCase } = buildDependencies({ OPENAI_ORG, OPENAI_API_KEY });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/transcribe', async (req: any, res: any) => {
    const { audioUrl } = req.body;

    if (!audioUrl || typeof audioUrl !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing audioUrl in request body.' });
    }

    try {

        const msg = await downloadAndTranscribeAudioUseCase.execute(audioUrl, OPENAI_MODEL as string);

        return res.json({ msg });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'An error occurred.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});