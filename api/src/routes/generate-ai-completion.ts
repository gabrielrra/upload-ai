import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { temperature, prompt, videoId } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcription)
      return reply.status(400).send('Video does not have transcription yet');

    const promptMessage = prompt.replace(
      '{transcription}',
      video.transcription
    );

    const response = streamText({
      model: openai('gpt-3.5-turbo-16k'),
      system: 'You are a helpful video transcript analyzer.',
      temperature,
      messages: [{ role: 'user', content: promptMessage }],
    });

    // const stream = OpenAIStream(response);

    return response.toDataStreamResponse();

    // streamToResponse(stream, reply.raw, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //   }
    // });
  });
}
