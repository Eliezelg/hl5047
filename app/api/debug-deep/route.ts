import { NextResponse } from 'next/server';
import { SimpleGoogleDriveService } from '@/services/simpleGoogleDrive';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' });
    }

    const driveService = new SimpleGoogleDriveService(apiKey);
    
    // Test avec le dossier "שיעורים הלכות המועדים"
    const folderId = '1JBIfPitmbJsAynOgNIYkzJn-W8gHG_m0';
    
    // 1. Récupérer les sous-dossiers
    const files = await driveService.listPublicFolderContents(folderId);
    const subFolders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
    
    // 2. Pour chaque sous-dossier, explorer en profondeur
    const detailedStructure: any[] = [];
    
    for (const subFolder of subFolders.slice(0, 3)) { // Limiter à 3 pour le test
      const subFolderContent = await driveService.listPublicFolderContents(subFolder.id);
      const subSubFolders = subFolderContent.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
      const directFiles = subFolderContent.filter(f => f.mimeType !== 'application/vnd.google-apps.folder');
      
      const subSubDetails = [];
      
      // Explorer le 3ème niveau
      for (const subSubFolder of subSubFolders.slice(0, 2)) { // Limiter à 2 pour le test
        const level3Content = await driveService.listPublicFolderContents(subSubFolder.id);
        const level3Files = level3Content.filter(f => f.mimeType !== 'application/vnd.google-apps.folder');
        
        subSubDetails.push({
          name: subSubFolder.name,
          id: subSubFolder.id,
          fileCount: level3Files.length,
          firstFiles: level3Files.slice(0, 3).map(f => ({
            name: f.name,
            mimeType: f.mimeType
          }))
        });
      }
      
      detailedStructure.push({
        name: subFolder.name,
        id: subFolder.id,
        directFileCount: directFiles.length,
        subFolderCount: subSubFolders.length,
        subSubFolders: subSubDetails
      });
    }
    
    // 3. Tester la synchronisation complète
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '';
    const fullSync = await driveService.syncPublicCourses(rootFolderId);
    
    // Chercher les entrées pour ce dossier
    const thisFolder = fullSync.folders.filter(f => 
      f.name.includes('שיעורים הלכות המועדים')
    );

    return NextResponse.json({
      mainFolder: {
        name: 'שיעורים הלכות המועדים',
        id: folderId,
        totalSubFolders: subFolders.length
      },
      detailedStructure: detailedStructure,
      syncResults: {
        foundInSync: thisFolder.length > 0,
        entries: thisFolder.slice(0, 10), // Limiter à 10 pour la lisibilité
        totalEntriesForThisFolder: thisFolder.length
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error during test', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}