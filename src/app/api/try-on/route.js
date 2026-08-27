import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { humanImage, garmImage } = await request.json();

    if (!humanImage || !garmImage) {
      return NextResponse.json(
        { error: 'Imagens da pessoa e da roupa são obrigatórias.' },
        { status: 400 }
      );
    }

    // Simula 3 segundos de processamento da IA
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Retorna a imagem do corpo para simular o resultado na tela
    return NextResponse.json({ resultUrl: humanImage });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao simular teste.' },
      { status: 500 }
    );
  }
}