import { prisma } from '@/lib/prisma';

export async function getRabbis() {
  try {
    const rabbis = await prisma.rabbi.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        topics: true,
        address: true,
        city: true,
        description: true,
        languages: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { rabbis };
  } catch (error) {
    console.error('Error getting rabbis:', error);
    throw error;
  }
}

export async function getRabbiById(id: string) {
  try {
    const rabbi = await prisma.rabbi.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        topics: true,
        address: true,
        city: true,
        description: true,
        languages: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { rabbi };
  } catch (error) {
    console.error('Error getting rabbi by id:', error);
    throw error;
  }
}

export async function createRabbi(data: {
  firstName: string;
  lastName: string;
  topics: string[];
  address?: string;
  city?: string;
  description?: string;
  languages?: string[];
  imageUrl?: string;
}) {
  try {
    const rabbi = await prisma.rabbi.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        topics: data.topics,
        address: data.address || '',
        city: data.city || '',
        description: data.description || '',
        languages: data.languages || [],
        imageUrl: data.imageUrl || '/rabbis/rav.png',
      },
    });
    return { rabbi };
  } catch (error) {
    console.error('Error creating rabbi:', error);
    throw error;
  }
}

export async function updateRabbi(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    topics?: string[];
    address?: string;
    city?: string;
    description?: string;
    languages?: string[];
    imageUrl?: string;
  },
) {
  try {
    const rabbi = await prisma.rabbi.update({
      where: { id },
      data,
    });
    return { rabbi };
  } catch (error) {
    console.error('Error updating rabbi:', error);
    throw error;
  }
}

export async function deleteRabbi(id: string) {
  try {
    const rabbi = await prisma.rabbi.delete({
      where: { id },
    });
    return { rabbi };
  } catch (error) {
    console.error('Error deleting rabbi:', error);
    throw error;
  }
}
