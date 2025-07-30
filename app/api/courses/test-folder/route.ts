import { NextResponse } from 'next/server';
import { SimpleGoogleDriveService } from '@/services/simpleGoogleDrive';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' });
    }

    const driveService = new SimpleGoogleDriveService(apiKey);
    
    // Test direct avec l'ID du dossier problématique
    const folderId = '1JBIfPitmbJsAynOgNIYkzJn-W8gHG_m0';
    
    // 1. Récupérer le contenu du dossier
    const files = await driveService.listPublicFolderContents(folderId);
    
    // 2. Séparer les sous-dossiers
    const subFolders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
    
    // 3. Récupérer le contenu du premier sous-dossier pour test
    let firstSubFolderContent = null;
    if (subFolders.length > 0) {
      firstSubFolderContent = await driveService.listPublicFolderContents(subFolders[0].id);
    }
    
    // 4. Tester le processus complet de synchronisation pour ce dossier
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '';
    const fullSync = await driveService.syncPublicCourses(rootFolderId);
    
    // Chercher ce dossier dans les résultats
    const thisFolder = fullSync.folders.filter(f => 
      f.name.includes('מועדים') || 
      f.name.includes('המועדים') ||
      f.name === 'שיעורים הלכות המועדים'
    );

    return NextResponse.json({
      folderName: 'שיעורים הלכות המועדים',
      folderId: folderId,
      totalSubFolders: subFolders.length,
      subFolderNames: subFolders.map(f => f.name),
      firstSubFolderContent: firstSubFolderContent ? {
        name: subFolders[0].name,
        fileCount: firstSubFolderContent.filter(f => f.mimeType !== 'application/vnd.google-apps.folder').length
      } : null,
      foundInFullSync: thisFolder.length > 0,
      syncResults: thisFolder,
      allSyncedFolders: fullSync.folders.map(f => f.name)
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error during test', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}