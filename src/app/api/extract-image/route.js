import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'URL inválida.' }, { status: 400 });
    }

    // Busca a imagem diretamente da fonte (Shopee, Shein, CDN, etc)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Não foi possível carregar a imagem do link fornecido.' }, { status: 400 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${contentType};base64,${buffer.toString('base64')}`;

    return NextResponse.json({ imageBase64: base64Image });
  } catch (error) {
    console.error('Erro ao extrair imagem da URL:', error);
    return NextResponse.json({ error: 'Falha ao processar link da imagem.' }, { status: 500 });
  }
}