import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: fileId } = await params;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Get file metadata first
    const metadataUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,mimeType,size&key=${apiKey}`;
    const metadataResponse = await fetch(metadataUrl);
    
    if (!metadataResponse.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const metadata = await metadataResponse.json();
    
    // For public files, use the direct download URL
    const publicDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Try the public download URL
    const fileResponse = await fetch(publicDownloadUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!fileResponse.ok) {
      // Fallback to API method
      const apiDownloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
      const apiResponse = await fetch(apiDownloadUrl);
      
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error('Download failed:', errorText);
        return NextResponse.json({ error: 'Failed to download file', details: errorText }, { status: 500 });
      }
      
      const encodedName = encodeURIComponent(metadata.name || 'audio.mp3').replace(/'/g, '%27');
      return new NextResponse(apiResponse.body, {
        status: 200,
        headers: {
          'Content-Type': metadata.mimeType || 'audio/mpeg',
          'Content-Disposition': `attachment; filename*=UTF-8''${encodedName}`,
        },
      });
    }

    // Set headers for download
    // Encode filename properly for headers
    const encodedFilename = encodeURIComponent(metadata.name || 'audio.mp3').replace(/'/g, '%27');
    
    const headers = new Headers({
      'Content-Type': metadata.mimeType || 'audio/mpeg',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
    });

    if (metadata.size) {
      headers.set('Content-Length', metadata.size);
    }

    // Return the file for download
    return new NextResponse(fileResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}