import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: fileId } = await params;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    console.log('Streaming file:', fileId);
    
    if (!apiKey) {
      console.error('Google API key not configured');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Get file metadata first
    const metadataUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,mimeType,size&key=${apiKey}`;
    const metadataResponse = await fetch(metadataUrl);
    
    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text();
      console.error('Metadata fetch failed:', errorText);
      return NextResponse.json({ error: 'File not found', details: errorText }, { status: 404 });
    }
    
    const metadata = await metadataResponse.json();
    console.log('File metadata:', metadata);
    
    // For public files, we need to use a different approach
    // Check if the file is publicly accessible
    const publicDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Try the public download URL first
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
        return NextResponse.json({ error: 'Failed to fetch file', details: errorText }, { status: 500 });
      }
      
      const encodedName = encodeURIComponent(metadata.name || 'audio.mp3').replace(/'/g, '%27');
      return new NextResponse(apiResponse.body, {
        status: 200,
        headers: {
          'Content-Type': metadata.mimeType || 'audio/mpeg',
          'Content-Disposition': `inline; filename*=UTF-8''${encodedName}`,
          'Accept-Ranges': 'bytes',
        },
      });
    }

    // Set appropriate headers for audio streaming
    // Encode filename properly for headers
    const encodedFilename = encodeURIComponent(metadata.name || 'audio.mp3').replace(/'/g, '%27');
    
    const headers = new Headers({
      'Content-Type': metadata.mimeType || 'audio/mpeg',
      'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,
      'Accept-Ranges': 'bytes',
    });

    if (metadata.size) {
      headers.set('Content-Length', metadata.size);
    }

    // Return the audio stream
    return new NextResponse(fileResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error streaming file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}