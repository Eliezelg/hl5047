// app/api/auth/route.ts
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = "Lemaaseh";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: 'admin_authenticated' });
    }
    
    return NextResponse.json({ success: false, message: 'Mot de passe incorrect' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' });
  }
}