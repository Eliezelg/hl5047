import { NextResponse } from 'next/server';
import { getRabbis, createRabbi, updateRabbi, deleteRabbi } from '@/services/rabbis';
import { convertPrismaRabbi } from '@/types/prisma';
import { RabbiTopic, RABBI_TOPICS } from '@/types';

export async function GET() {
  try {
    const { rabbis } = await getRabbis();
    return NextResponse.json(rabbis.map(convertPrismaRabbi));
  } catch (error) {
    console.error('Error in GET /api/rabbis:', error);
    return NextResponse.json({ 
      error: 'Error fetching rabbis',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des champs requis
    if (!data.firstName || !data.lastName || !Array.isArray(data.topics) || data.topics.length === 0) {
      return NextResponse.json({ 
        error: 'Missing required fields: firstName, lastName, and at least one topic are required' 
      }, { status: 400 });
    }

    // Validation des topics
    if (!data.topics.every((topic: string) => RABBI_TOPICS.includes(topic as RabbiTopic))) {
      return NextResponse.json({ 
        error: 'Invalid topic found in topics list' 
      }, { status: 400 });
    }

    const { rabbi } = await createRabbi(data);
    if (!rabbi) {
      return NextResponse.json({ error: 'Failed to create rabbi' }, { status: 400 });
    }
    return NextResponse.json(convertPrismaRabbi(rabbi));
  } catch (error) {
    console.error('Error in POST /api/rabbis:', error);
    return NextResponse.json({ 
      error: 'Error creating rabbi',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();

    // Validation des topics si présents
    if (data.topics && (!Array.isArray(data.topics) || !data.topics.every((topic: string) => RABBI_TOPICS.includes(topic as RabbiTopic)))) {
      return NextResponse.json({ 
        error: 'Invalid topic found in topics list' 
      }, { status: 400 });
    }

    const { rabbi } = await updateRabbi(id, data);
    if (!rabbi) {
      return NextResponse.json({ error: 'Rabbi not found' }, { status: 404 });
    }
    return NextResponse.json(convertPrismaRabbi(rabbi));
  } catch (error) {
    console.error('Error in PUT /api/rabbis:', error);
    return NextResponse.json({ 
      error: 'Error updating rabbi',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const { rabbi } = await deleteRabbi(id);
    if (!rabbi) {
      return NextResponse.json({ error: 'Rabbi not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/rabbis:', error);
    return NextResponse.json({ 
      error: 'Error deleting rabbi',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
