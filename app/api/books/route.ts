import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { bookService } from '@/services/books';
import { convertPrismaBook } from '@/types/prisma';

const IMAGES_DIR = path.join(process.cwd(), 'public/Sfarim');

export async function GET() {
  try {
    const books = await bookService.getAllBooks();
    // Sort books by displayOrder
    const sortedBooks = books.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return NextResponse.json(sortedBooks.map(convertPrismaBook));
  } catch (error: any) {
    console.error('API Error - GET /api/books:', error);
    return NextResponse.json({ error: 'Error reading books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const image = formData.get('image') as File;
    const nedarimPlusLink = formData.get('nedarimPlusLink') as string;
    const isNew = formData.get('isNew') === 'true';

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = null;
    if (image) {
      await fs.mkdir(IMAGES_DIR, { recursive: true });
      const timestamp = Date.now();
      const filename = `${timestamp}-${image.name}`;
      const imagePath = path.join(IMAGES_DIR, filename);
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(imagePath, buffer);
      imageUrl = `/Sfarim/${filename}`;
    }

    const book = await bookService.createBook({
      title,
      description,
      price,
      imageUrl,
      nedarimPlusLink,
      isNew,
      displayOrder: 0,
    });

    return NextResponse.json(convertPrismaBook(book));
  } catch (error: any) {
    console.error('API Error - POST /api/books:', error);
    return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const image = formData.get('image') as File;
    const nedarimPlusLink = formData.get('nedarimPlusLink') as string;
    const isNew = formData.get('isNew') === 'true';

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = undefined;
    if (image) {
      await fs.mkdir(IMAGES_DIR, { recursive: true });
      const timestamp = Date.now();
      const filename = `${timestamp}-${image.name}`;
      const imagePath = path.join(IMAGES_DIR, filename);
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(imagePath, buffer);
      imageUrl = `/Sfarim/${filename}`;
    }

    const displayOrder = formData.get('displayOrder');
    const book = await bookService.updateBook(id, {
      title,
      description,
      price: price || null,
      ...(imageUrl && { imageUrl }),
      nedarimPlusLink: nedarimPlusLink || null,
      isNew,
      ...(displayOrder !== null && { displayOrder: parseInt(displayOrder as string) }),
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(convertPrismaBook(book));
  } catch (error: any) {
    console.error('API Error - PUT /api/books:', error);
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Missing book ID' }, { status: 400 });
    }

    const success = await bookService.deleteBook(id);
    if (!success) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error - DELETE /api/books:', error);
    return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
  }
}
