import { NextRequest, NextResponse } from 'next/server';
import * as rabbiService from '@/services/rabbis';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const { rabbi } = await rabbiService.getRabbiById(id);
    
    if (!rabbi) {
      return NextResponse.json(
        { error: 'Rabbi not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(rabbi);
  } catch (error) {
    console.error('API Error - GET /api/rabbis/[id]:', error);
    return NextResponse.json(
      { 
        error: 'Error reading rabbi',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
