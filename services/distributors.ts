import { PrismaClient } from '@prisma/client';
import { Distributor } from '@/types/prisma';
import { convertPrismaDistributor } from '@/types/prisma';

const prisma = new PrismaClient();

export const distributorService = {
  async getAllDistributors(): Promise<Distributor[]> {
    const distributors = await prisma.distributor.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return distributors.map(convertPrismaDistributor);
  },

  async getDistributor(id: string): Promise<Distributor | null> {
    const distributor = await prisma.distributor.findUnique({
      where: { id }
    });
    return distributor ? convertPrismaDistributor(distributor) : null;
  },

  async createDistributor(data: Omit<Distributor, 'id'>): Promise<Distributor> {
    const distributor = await prisma.distributor.create({
      data
    });
    return convertPrismaDistributor(distributor);
  },

  async updateDistributor(id: string, data: Partial<Omit<Distributor, 'id'>>): Promise<Distributor | null> {
    try {
      const distributor = await prisma.distributor.update({
        where: { id },
        data
      });
      return convertPrismaDistributor(distributor);
    } catch {
      return null;
    }
  },

  async deleteDistributor(id: string): Promise<boolean> {
    try {
      await prisma.distributor.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }
};
