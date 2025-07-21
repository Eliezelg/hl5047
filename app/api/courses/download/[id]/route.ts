import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
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
    
    // Download the file
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    const fileResponse = await fetch(downloadUrl);
    
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }

    // Set headers for download
    const headers = new Headers({
      'Content-Type': metadata.mimeType || 'audio/mpeg',
      'Content-Disposition': `attachment; filename="${metadata.name}"`,
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