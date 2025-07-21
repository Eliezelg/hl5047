import { NextResponse } from 'next/server';
import { SimpleGoogleDriveService } from '@/services/simpleGoogleDrive';
import { courseService } from '@/services/courses';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!apiKey || !folderId) {
      return NextResponse.json(
        { error: 'Configuration manquante. Vérifiez GOOGLE_API_KEY et GOOGLE_DRIVE_FOLDER_ID dans .env' },
        { status: 500 }
      );
    }

    console.log('Starting sync with folder:', folderId);

    // Initialiser le service Google Drive
    const driveService = new SimpleGoogleDriveService(apiKey);
    
    // Récupérer les cours depuis Google Drive
    const driveData = await driveService.syncPublicCourses(folderId);
    console.log('Drive data received:', JSON.stringify(driveData, null, 2));
    
    // Récupérer les cours existants
    const existingCourses = await courseService.getAllCourses();
    const existingUrlsMap = new Map(existingCourses.map(c => [c.driveUrl, c]));
    
    let coursesAdded = 0;
    let coursesUpdated = 0;
    
    // Synchroniser les cours
    for (const folder of driveData.folders) {
      let order = 0;
      
      for (const file of folder.files) {
        const existingCourse = existingUrlsMap.get(file.webViewLink);
        
        if (existingCourse) {
          // Mettre à jour le cours existant si nécessaire
          if (existingCourse.title !== file.name || existingCourse.folder !== folder.name) {
            await courseService.updateCourse(existingCourse.id, {
              title: file.name,
              folder: folder.name,
            });
            coursesUpdated++;
          }
        } else {
          // Créer un nouveau cours
          await courseService.createCourse({
            title: file.name,
            folder: folder.name,
            driveUrl: file.webViewLink,
            order: order++,
          });
          coursesAdded++;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      coursesAdded,
      coursesUpdated,
      totalFolders: driveData.folders.length,
      totalFiles: driveData.folders.reduce((sum, f) => sum + f.files.length, 0),
    });
  } catch (error) {
    console.error('Error syncing courses:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la synchronisation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}