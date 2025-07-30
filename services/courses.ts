import { prisma } from '@/lib/prisma';

export const courseService = {
  getAllCourses: async () => {
    return prisma.course.findMany({
      orderBy: [
        { folder: 'asc' },
        { order: 'asc' },
        { title: 'asc' }
      ]
    });
  },

  getCourseById: async (id: string) => {
    return prisma.course.findUnique({
      where: { id },
    });
  },

  getCoursesByFolder: async (folder: string) => {
    return prisma.course.findMany({
      where: { folder },
      orderBy: [
        { order: 'asc' },
        { title: 'asc' }
      ]
    });
  },

  createCourse: async (data: {
    title: string;
    description?: string;
    folder: string;
    driveUrl: string;
    duration?: string;
    order?: number;
  }) => {
    return prisma.course.create({
      data,
    });
  },

  updateCourse: async (
    id: string,
    data: {
      title?: string;
      description?: string;
      folder?: string;
      driveUrl?: string;
      duration?: string;
      order?: number;
    }
  ) => {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  deleteCourse: async (id: string) => {
    return prisma.course.delete({
      where: { id },
    });
  },

  getAllFolders: async () => {
    const courses = await prisma.course.findMany({
      select: { folder: true },
      distinct: ['folder'],
      orderBy: { folder: 'asc' }
    });
    return courses.map(c => c.folder);
  }
};