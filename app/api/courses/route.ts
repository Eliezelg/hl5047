import { NextResponse } from 'next/server';
import { courseService } from '@/services/courses';

export async function GET() {
  try {
    const courses = await courseService.getAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    // En développement, retourner plus de détails sur l'erreur
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { 
          error: 'Failed to fetch courses',
          details: error instanceof Error ? error.message : 'Unknown error',
          hint: 'Vérifiez que la base de données est accessible et que les migrations ont été exécutées'
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const course = await courseService.createCourse(data);
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}