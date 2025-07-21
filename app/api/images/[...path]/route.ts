import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const imagePath = params.path.join('/');
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Security check - prevent directory traversal
    const normalizedPath = path.normalize(fullPath);
    const publicDir = path.join(process.cwd(), 'public');
    if (!normalizedPath.startsWith(publicDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return new NextResponse('Not Found', { status: 404 });
    }
    
    // Read the file
    const file = await readFile(fullPath);
    
    // Determine content type
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}