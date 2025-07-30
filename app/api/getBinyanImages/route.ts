import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'BinyanCatalog');
    const files = fs.readdirSync(publicDir);
    
    // Filtrer pour ne garder que les images
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // Ajouter le chemin complet pour chaque image
    const images = imageFiles.map(file => `/BinyanCatalog/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Erreur lors de la lecture du dossier des images:', error);
    return NextResponse.json({ images: [] });
  }
}
