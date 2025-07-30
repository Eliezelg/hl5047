// Service simplifié pour Google Drive avec des dossiers publics
// IMPORTANT: Les dossiers et fichiers doivent être partagés publiquement

interface PublicDriveFile {
  id: string;
  name: string;
  webViewLink: string;
  mimeType: string;
}

export class SimpleGoogleDriveService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/drive/v3';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async listPublicFolderContents(folderId: string): Promise<PublicDriveFile[]> {
    try {
      const url = `${this.baseUrl}/files?q='${folderId}'+in+parents+and+trashed=false&key=${this.apiKey}&fields=files(id,name,webViewLink,mimeType)&pageSize=1000`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Google Drive API error:', response.status, errorData);
        throw new Error(`Google Drive API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      console.log('Files found:', data.files?.length || 0);
      return data.files || [];
    } catch (error) {
      console.error('Error fetching folder contents:', error);
      throw error;
    }
  }

  async syncPublicCourses(folderId: string): Promise<{
    folders: { name: string; files: PublicDriveFile[] }[];
  }> {
    try {
      // Récupérer tous les fichiers et dossiers
      const items = await this.listPublicFolderContents(folderId);
      
      // Séparer les dossiers et les fichiers
      const folders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
      // Accepter TOUS les fichiers qui ne sont pas des dossiers
      const rootFiles = items.filter(item => item.mimeType !== 'application/vnd.google-apps.folder');
      
      console.log('=== ALL FOLDERS FOUND ===');
      console.log('Total folders:', folders.length);
      folders.forEach(folder => {
        console.log(`- ${folder.name} (ID: ${folder.id})`);
      });
      console.log('========================');
      
      console.log('Root files found:', rootFiles.length);
      console.log('File types:', rootFiles.map(f => ({ name: f.name, mimeType: f.mimeType })));

      const result = {
        folders: [] as { name: string; files: PublicDriveFile[] }[],
      };

      // Récupérer les fichiers de chaque sous-dossier
      for (const folder of folders) {
        console.log(`Processing folder: ${folder.name} (ID: ${folder.id})`);
        const folderFiles = await this.listPublicFolderContents(folder.id);
        
        // Vérifier s'il y a des sous-dossiers
        const subFolders = folderFiles.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
        const directFiles = folderFiles.filter(file => file.mimeType !== 'application/vnd.google-apps.folder');
        
        console.log(`Folder ${folder.name}: found ${subFolders.length} subfolders and ${directFiles.length} files`);
        
        // Si le dossier contient des sous-dossiers, les traiter
        if (subFolders.length > 0) {
          for (const subFolder of subFolders) {
            const subFolderFiles = await this.listPublicFolderContents(subFolder.id);
            const subCourseFiles = subFolderFiles.filter(file => file.mimeType !== 'application/vnd.google-apps.folder');
            const subSubFolders = subFolderFiles.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
            
            // Si le sous-dossier contient des fichiers, l'ajouter
            if (subCourseFiles.length > 0) {
              result.folders.push({
                name: `${folder.name} > ${subFolder.name}`,
                files: subCourseFiles,
              });
            }
            
            // Si le sous-dossier contient des sous-sous-dossiers (3ème niveau), les traiter aussi
            if (subSubFolders.length > 0) {
              console.log(`Sub-folder ${subFolder.name} has ${subSubFolders.length} sub-sub-folders`);
              for (const subSubFolder of subSubFolders) {
                console.log(`Processing sub-sub-folder: ${subSubFolder.name} (ID: ${subSubFolder.id})`);
                const subSubFolderFiles = await this.listPublicFolderContents(subSubFolder.id);
                const courseFiles = subSubFolderFiles.filter(file => file.mimeType !== 'application/vnd.google-apps.folder');
                
                console.log(`Found ${courseFiles.length} files in ${subSubFolder.name}`);
                
                if (courseFiles.length > 0) {
                  result.folders.push({
                    name: `${folder.name} > ${subFolder.name} > ${subSubFolder.name}`,
                    files: courseFiles,
                  });
                }
              }
            }
          }
        }
        
        // Si le dossier contient directement des fichiers
        if (directFiles.length > 0) {
          result.folders.push({
            name: folder.name,
            files: directFiles,
          });
        }
      }

      // Ajouter les fichiers à la racine
      if (rootFiles.length > 0) {
        result.folders.push({
          name: 'Général',
          files: rootFiles,
        });
      }

      return result;
    } catch (error) {
      console.error('Error syncing courses:', error);
      throw error;
    }
  }
}