'use server';

/**
 * @fileOverview A flow to provide personalized biosecurity recommendations to farmers based on their farm health score.
 *
 * - getGuidance - A function that generates a personalized recommendation based on the health score.
 * - GuidanceInput - The input type for the getGuidance function, including the health score.
 * - GuidanceOutput - The return type for the getGuidance function, providing a recommendation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuidanceInputSchema = z.object({
  healthScore: z
    .number()
    .int()
    .describe('The health score of the farm, calculated from the checklist.'),
  answers: z.record(z.string(), z.string()).describe('The answers from the checklist submission.'),
});
export type GuidanceInput = z.infer<typeof GuidanceInputSchema>;

const GuidanceOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'A personalized recommendation for the farmer to improve their farm biosecurity, based on their health score and checklist answers.'
    ),
});
export type GuidanceOutput = z.infer<typeof GuidanceOutputSchema>;

export async function getGuidance(input: GuidanceInput): Promise<GuidanceOutput> {
  return guidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guidancePrompt',
  input: {schema: GuidanceInputSchema},
  output: {schema: GuidanceOutputSchema},
  prompt: `You are an AI assistant providing biosecurity recommendations to farmers.

  Based on the farmer's health score ({{{healthScore}}}) from their submitted checklist, and their answers ({{{answers}}}), generate a personalized recommendation to improve their farm's biosecurity.
  Ensure the recommendation is clear, actionable, and relevant to the farmer's situation.
  Respond in the user's selected language.
  `,
});

const guidanceFlow = ai.defineFlow(
  {
    name: 'guidanceFlow',
    inputSchema: GuidanceInputSchema,
    outputSchema: GuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
