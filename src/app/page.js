'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Zap, Star, Sparkles, Upload, Shirt, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-slate-100 relative overflow-hidden">
      
      {/* EFEITOS DE FUNDO (GRID E LUZ) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="pt-32 pb-24 px-4 text-center max-w-5xl mx-auto">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-semibold mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>A revolução das compras online chegou</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                Descubra como a roupa fica <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-300">
                  no seu corpo real
                </span> antes de comprar.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Pare de imaginar e comece a ver. Nossa Inteligência Artificial veste qualquer peça de roupa na sua foto em segundos com um realismo impressionante.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-extrabold text-black bg-brand-500 rounded-xl hover:bg-brand-400 transition-all shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)] group"
                >
                  Testar Provador Virtual
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#planos" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Ver Pacotes de Crédito
                </a>
              </div>
            </div>
          </section>

          {/* SESSÃO: COMO FUNCIONA */}
          <section className="py-24 px-4 relative bg-dark-950/50 border-y border-white/5 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Como a mágica acontece</h2>
                <p className="text-slate-400 text-lg">Três passos simples para transformar sua experiência de compra.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Passo 1 */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative group hover:border-brand-500/50 transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-dark-900 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                    <Upload className="w-7 h-7 text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">1. Envie sua foto</h3>
                  <p className="text-slate-400 leading-relaxed">Faça upload de uma foto sua de corpo inteiro ou meio corpo. Quanto melhor a iluminação, melhor o resultado.</p>
                </div>
                {/* Passo 2 */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative group hover:border-brand-500/50 transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-dark-900 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                    <Shirt className="w-7 h-7 text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">2. Escolha a roupa</h3>
                  <p className="text-slate-400 leading-relaxed">Envie a foto da peça de roupa que você deseja provar (uma foto da peça sozinha, com fundo limpo).</p>
                </div>
                {/* Passo 3 */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative group hover:border-brand-500/50 transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-dark-900 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                    <Sparkles className="w-7 h-7 text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">3. Veja o resultado</h3>
                  <p className="text-slate-400 leading-relaxed">Nossa IA cruza os dados, ajusta o caimento, as dobras e a iluminação, gerando uma prova hiper-realista.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SESSÃO DE PLANOS E PREÇOS UNIFICADA COM KIWIFY */}
          <section className="py-24 px-4 relative" id="planos">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Planos de Créditos</h2>
                <p className="text-slate-400 text-lg">Sem assinaturas ou pegadinhas. Compre pacotes avulsos e pague apenas pelo que usar.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Pacote Básico */}
                <div className="bg-dark-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 flex flex-col hover:border-slate-600 transition-colors shadow-xl">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900 border border-slate-700 text-slate-300 text-xs font-bold mb-4">
                      <Zap className="w-3.5 h-3.5" /> Ideal para testar
                    </span>
                    <h3 className="text-2xl font-bold text-white">Pacote Básico</h3>
                    <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                      R$ 19,90
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Pagamento único</p>
                  </div>
                  <ul className="mt-6 mb-8 space-y-4 flex-1">
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span><strong>20 Créditos</strong> de Inteligência Artificial</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span>Gerações em alta qualidade</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span>Suporte via e-mail</span>
                    </li>
                  </ul>
                  <a href="https://pay.kiwify.com.br/esrXRjz" target="_blank" className="w-full py-4 rounded-xl bg-dark-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-center transition-colors">
                    Comprar 20 Créditos
                  </a>
                </div>

                {/* Pacote Pro */}
                <div className="bg-dark-800 backdrop-blur-sm border-2 border-brand-500 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.15)]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-500 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" /> Mais Vendido
                    </span>
                  </div>
                  <div className="mb-4 mt-2">
                    <h3 className="text-2xl font-bold text-white">Pacote Pro</h3>
                    <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                      R$ 49,90
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Pagamento único</p>
                  </div>
                  <ul className="mt-6 mb-8 space-y-4 flex-1">
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span><strong>100 Créditos</strong> de Inteligência Artificial</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span>Melhor custo-benefício (50% OFF)</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                      <span>Prioridade máxima na fila de geração</span>
                    </li>
                  </ul>
                  <a href="https://pay.kiwify.com.br/gXxqx6g" target="_blank" className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-center transition-colors shadow-lg shadow-brand-500/20">
                    Comprar 100 Créditos
                  </a>
                </div>

              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}