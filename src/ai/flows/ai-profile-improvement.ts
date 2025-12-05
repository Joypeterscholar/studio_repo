'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting improvements to a user's dating profile.
 *
 * The flow takes a user's profile information (bio and interests) as input and uses an AI model to
 * suggest improvements to attract more compatible matches.
 *
 * @interface AIProfileImprovementInput - Defines the input schema for the AI profile improvement flow.
 * @interface AIProfileImprovementOutput - Defines the output schema for the AI profile improvement flow.
 * @function aiProfileImprovement - The main function that triggers the AI profile improvement flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProfileImprovementInputSchema = z.object({
  bio: z.string().describe('The user profile bio.'),
  interests: z.string().describe('The user interests.'),
});
export type AIProfileImprovementInput = z.infer<typeof AIProfileImprovementInputSchema>;

const AIProfileImprovementOutputSchema = z.object({
  improvedBio: z.string().describe('The improved bio for the user profile.'),
  improvedInterests: z.string().describe('The improved interests for the user profile.'),
});
export type AIProfileImprovementOutput = z.infer<typeof AIProfileImprovementOutputSchema>;

export async function aiProfileImprovement(input: AIProfileImprovementInput): Promise<AIProfileImprovementOutput> {
  return aiProfileImprovementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProfileImprovementPrompt',
  input: {schema: AIProfileImprovementInputSchema},
  output: {schema: AIProfileImprovementOutputSchema},
  prompt: `You are a dating coach. Given the following profile information, suggest improvements to the bio and interests to attract more compatible matches. Return the improved bio and interests.

Bio: {{{bio}}}
Interests: {{{interests}}}

Improved Bio: 
Improved Interests:`,
});

const aiProfileImprovementFlow = ai.defineFlow(
  {
    name: 'aiProfileImprovementFlow',
    inputSchema: AIProfileImprovementInputSchema,
    outputSchema: AIProfileImprovementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
