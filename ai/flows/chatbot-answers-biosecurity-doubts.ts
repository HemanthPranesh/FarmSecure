'use server';

/**
 * @fileOverview A chatbot that answers farm biosecurity questions.
 *
 * - chatbotAnswersBiosecurityDoubts - A function that handles the chatbot logic.
 * - ChatbotAnswersBiosecurityDoubtsInput - The input type for the chatbotAnswersBiosecurityDoubts function.
 * - ChatbotAnswersBiosecurityDoubtsOutput - The return type for the chatbotAnswersBiosecurityDoubts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAnswersBiosecurityDoubtsInputSchema = z.object({
  query: z.string().describe('The query from the user regarding farm biosecurity.'),
  language: z.string().describe('The language of the query.'),
});
export type ChatbotAnswersBiosecurityDoubtsInput = z.infer<typeof ChatbotAnswersBiosecurityDoubtsInputSchema>;

const ChatbotAnswersBiosecurityDoubtsOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type ChatbotAnswersBiosecurityDoubtsOutput = z.infer<typeof ChatbotAnswersBiosecurityDoubtsOutputSchema>;

export async function chatbotAnswersBiosecurityDoubts(
  input: ChatbotAnswersBiosecurityDoubtsInput
): Promise<ChatbotAnswersBiosecurityDoubtsOutput> {
  return chatbotAnswersBiosecurityDoubtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAnswersBiosecurityDoubtsPrompt',
  input: {schema: ChatbotAnswersBiosecurityDoubtsInputSchema},
  output: {schema: ChatbotAnswersBiosecurityDoubtsOutputSchema},
  prompt: `You are a helpful AI chatbot expert in farm biosecurity, answering questions in the user's language.

  Respond to the following query in {{{language}}} language:

  {{query}}
  `,
});

const chatbotAnswersBiosecurityDoubtsFlow = ai.defineFlow(
  {
    name: 'chatbotAnswersBiosecurityDoubtsFlow',
    inputSchema: ChatbotAnswersBiosecurityDoubtsInputSchema,
    outputSchema: ChatbotAnswersBiosecurityDoubtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
