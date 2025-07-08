import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Extraire l'extension du fichier
    const extension = file.type.split('/')[1];
    const fileName = `${uuidv4()}.${extension}`;
    
    // Créer le chemin du dossier public/uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Créer le dossier uploads s'il n'existe pas
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    try {
      await writeFile(join(uploadDir, fileName), buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Error saving file' },
        { status: 500 }
      );
    }
    
    // Retourner l'URL de l'image
    return NextResponse.json({
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    console.error('Error in upload:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
