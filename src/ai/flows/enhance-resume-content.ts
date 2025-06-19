'use server';

/**
 * @fileOverview Enhances resume content using AI to improve wording and impact.
 *
 * - enhanceResumeContent - A function that enhances the resume content.
 * - EnhanceResumeContentInput - The input type for the enhanceResumeContent function.
 * - EnhanceResumeContentOutput - The return type for the enhanceResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeContentInputSchema = z.object({
  section: z.string().describe('The specific section of the resume to enhance (e.g., Skills, Experience).'),
  content: z.string().describe('The current content of the resume section.'),
  desiredTone: z.string().optional().describe('The desired tone or style for the enhanced content (e.g., formal, persuasive).'),
});
export type EnhanceResumeContentInput = z.infer<typeof EnhanceResumeContentInputSchema>;

const EnhanceResumeContentOutputSchema = z.object({
  enhancedContent: z.string().describe('The AI-enhanced content for the resume section.'),
});
export type EnhanceResumeContentOutput = z.infer<typeof EnhanceResumeContentOutputSchema>;

export async function enhanceResumeContent(input: EnhanceResumeContentInput): Promise<EnhanceResumeContentOutput> {
  return enhanceResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceResumeContentPrompt',
  input: {schema: EnhanceResumeContentInputSchema},
  output: {schema: EnhanceResumeContentOutputSchema},
  prompt: `You are a professional resume writer specializing in making resumes more effective.

You will enhance the content of a specific section of a resume to improve its impact and readability. Take into account the requested tone or style for the enhanced content.

Section: {{{section}}}
Current Content: {{{content}}}
Desired Tone: {{{desiredTone}}}

Please provide the enhanced content for the resume section. Rewrite the current content to be more compelling and effective.
`,
});

const enhanceResumeContentFlow = ai.defineFlow(
  {
    name: 'enhanceResumeContentFlow',
    inputSchema: EnhanceResumeContentInputSchema,
    outputSchema: EnhanceResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
