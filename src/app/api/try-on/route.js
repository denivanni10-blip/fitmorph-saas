import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@supabase/supabase-js';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(req) {
  try {
    const { human_img, garm_img, userId, category = 'upper_body' } = await req.json();

    if (!human_img || !garm_img) {
      return NextResponse.json(
        { error: 'Envie a foto do corpo e a foto da roupa.' },
        { status: 400 }
      );
    }

    if (userId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .maybeSingle();

      if (profile && typeof profile.credits === 'number' && profile.credits <= 0) {
        return NextResponse.json(
          { error: 'Voce nao tem creditos suficientes.' },
          { status: 402 }
        );
      }
    }

    // Versão oficial e canônica do IDM-VTON no Replicate
    const output = await replicate.run(
      'cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985',
      {
        input: {
          human_img: human_img,
          garm_img: garm_img,
          garment_des: 'clothing item',
          category: category,
          steps: 30,
          seed: 42,
          crop: false
        },
      }
    );

    let resultImageUrl = null;
    if (Array.isArray(output)) {
      resultImageUrl = output[0];
    } else if (typeof output === 'string') {
      resultImageUrl = output;
    } else if (output && typeof output.url === 'function') {
      resultImageUrl = output.url();
    } else if (output && output.href) {
      resultImageUrl = output.href;
    }

    if (!resultImageUrl) {
      throw new Error('Nenhuma imagem retornada pela IA.');
    }

    const finalUrl = typeof resultImageUrl === 'object' ? (resultImageUrl.href || String(resultImageUrl)) : String(resultImageUrl);

    if (userId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .maybeSingle();

      if (profile && profile.credits > 0) {
        await supabaseAdmin
          .from('profiles')
          .update({ credits: profile.credits - 1 })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ result: finalUrl });
  } catch (error) {
    console.error('Erro na IA:', error);
    return NextResponse.json(
      { error: error.message || 'Falha ao processar prova virtual.' },
      { status: 500 }
    );
  }
}