import { prisma } from '@/lib/prisma';

export const bookService = {
  getAllBooks: async () => {
    return prisma.book.findMany();
  },

  getBookById: async (id: string) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;
    
    return prisma.book.findUnique({
      where: { id: numericId },
    });
  },

  createBook: async (data: {
    title: string;
    description: string;
    price?: string | null;
    imageUrl?: string | null;
    nedarimPlusLink?: string | null;
    isNew?: boolean;
  }) => {
    return prisma.book.create({
      data,
    });
  },

  updateBook: async (
    id: string,
    data: {
      title?: string;
      description?: string;
      price?: string | null;
      imageUrl?: string | null;
      nedarimPlusLink?: string | null;
      isNew?: boolean;
    }
  ) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    return prisma.book.update({
      where: { id: numericId },
      data,
    });
  },

  deleteBook: async (id: string) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return false;

    try {
      await prisma.book.delete({
        where: { id: numericId },
      });
      return true;
    } catch {
      return false;
    }
  }
};
