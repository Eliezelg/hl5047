import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!apiKey || !folderId) {
      return NextResponse.json({ error: 'Missing API key or folder ID' });
    }

    // 1. Vérifier le dossier racine
    const rootUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&pageSize=1000`;
    const rootResponse = await fetch(rootUrl);
    const rootData = await rootResponse.json();
    
    const folders = rootData.files?.filter((item: any) => item.mimeType === 'application/vnd.google-apps.folder') || [];
    
    // Vérifier le contenu de chaque dossier
    const folderContents: any = {};
    for (const folder of folders) {
      const contentUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&pageSize=10`;
      const contentResponse = await fetch(contentUrl);
      const contentData = await contentResponse.json();
      folderContents[folder.name] = {
        id: folder.id,
        fileCount: contentData.files?.filter((f: any) => f.mimeType !== 'application/vnd.google-apps.folder').length || 0,
        folderCount: contentData.files?.filter((f: any) => f.mimeType === 'application/vnd.google-apps.folder').length || 0,
        totalItems: contentData.files?.length || 0
      };
    }
    
    // 2. Vérifier si le dossier problématique existe
    const problematicFolder = folders.find((f: any) => f.name.includes('שיעורים') || f.name.includes('המועדים'));
    
    // 3. Test direct avec l'ID du dossier
    const testFolderId = '1JBIfPitmbJsAynOgNIYkzJn-W8gHG_m0';
    const testUrl = `https://www.googleapis.com/drive/v3/files/${testFolderId}?key=${apiKey}&fields=id,name,mimeType,parents`;
    const testResponse = await fetch(testUrl);
    const testData = await testResponse.json();
    
    // 4. Vérifier le parent du dossier problématique
    let parentCheck = null;
    if (testData.parents && testData.parents[0]) {
      const parentUrl = `https://www.googleapis.com/drive/v3/files/${testData.parents[0]}?key=${apiKey}&fields=id,name`;
      const parentResponse = await fetch(parentUrl);
      parentCheck = await parentResponse.json();
    }

    return NextResponse.json({
      rootFolderId: folderId,
      totalFoldersInRoot: folders.length,
      allFolderNames: folders.map((f: any) => f.name),
      folderContents: folderContents,
      problematicFolderInRoot: problematicFolder,
      directAccessToFolder: testData,
      parentOfProblematicFolder: parentCheck,
      isInCorrectParent: testData.parents?.includes(folderId)
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error during debug', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}