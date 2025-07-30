import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const qa = await prisma.qA.findUnique({
      where: { id: idNum },
      include: {
        author: true,
        category: true,
      },
    });

    if (!qa) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(qa);
  } catch (error) {
    console.error('API Error - GET /api/qa/[id]:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error fetching QA' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const qa = await prisma.qA.update({
      where: { id: idNum },
      data: {
        topic: data.topic,
        question: data.question,
        answer: data.answer,
        authorId: data.authorId,
        categoryId: data.categoryId,
        askerName: data.askerName,
        askerEmail: data.askerEmail,
        status: data.status,
      },
      include: {
        author: true,
        category: true,
      },
    });

    return NextResponse.json(qa);
  } catch (error) {
    console.error('API Error - PUT /api/qa/[id]:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error updating QA' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    await prisma.qA.delete({
      where: { id: idNum },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error - DELETE /api/qa/[id]:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error deleting QA' },
      { status: 500 }
    );
  }
}
