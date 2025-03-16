import { FastifyInstance } from 'fastify';
import { createReadStream } from 'node:fs';
import OpenAI from 'openai';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const openAi = new OpenAI({
  apiKey: process.env.OPENAI_KEY || '',
});

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    });
    const { videoId } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });
    let transcription = '';
    if (video.transcription) transcription = video.transcription;
    else {
      const audioReadStream = createReadStream(video.path);

      const response = await openAi.audio.transcriptions.create({
        file: audioReadStream,
        model: 'whisper-1',
        language: 'pt',
        response_format: 'json',
        temperature: 0.5,
        prompt,
      });

      transcription = response.text;

      await prisma.video.update({
        where: {
          id: videoId,
        },
        data: {
          transcription,
        },
      });
    }

    return { transcription };
  });
}
