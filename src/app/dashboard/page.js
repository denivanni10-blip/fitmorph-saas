'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Upload, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Shirt, 
  User, 
  CheckCircle2, 
  AlertCircle,
  History,
  Clock,
  Trash2,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  // Estados da Aplicação
  const [humanImage, setHumanImage] = useState(null);
  const [garmImage, setGarmImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // PROTEÇÃO DE ROTA & CARREGAR DADOS DO USUÁRIO
  useEffect(() => {
    const checkUserAndLoadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setAuthChecking(false);
        fetchUserData(user.id);
        fetchHistory(user.id);
      }
    };

    checkUserAndLoadData();
  }, [router]);

  // Carregar Créditos do Perfil
  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setCredits(data.credits);
      }
    } catch (err) {
      console.error('Erro ao buscar créditos:', err.message);
    }
  };

  // Buscar Histórico no Supabase
  const fetchHistory = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err.message);
    }
  };

  // Upload da foto do corpo
  const handleHumanUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHumanImage(reader.result);
        setResultUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload da foto da roupa
  const handleGarmUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGarmImage(reader.result);
        setResultUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Processar Prova de Roupa
  const handleTryOn = async () => {
    if (!humanImage || !garmImage) {
      setError('Por favor, selecione a foto do seu corpo e a foto da roupa.');
      return;
    }

    if (credits <= 0) {
      setError('Você não possui créditos suficientes. Recarregue seu plano para continuar provando!');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          humanImage,
          garmImage,
          description: 'camiseta',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar imagem.');
      }

      const generatedUrl = data.resultUrl;
      setResultUrl(generatedUrl);

      // Desconta 1 crédito no Supabase
      const newCredits = credits - 1;
      const { error: creditError } = await supabase
        .from('profiles')
        .update({ credits: newCredits })
        .eq('id', user.id);

      if (!creditError) {
        setCredits(newCredits);
      }

      // Salva no Histórico do Supabase
      const { data: insertedData, error: dbError } = await supabase
        .from('history')
        .insert([
          {
            user_id: user.id,
            result_url: generatedUrl,
            garm_url: garmImage,
          },
        ])
        .select();

      if (!dbError && insertedData) {
        setHistory((prev) => [insertedData[0], ...prev]);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Baixar foto
  const handleDownload = async (url) => {
    const downloadTarget = url || resultUrl;
    if (!downloadTarget) return;

    try {
      const response = await fetch(downloadTarget);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `fitmorph-provador-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement('a');
      link.href = downloadTarget;
      link.download = `fitmorph-provador-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleResetGarment = () => {
    setGarmImage(null);
    setResultUrl(null);
  };

  const handleRemoveHistoryItem = async (id) => {
    try {
      const { error } = await supabase
        .from('history')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err.message);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-slate-400 text-sm font-semibold">
        Verificando permissões de acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* TÍTULO */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Provador Virtual 3D
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Selecione uma peça de roupa para ver o caimento exato no seu corpo.
          </p>
        </div>

        {/* ALERTA DE CRÉDITOS ZERADOS */}
        {credits <= 0 && (
          <div className="max-w-xl mx-auto mb-8 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between gap-4 text-amber-400 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 shrink-0 fill-amber-400" />
              <span>Seus créditos acabaram! Adquira mais créditos para continuar usando a IA.</span>
            </div>
            <Link
              href="/planos"
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl whitespace-nowrap transition-colors"
            >
              Comprar Créditos
            </Link>
          </div>
        )}

        {/* MENSAGEM DE ERRO */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* GRID DOS 3 PAINÉIS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-16">
          
          {/* PAINEL 1: CORPO */}
          <div className="bg-dark-800/50 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-4 flex items-center gap-1.5">
              <User className="w-4 h-4" /> 1. Seu Corpo
            </span>

            <div className="w-full aspect-[3/4] bg-dark-900/80 border-2 border-dashed border-slate-700 rounded-xl overflow-hidden relative flex flex-col items-center justify-center group hover:border-brand-500/50 transition-colors">
              {humanImage ? (
                <img src={humanImage} alt="Seu Corpo" className="w-full h-full object-cover" />
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                  <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-brand-500 transition-colors" />
                  <span className="text-xs text-slate-300 font-semibold">Enviar foto do corpo</span>
                  <span className="text-[10px] text-slate-500 mt-1">PNG ou JPG até 10MB</span>
                  <input type="file" accept="image/*" onChange={handleHumanUpload} className="hidden" />
                </label>
              )}
            </div>

            {humanImage && (
              <label className="mt-3 text-xs text-slate-400 hover:text-white underline cursor-pointer">
                Trocar foto do corpo
                <input type="file" accept="image/*" onChange={handleHumanUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* PAINEL 2: ROUPA */}
          <div className="bg-dark-800/50 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-4 flex items-center gap-1.5">
              <Shirt className="w-4 h-4" /> 2. Roupa para Provar
            </span>

            <div className="w-full aspect-[3/4] bg-dark-900/80 border-2 border-dashed border-slate-700 rounded-xl overflow-hidden relative flex flex-col items-center justify-center group hover:border-brand-500/50 transition-colors">
              {garmImage ? (
                <img src={garmImage} alt="Roupa" className="w-full h-full object-cover" />
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                  <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover:text-brand-500 transition-colors" />
                  <span className="text-xs text-slate-300 font-semibold">Enviar foto da roupa</span>
                  <span className="text-[10px] text-slate-500 mt-1">Camiseta, jaqueta, etc.</span>
                  <input type="file" accept="image/*" onChange={handleGarmUpload} className="hidden" />
                </label>
              )}
            </div>

            <button
              onClick={handleTryOn}
              disabled={loading || !humanImage || !garmImage || credits <= 0}
              className={`w-full mt-4 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                loading || !humanImage || !garmImage || credits <= 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-brand-500 hover:bg-brand-600 text-black shadow-lg shadow-brand-500/20'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gerando com IA (~20s)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{credits <= 0 ? 'Sem Créditos Disponíveis' : 'Provar Roupa Agora (-1 Crédito)'}</span>
                </>
              )}
            </button>
          </div>

          {/* PAINEL 3: RESULTADO */}
          <div className="bg-dark-800/50 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-4 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 3. Resultado IA
            </span>

            <div className="w-full aspect-[3/4] bg-dark-900/80 border border-slate-800 rounded-xl overflow-hidden relative flex items-center justify-center">
              {resultUrl ? (
                <img src={resultUrl} alt="Resultado IA" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">
                    {loading
                      ? 'A IA está vestindo a peça no seu corpo...'
                      : 'O resultado da sua prova aparecerá aqui.'}
                  </p>
                </div>
              )}
            </div>

            {resultUrl && (
              <div className="w-full grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => handleDownload(resultUrl)}
                  className="py-2.5 px-3 bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Foto</span>
                </button>

                <button
                  onClick={handleResetGarment}
                  className="py-2.5 px-3 bg-dark-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Provar Outra</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* HISTÓRICO */}
        <div className="border-t border-slate-800 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold text-white">Histórico de Provas Salvas</h2>
            </div>
            {history.length > 0 && (
              <span className="text-xs bg-dark-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full font-semibold">
                {history.length} {history.length === 1 ? 'resultado' : 'resultados'}
              </span>
            )}
          </div>

          {history.length === 0 ? (
            <div className="bg-dark-800/20 border border-slate-800/80 rounded-2xl p-10 text-center">
              <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-300">Nenhuma prova no histórico ainda</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Assim que você clicar em "Provar Roupa Agora", seus testes serão salvos permanentemente na sua conta.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-dark-800/60 border border-slate-800 hover:border-brand-500/40 rounded-xl overflow-hidden group transition-all"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-dark-900">
                    <img
                      src={item.result_url}
                      alt="Prova Anterior"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {item.garm_url && (
                      <div className="absolute top-2 left-2 w-7 h-7 rounded-lg overflow-hidden border border-white/20 shadow-md">
                        <img src={item.garm_url} alt="Roupa" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <button
                      onClick={() => handleRemoveHistoryItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      title="Excluir do histórico"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => handleDownload(item.result_url)}
                      className="p-1.5 bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-black rounded-lg transition-colors"
                      title="Baixar Foto"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}