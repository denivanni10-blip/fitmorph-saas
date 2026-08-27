'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  const [humanImage, setHumanImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const [garmentMode, setGarmentMode] = useState('link');
  const [garmentUrlInput, setGarmentUrlInput] = useState('');
  const [category, setCategory] = useState('upper_body');

  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingTryOn, setLoadingTryOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCredits(profile.credits || 0);
      }
    };

    fetchUserData();
  }, [router]);

  const handleHumanUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setHumanImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGarmentImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExtractFromUrl = async () => {
    if (!garmentUrlInput.trim()) return;
    setLoadingExtract(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/extract-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: garmentUrlInput.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.imageBase64) {
        setGarmentImage(data.imageBase64);
      } else {
        setErrorMessage(data.error || 'Erro ao carregar imagem pelo link.');
      }
    } catch (err) {
      setErrorMessage('Erro de conexao ao processar link.');
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleRunTryOn = async () => {
    if (!humanImage || !garmentImage) {
      setErrorMessage('Envie a foto do seu corpo e a foto da roupa.');
      return;
    }

    if (credits <= 0) {
      router.push('/planos');
      return;
    }

    setLoadingTryOn(true);
    setErrorMessage('');
    setResultImage(null);

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          human_img: humanImage,
          garm_img: garmentImage,
          category: category,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (res.ok && data.result) {
        setResultImage(data.result);
        setCredits((prev) => Math.max(0, prev - 1));
      } else {
        setErrorMessage(data.error || 'Falha ao processar o provador virtual.');
      }
    } catch (err) {
      setErrorMessage('Erro de servidor ao processar a prova virtual.');
    } finally {
      setLoadingTryOn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-brand-500" />
              Provador Virtual IA
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cole o link da peca ou faca upload da foto para provar no seu corpo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-dark-800 border border-slate-700/80 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="text-slate-300">Saldo:</span>
              <span className="text-brand-500">{credits} Creditos</span>
            </div>

            <button
              onClick={() => router.push('/planos')}
              className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-xs transition-all shadow-md shadow-brand-500/10"
            >
              Recarregar
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* 1. SEU CORPO */}
          <div className="bg-dark-800/40 border border-slate-800 rounded-3xl p-5 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Seu Corpo</span>
              {humanImage && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
            </div>

            <div className="flex-1 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-dark-900/50 min-h-[360px]">
              {humanImage ? (
                <img src={humanImage} alt="Corpo" className="w-full h-full object-contain" />
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center p-6 text-center w-full h-full">
                  <Upload className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-300">Carregar foto de corpo inteiro</span>
                  <span className="text-[10px] text-slate-500 mt-1">JPEG ou PNG (Frente clara)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleHumanUpload} />
                </label>
              )}
            </div>

            {humanImage && (
              <label className="mt-3 py-2 text-center text-xs font-bold text-slate-400 hover:text-white cursor-pointer transition-all">
                Trocar Foto
                <input type="file" accept="image/*" className="hidden" onChange={handleHumanUpload} />
              </label>
            )}
          </div>

          {/* 2. ROUPA */}
          <div className="bg-dark-800/40 border border-slate-800 rounded-3xl p-5 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Peca de Roupa</span>
              {garmentImage && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1 bg-dark-900/90 rounded-xl mb-3 border border-slate-800">
              <button
                type="button"
                onClick={() => setGarmentMode('link')}
                className={`py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  garmentMode === 'link' ? 'bg-brand-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Colar Link
              </button>
              <button
                type="button"
                onClick={() => setGarmentMode('upload')}
                className={`py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  garmentMode === 'upload' ? 'bg-brand-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Upload Foto
              </button>
            </div>

            {garmentMode === 'link' && (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Cole a URL da imagem da roupa..."
                  value={garmentUrlInput}
                  onChange={(e) => setGarmentUrlInput(e.target.value)}
                  className="flex-1 bg-dark-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <button
                  type="button"
                  onClick={handleExtractFromUrl}
                  disabled={loadingExtract || !garmentUrlInput}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
                >
                  {loadingExtract ? '...' : 'Carregar'}
                </button>
              </div>
            )}

            <div className="flex-1 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-dark-900/50 min-h-[300px]">
              {garmentImage ? (
                <img src={garmentImage} alt="Roupa" className="w-full h-full object-contain" />
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center p-6 text-center w-full h-full">
                  <Layers className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-300">
                    {garmentMode === 'upload' ? 'Selecione a foto da peca' : 'Cole a URL acima e clique em Carregar'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">Camisetas, calcas, saias ou vestidos</span>
                  {garmentMode === 'upload' && (
                    <input type="file" accept="image/*" className="hidden" onChange={handleGarmentUpload} />
                  )}
                </label>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[
                { id: 'upper_body', label: 'Superior' },
                { id: 'lower_body', label: 'Inferior' },
                { id: 'dresses', label: 'Vestido' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    category === cat.id
                      ? 'bg-brand-500/10 border-brand-500 text-brand-500'
                      : 'bg-dark-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. RESULTADO IA */}
          <div className="bg-dark-800/40 border border-slate-800 rounded-3xl p-5 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Resultado IA</span>
              {resultImage && <span className="text-[10px] font-extrabold text-brand-500 px-2 py-0.5 rounded bg-brand-500/10">Pronto</span>}
            </div>

            <div className="flex-1 border-2 border-dashed border-slate-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-dark-900/50 min-h-[360px]">
              {loadingTryOn ? (
                <div className="flex flex-col items-center gap-3 p-6 text-center">
                  <RefreshCw className="w-8 h-8 text-brand-500 animate-spin" />
                  <span className="text-xs font-bold text-white">Vestindo a roupa no seu corpo...</span>
                  <span className="text-[10px] text-slate-400">Ajustando caimento e sombreamento</span>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="Resultado IA" className="w-full h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center text-slate-500">
                  <Sparkles className="w-8 h-8 opacity-40 mb-1" />
                  <span className="text-xs font-medium">O resultado aparecera aqui</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              {resultImage ? (
                <>
                  <a
                    href={resultImage}
                    target="_blank"
                    download="fitmorph-resultado.png"
                    className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar Foto
                  </a>
                  <button
                    onClick={() => setResultImage(null)}
                    className="px-4 py-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 transition-all"
                  >
                    Nova Prova
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleRunTryOn}
                  disabled={loadingTryOn || !humanImage || !garmentImage}
                  className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/10"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  {loadingTryOn ? 'Processando Prova...' : 'Provar Roupa Agora (-1 Credito)'}
                </button>
              )}
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}