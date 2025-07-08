import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

// Mot de passe pour l'upload (à changer pour un vrai mot de passe)
const UPLOAD_PASSWORD = "Lemaaseh";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = formData.get('password') as string;
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    // Vérifier le mot de passe
    if (password !== UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    if (!type || !['alon', 'gilion'].includes(type)) {
      return NextResponse.json({ error: 'Type de fichier invalide' }, { status: 400 });
    }

    // Créer le nom du fichier selon le type
    const fileExtension = path.extname(file.name);
    const fileName = `weekly-${type}${fileExtension}`;
    const filePath = path.join(process.cwd(), 'public', 'downloads', fileName);

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sauvegarder les métadonnées du fichier
    const metadata = {
      [type]: {
        originalName: file.name,
        uploadDate: new Date().toISOString(),
      }
    };
    const metadataPath = path.join(process.cwd(), 'public', 'downloads', 'metadata.json');
    
    // Lire les métadonnées existantes si elles existent
    let existingMetadata = {};
    try {
      const existingMetadataContent = await import('fs/promises').then(fs => 
        fs.readFile(metadataPath, 'utf-8')
      );
      existingMetadata = JSON.parse(existingMetadataContent);
    } catch (error) {
      // Ignorer l'erreur si le fichier n'existe pas
    }

    // Fusionner les nouvelles métadonnées avec les existantes
    const updatedMetadata = { ...existingMetadata, ...metadata };
    await writeFile(metadataPath, JSON.stringify(updatedMetadata, null, 2));

    // Supprimer l'ancien fichier s'il existe
    try {
      await unlink(filePath);
    } catch (error) {
      // Ignorer l'erreur si le fichier n'existe pas
    }

    // Sauvegarder le nouveau fichier
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      message: `Fichier ${type} uploadé avec succès`,
      metadata: metadata[type]
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload du fichier' 
    }, { 
      status: 500 
    });
  }
}
