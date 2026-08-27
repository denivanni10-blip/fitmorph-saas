import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@supabase/supabase-js';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (!profile || profile.credits <= 0) {
        return NextResponse.json(
          { error: 'Voce nao tem creditos suficientes.' },
          { status: 402 }
        );
      }
    }

    const output = await replicate.run(
      'cuuupid/idm-vton:c871bb9b046607b680449ec0ddf3827c6d03f3017ea28b1e2e5aa65c6a704eac',
      {
        input: {
          human_img: human_img,
          garm_img: garm_img,
          garment_des: 'clothing item to try on',
          category: category,
          n_steps: 30,
          seed: 42,
        },
      }
    );

    const resultImageUrl = Array.isArray(output) ? output[0] : output;

    if (userId && resultImageUrl) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (profile && profile.credits > 0) {
        await supabase
          .from('profiles')
          .update({ credits: profile.credits - 1 })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ result: resultImageUrl });
  } catch (error) {
    console.error('Erro na IA:', error);
    return NextResponse.json(
      { error: error.message || 'Falha ao processar prova virtual.' },
      { status: 500 }
    );
  }
}