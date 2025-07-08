import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { bookService } from '@/services/books';
import { convertPrismaBook } from '@/types/prisma';

const IMAGES_DIR = path.join(process.cwd(), 'public/Sfarim');

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Book ID is required' },
        { status: 400 }
      );
    }

    const book = await bookService.getBookById(id);
    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(convertPrismaBook(book));
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price')?.toString() || null;
    const imageFile = formData.get('image') as File;
    const nedarimPlusLink = formData.get('nedarimPlusLink') as string;
    const isNew = formData.get('isNew') === 'true';

    let imageUrl: string | undefined;

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await fs.mkdir(IMAGES_DIR, { recursive: true });

      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(IMAGES_DIR, filename);

      await writeFile(filepath, buffer);
      imageUrl = `/Sfarim/${filename}`;
    }

    const updatedBook = await bookService.updateBook(id, {
      title,
      description,
      price,
      nedarimPlusLink: nedarimPlusLink || null,
      isNew,
      ...(imageUrl && { imageUrl })
    });

    if (!updatedBook) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(convertPrismaBook(updatedBook));
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
    
    const book = await bookService.getBookById(id);
    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    const success = await bookService.deleteBook(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete book' },
        { status: 500 }
      );
    }

    if (book.imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', book.imageUrl);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
