import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const distributors = await prisma.distributor.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(distributors);
  } catch (error: any) {
    console.error('API Error - GET /api/distributors:', error);
    return NextResponse.json({ error: 'Error fetching distributors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des champs requis
    if (!data.name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!data.city?.trim()) {
      return NextResponse.json(
        { error: 'City is required' },
        { status: 400 }
      );
    }

    const distributor = await prisma.distributor.create({
      data: {
        name: data.name,
        city: data.city,
        phone: data.phone || null,
      }
    });

    return NextResponse.json(distributor);
  } catch (error) {
    console.error('API Error - POST /api/distributors:', error);
    return NextResponse.json({ error: 'Error creating distributor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des champs requis
    if (!data.id) {
      return NextResponse.json(
        { error: 'Distributor ID is required' },
        { status: 400 }
      );
    }

    if (!data.name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!data.city?.trim()) {
      return NextResponse.json(
        { error: 'City is required' },
        { status: 400 }
      );
    }

    const distributor = await prisma.distributor.update({
      where: { id: data.id },
      data: {
        name: data.name,
        city: data.city,
        phone: data.phone || null,
      }
    });

    return NextResponse.json(distributor);
  } catch (error) {
    console.error('API Error - PUT /api/distributors:', error);
    return NextResponse.json({ error: 'Error updating distributor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'Distributor ID is required' },
        { status: 400 }
      );
    }

    const distributor = await prisma.distributor.delete({
      where: { id: data.id }
    });

    return NextResponse.json(distributor);
  } catch (error) {
    console.error('API Error - DELETE /api/distributors:', error);
    return NextResponse.json({ error: 'Error deleting distributor' }, { status: 500 });
  }
}
