import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

// Initialize AI clients (uses environment variables)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Generate code based on user prompt using Claude or GPT
 */
export async function generateCode(prompt: string): Promise<string> {
  if (!anthropic && !openai) {
    return '⚠️ AI API keys not configured. Please add ANTHROPIC_API_KEY or OPENAI_API_KEY to your environment variables.';
  }

  try {
    // Prefer Claude for code generation
    if (anthropic) {
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `You are an expert developer. Generate clean, production-ready code based on this request:\n\n${prompt}\n\nProvide the complete code with comments and best practices.`,
          },
        ],
      });

      const content = message.content[0];
      return content.type === 'text' ? content.text : 'Generated code (see console)';
    }

    // Fallback to OpenAI
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert developer. Generate clean, production-ready code.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4096,
      });

      return completion.choices[0]?.message?.content || 'No response generated';
    }

    return '⚠️ No AI client available';
  } catch (error) {
    console.error('Generate Code Error:', error);
    throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Auto-deploy application to Vercel or Cloudflare
 */
export async function autoDeploy(prompt: string): Promise<string> {
  // TODO: Implement Vercel/Cloudflare API integration
  // This would use the Vercel API or Cloudflare API to deploy

  return `🚀 Deploy Request Received:\n\n${prompt}\n\n⚠️ Deployment API integration coming soon!\n\nFor now, please deploy manually using:\n- Vercel: vercel --prod\n- Cloudflare: wrangler deploy\n\nWant me to implement this? Check lib/ai.ts:autoDeploy()`;
}

/**
 * Configure API integrations (Stripe, Supabase, etc.)
 */
export async function configureAPI(prompt: string): Promise<string> {
  if (!anthropic && !openai) {
    return '⚠️ AI API keys not configured. Please add ANTHROPIC_API_KEY or OPENAI_API_KEY to your environment variables.';
  }

  try {
    // Use AI to generate configuration code
    const systemPrompt = `You are an expert at API integrations. Generate complete, production-ready code for API setup including:
- API route handlers
- Client configuration
- Environment variable templates
- Error handling
- Best practices

Be specific and provide working code.`;

    if (anthropic) {
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\nRequest: ${prompt}` },
        ],
      });

      const content = message.content[0];
      return content.type === 'text' ? content.text : 'Configuration generated (see console)';
    }

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4096,
      });

      return completion.choices[0]?.message?.content || 'No response generated';
    }

    return '⚠️ No AI client available';
  } catch (error) {
    console.error('Configure API Error:', error);
    throw new Error(`API configuration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
