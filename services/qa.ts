import { QA as PrismaQA } from '@prisma/client';
import { QA } from '@/types';
import { convertPrismaQA } from '@/types/prisma';
import { prisma } from '@/lib/prisma';

class QAServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QAServiceError';
  }
}

export const qaService = {
  async getAllQAs(): Promise<QA[]> {
    try {
      const qas = await prisma.qA.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author: true,
          category: true
        }
      });
      return qas.map(qa => {
        const converted = convertPrismaQA(qa);
        if (qa.author) {
          converted.author = {
            id: qa.author.id,
            firstName: qa.author.firstName,
            lastName: qa.author.lastName,
            topics: qa.author.topics as any[],
            address: qa.author.address,
            city: qa.author.city,
            description: qa.author.description,
            languages: qa.author.languages,
            imageUrl: qa.author.imageUrl
          };
        }
        return converted;
      });
    } catch (error) {
      console.error('Error getting all QAs:', error);
      throw new QAServiceError('Failed to fetch QAs');
    }
  },

  async getQA(id: string): Promise<QA | null> {
    if (!id) {
      throw new QAServiceError('ID is required');
    }
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new QAServiceError('Invalid ID format');
      }
      const qa = await prisma.qA.findUnique({
        where: { id: numericId },
        include: {
          author: true,
          category: true
        }
      });
      
      if (!qa) return null;
      
      const converted = convertPrismaQA(qa);
      if (qa.author) {
        converted.author = {
          id: qa.author.id,
          firstName: qa.author.firstName,
          lastName: qa.author.lastName,
          topics: qa.author.topics as any[],
          address: qa.author.address,
          city: qa.author.city,
          description: qa.author.description,
          languages: qa.author.languages,
          imageUrl: qa.author.imageUrl
        };
      }
      return converted;
    } catch (error) {
      console.error('Error getting QA:', error);
      throw new QAServiceError('Failed to fetch QA');
    }
  },

  async createQA(data: {
    topic: QA['topic'];
    question: string;
    answer?: string;
    authorId?: string;
    askerEmail?: string;
    askerName?: string;
  }): Promise<QA> {
    try {
      const qa = await prisma.qA.create({
        data: {
          topic: data.topic,
          question: data.question,
          answer: data.answer || null,
          authorId: data.authorId || null,
          askerEmail: data.askerEmail || null,
          askerName: data.askerName || null
        }
      });
      return convertPrismaQA(qa);
    } catch (error) {
      console.error('Error creating QA:', error);
      throw new QAServiceError('Failed to create QA');
    }
  },

  async updateQA(id: string, data: {
    topic?: QA['topic'];
    question?: string;
    answer?: string | null;
    authorId?: string | null;
  }): Promise<QA | null> {
    if (!id) {
      throw new QAServiceError('ID is required');
    }
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new QAServiceError('Invalid ID format');
      }
      const qa = await prisma.qA.update({
        where: { id: numericId },
        data
      });
      return convertPrismaQA(qa);
    } catch (error) {
      console.error('Error updating QA:', error);
      throw new QAServiceError('Failed to update QA');
    }
  },

  async deleteQA(id: string): Promise<boolean> {
    if (!id) {
      throw new QAServiceError('ID is required');
    }
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new QAServiceError('Invalid ID format');
      }
      await prisma.qA.delete({
        where: { id: numericId }
      });
      return true;
    } catch (error) {
      console.error('Error deleting QA:', error);
      return false;
    }
  }
};
