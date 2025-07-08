import { NextResponse } from 'next/server';
import { JsonStorageService } from '@/services/jsonStorageService';

interface Brochure {
  id: string;
  type: string;
  title?: string;
  date: string;
  url?: string;
}

const jsonStorageService = new JsonStorageService('brochures');

export async function GET() {
  try {
    const brochures = await jsonStorageService.getAll<Brochure>();
    return NextResponse.json(brochures);
  } catch (error) {
    console.error('Error reading brochures:', error);
    return NextResponse.json({ error: 'Failed to load brochures' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const brochures = (await jsonStorageService.getAll<Brochure>()) || [];
    
    // Add new brochure data
    const brochureData: Omit<Brochure, 'id'> = {
      type: data.type,
      title: data.title,
      url: data.url,
      date: new Date().toISOString()
    };

    // Filter brochures by type
    const otherBrochures = brochures.filter(b => b.type !== data.type);
    const sameBrochures = brochures.filter(b => b.type === data.type);

    // Keep only the 4 most recent brochures of the same type
    const updatedBrochures = [
      ...sameBrochures.slice(0, 4),
      ...otherBrochures
    ];

    // Create new brochure
    const newBrochure = await jsonStorageService.create<Brochure>(brochureData);

    // Update all brochures
    for (const brochure of updatedBrochures) {
      await jsonStorageService.update<Brochure>(brochure.id, brochure);
    }

    return NextResponse.json(newBrochure);
  } catch (error) {
    console.error('Error creating brochure:', error);
    return NextResponse.json({ error: 'Failed to create brochure' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const success = await jsonStorageService.delete(id);
    if (!success) {
      return NextResponse.json({ error: 'Brochure not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting brochure:', error);
    return NextResponse.json({ error: 'Failed to delete brochure' }, { status: 500 });
  }
}
