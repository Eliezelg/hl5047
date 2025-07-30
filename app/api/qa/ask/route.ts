import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { QuestionTopic, QUESTION_TOPICS } from '@/types';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.topic || !data.question) {
      return NextResponse.json(
        { error: 'נושא ושאלה הם שדות חובה' },
        { status: 400 }
      );
    }

    // Validate topic
    if (!QUESTION_TOPICS.includes(data.topic as QuestionTopic)) {
      return NextResponse.json(
        { error: 'נושא לא חוקי' },
        { status: 400 }
      );
    }

    // Create question
    const question = await prisma.qA.create({
      data: {
        topic: data.topic,
        question: data.question,
        askerEmail: data.askerEmail || null,
        askerName: data.askerName || null,
        status: 'pending'
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('API Error - POST /api/qa/ask:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'שגיאה בשליחת השאלה' },
      { status: 500 }
    );
  }
}
