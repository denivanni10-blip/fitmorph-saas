'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, Camera, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function AvatarBuilder() {
  const router = useRouter();
  
  const [images, setImages] = useState({ front: null, side: null, back: null });
  const [previews, setPreviews] = useState({ front: null, side: null, back: null });
  const [measures, setMeasures] = useState({ height: '', weight: '', chest: '', waist: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Captura o arquivo de imagem selecionado
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [type]: file }));
      setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
    }
  };

  // Envia as fotos para o Supabase e avança
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Pega o usuário logado atualmente
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Você precisa estar logado para enviar suas fotos.');
      }

      // 2. Faz o upload de cada uma das 3 fotos para o balde do Supabase
      for (const type of ['front', 'side', 'back']) {
        const file = images[type];
        if (file) {
          const fileExt = file.name.split('.').pop();
          const filePath = `${user.id}/${type}-${Date.now()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('user-photos')
            .upload(filePath, file);

          if (uploadError) throw uploadError;
        }
      }

      // 3. Sucesso! Redireciona para o Provador Virtual
      router.push('/dashboard');

    } catch (err) {
      setErrorMsg(err.message || 'Erro ao enviar as fotos. Verifique se as permissões do Supabase estão configuradas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider block mb-1">
            Passo 2 de 3
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Calibre seu Avatar 3D
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Envie 3 fotos corporais e suas medidas aproximadas para gerarmos seu manequim virtual com 98% de precisão.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* UPLOAD DAS 3 FOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'front', title: 'Foto de Frente', desc: 'Corpo inteiro virado para a câmera' },
              { id: 'side', title: 'Foto de Perfil', desc: 'Corpo de lado com postura ereta' },
              { id: 'back', title: 'Foto de Costas', desc: 'De costas para iluminação neutra' },
            ].map((slot) => (
              <div key={slot.id} className="bg-dark-800/60 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[260px] relative hover:border-slate-700 transition-all">
                
                {previews[slot.id] ? (
                  <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden group">
                    <img src={previews[slot.id]} alt={slot.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">
                        Trocar Foto
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, slot.id)} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-dark-900 border border-slate-700 flex items-center justify-center mb-3 text-slate-400">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white block mb-1">{slot.title}</span>
                    <span className="text-[11px] text-slate-500 block mb-4">{slot.desc}</span>
                    <span className="text-xs bg-brand-500/10 text-brand-500 border border-brand-500/30 px-3 py-1 rounded-lg font-semibold">
                      Selecionar
                    </span>
                    <input type="file" accept="image/*" required className="hidden" onChange={(e) => handleImageChange(e, slot.id)} />
                  </label>
                )}

              </div>
            ))}
          </div>

          {/* MEDIDAS CORPORAIS */}
          <div className="bg-dark-800/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Medidas Estimadas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Altura (cm)</label>
                <input type="number" required placeholder="Ex: 175" value={measures.height} onChange={(e) => setMeasures({...measures, height: e.target.value})} className="w-full bg-dark-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Peso (kg)</label>
                <input type="number" required placeholder="Ex: 72" value={measures.weight} onChange={(e) => setMeasures({...measures, weight: e.target.value})} className="w-full bg-dark-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tórax (cm)</label>
                <input type="number" placeholder="Ex: 98" value={measures.chest} onChange={(e) => setMeasures({...measures, chest: e.target.value})} className="w-full bg-dark-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Cintura (cm)</label>
                <input type="number" placeholder="Ex: 82" value={measures.waist} onChange={(e) => setMeasures({...measures, waist: e.target.value})} className="w-full bg-dark-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
              </div>
            </div>
          </div>

          {/* BOTÃO DE SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-black font-bold py-4 rounded-xl transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Enviando fotos para o Supabase...</span>
              </div>
            ) : (
              <>
                <span>Gerar Meu Avatar no Provador</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

        </form>
      </main>

      <Footer />
    </div>
  );
}