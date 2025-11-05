import { NextRequest, NextResponse } from 'next/server';
import { generateCode, autoDeploy, configureAPI } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { action, prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    let result: string;

    switch (action) {
      case 'generate-code':
        result = await generateCode(prompt);
        break;

      case 'auto-deploy':
        result = await autoDeploy(prompt);
        break;

      case 'api-wizard':
        result = await configureAPI(prompt);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI Magic Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
