import { NextResponse } from 'next/server';
import { bookService } from '@/services/books';

export async function POST(request: Request) {
  try {
    const { bookOrders } = await request.json();
    
    if (!bookOrders || !Array.isArray(bookOrders)) {
      return NextResponse.json({ error: 'Invalid book orders' }, { status: 400 });
    }

    // Update each book's display order
    for (const { id, displayOrder } of bookOrders) {
      await bookService.updateBook(id.toString(), { displayOrder });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error - POST /api/books/reorder:', error);
    return NextResponse.json({ error: 'Error reordering books' }, { status: 500 });
  }
}