'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Zap, Star } from 'lucide-react';

export default function PlanosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Escolha o seu plano de créditos
          </h1>
          <p className="text-sm text-slate-400">
            Compre créditos para gerar suas provas de roupas com Inteligência Artificial. Cada geração consome 1 crédito. Sem assinaturas mensais, pague apenas pelo que usar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Plano Básico */}
          <div className="bg-dark-800/40 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-slate-700 transition-all">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-4">
                <Zap className="w-3.5 h-3.5" /> Inicial
              </span>
              <h2 className="text-2xl font-bold text-white">Pacote Básico</h2>
              <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                R$ 19,90
              </div>
              <p className="text-xs text-slate-400 mt-2">Pagamento único</p>
            </div>

            <ul className="mt-6 mb-8 space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span><strong>20 Créditos</strong> de IA</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Gerações em alta qualidade</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Suporte via e-mail</span>
              </li>
            </ul>

            <a 
              href="https://pay.kiwify.com.br/esrXRjz" 
              target="_blank"
              className="w-full py-3.5 rounded-xl bg-dark-900 border border-slate-700 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center transition-all"
            >
              Comprar 20 Créditos
            </a>
          </div>

          {/* Plano Popular */}
          <div className="bg-dark-800/80 border-2 border-brand-500 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-brand-500/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-brand-500 text-black text-xs font-black uppercase tracking-wider shadow-lg">
                <Star className="w-3.5 h-3.5 fill-black" /> Mais Vendido
              </span>
            </div>

            <div className="mb-4 mt-2">
              <h2 className="text-2xl font-bold text-white">Pacote Pro</h2>
              <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                R$ 49,90
              </div>
              <p className="text-xs text-slate-400 mt-2">Pagamento único</p>
            </div>

            <ul className="mt-6 mb-8 space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span><strong>100 Créditos</strong> de IA</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Gerações em alta qualidade</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Prioridade na fila de geração</span>
              </li>
            </ul>

            <a 
              href="https://pay.kiwify.com.br/gXxqx6g"
              target="_blank"
              className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-sm flex items-center justify-center transition-all shadow-lg shadow-brand-500/20"
            >
              Comprar 100 Créditos
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}