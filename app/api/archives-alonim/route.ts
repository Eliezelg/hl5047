import { NextResponse } from 'next/server';
import { SimpleGoogleDriveService } from '@/services/simpleGoogleDrive';

// ID du dossier des archives alonim
const ALONIM_FOLDER_ID = '1x0tl4KtUUCZsqSTEh3tzdOQnIOxcti8k';

interface ArchiveItem {
  id: string;
  title: string;
  driveUrl: string;
  folder: string;
  type: 'pdf' | 'folder';
}

async function listFilesRecursive(driveService: SimpleGoogleDriveService, folderId: string, path: string = ''): Promise<ArchiveItem[]> {
  const items: ArchiveItem[] = [];
  
  try {
    // Récupérer tous les fichiers et dossiers dans le dossier actuel
    const files = await driveService.listPublicFolderContents(folderId);

    for (const file of files) {
      const currentPath = path ? `${path} > ${file.name}` : file.name || '';
      
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        // C'est un dossier, récupérer son contenu récursivement
        const subItems = await listFilesRecursive(driveService, file.id, currentPath);
        items.push(...subItems);
      } else if (file.mimeType === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf')) {
        // C'est un PDF
        items.push({
          id: file.id,
          title: file.name || 'Sans titre',
          driveUrl: file.webViewLink || '',
          folder: path,
          type: 'pdf'
        });
      }
    }
  } catch (error) {
    console.error('Error listing files:', error);
  }

  return items;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Configuration manquante. Vérifiez GOOGLE_API_KEY dans .env' },
        { status: 500 }
      );
    }

    const driveService = new SimpleGoogleDriveService(apiKey);
    
    // Récupérer tous les fichiers depuis le dossier principal
    const items = await listFilesRecursive(driveService, ALONIM_FOLDER_ID);
    
    // Trier par dossier puis par nom
    items.sort((a, b) => {
      // D'abord par dossier
      const folderCompare = a.folder.localeCompare(b.folder, 'he');
      if (folderCompare !== 0) return folderCompare;
      
      // Ensuite par nom (en ordre décroissant pour avoir les plus récents en premier)
      return b.title.localeCompare(a.title, 'he');
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error in archives-alonim API:', error);
    return NextResponse.json({ error: 'Failed to fetch alonim archives' }, { status: 500 });
  }
}