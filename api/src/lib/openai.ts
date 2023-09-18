import OpenAI from '../../node_modules/openai';

export const openAi = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
