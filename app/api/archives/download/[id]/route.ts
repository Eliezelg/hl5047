import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: fileId } = await params;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Configuration manquante. Vérifiez GOOGLE_API_KEY dans .env' },
        { status: 500 }
      );
    }
    
    // URL de téléchargement direct pour les fichiers publics
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    
    // Récupérer d'abord les métadonnées du fichier
    const metadataUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,mimeType,size&key=${apiKey}`;
    const metadataResponse = await fetch(metadataUrl);
    
    if (!metadataResponse.ok) {
      throw new Error('Failed to fetch file metadata');
    }
    
    const metadata = await metadataResponse.json();
    
    // Télécharger le fichier
    const fileResponse = await fetch(downloadUrl);
    
    if (!fileResponse.ok) {
      throw new Error('Failed to download file');
    }
    
    // Créer les headers pour la réponse
    const headers = new Headers({
      'Content-Type': metadata.mimeType || 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(metadata.name || 'download.pdf')}"`,
      'Cache-Control': 'public, max-age=3600',
    });
    
    if (metadata.size) {
      headers.set('Content-Length', metadata.size);
    }
    
    // Retourner le fichier
    return new NextResponse(fileResponse.body, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}